import RollDialog from "./../diceDialog.js"
import DiceSystem from "./../DiceSystem.js"
/**
* Extend the basic ActorSheet with some very simple modifications
* @extends {ActorSheet}
*/
export class ForbiddenAlphaActorSheet extends ActorSheet 
{
    rollDialog = new RollDialog();
    diceSystem = new DiceSystem();

    activateListeners(html) 
    {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;
        const itemContextMenu = html.find('.itemContextMenu')[0];

        // Add Inventory Item
        html.find('.itemCreate').click(this._onItemCreate.bind(this));

        // Update Inventory Item
        html.find('.itemEdit').click(event => 
        {
            const div = $(event.currentTarget).parents(".item");
            const item = this.actor.getOwnedItem(div.data("itemId"));
            item.sheet.render(true);
        });

        $(itemContextMenu).on('mouseleave', event => 
        {
            itemContextMenu.style.display = 'none';
        });

        html.find('.itemContext').on('contextmenu', event => 
        {
            itemContextMenu.setAttribute("itemId", $(event.currentTarget).data("itemId"))
            itemContextMenu.style.display = 'flex';
            itemContextMenu.style.top  = (event.clientY - this.actor.sheet.position["top"] - 60) + "px";
            itemContextMenu.style.left = (event.clientX - this.actor.sheet.position["left"] - 15) + "px";
        });

        // Delete Inventory Item
        html.find('.itemDelete').click(event => 
        {
            const div = $(event.currentTarget).parents(".item");
            this.actor.deleteOwnedItem(div.data("itemId"));
            div.slideUp(200, () => this.render(false));
        });

        html.find('.contextEdit').on('click', event => 
        {
            itemContextMenu.style.display = 'none';
            const itemId = itemContextMenu.getAttribute("itemId");
            const item = this.actor.getOwnedItem(itemId);
            item.sheet.render(true);
        });

        html.find('.contextDelete').on('click', event => 
        {
            itemContextMenu.style.display = 'none';
            const itemId = itemContextMenu.getAttribute("itemId");
            this.actor.deleteOwnedItem(itemId);
            //div.slideUp(200, () => this.render(false));
        });

        // Delete Inventory Item
        html.find('.itemEquip').click(event => 
        {
            const div = $(event.currentTarget).parents(".item");
            const item = this.actor.getOwnedItem(div.data("itemId"));
            item.update({"data.isEquiped.value": !item.data.data.isEquiped.value});
        });
        ;

        html.find('.postItem').click(event => 
        {
            itemContextMenu.style.display = 'none';
            const itemId = itemContextMenu.getAttribute("itemId");
            const item = this.actor.getOwnedItem(itemId);
            item.itemToChat();
        });

        /////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////// Roll Skill /////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////

        html.find('.rollAttribute').click(event => 
        {
            var attributeName = $(event.currentTarget).data("attribute");
            var attributeValue = this.actor.data.data.attributes[attributeName].damage;
            this.rollDialog.rollDialog(attributeName, attributeName, "none", attributeValue, 0, 0, [0,0,0], this.diceSystem, this.actor._id);
        });

        html.find('.rollSkill').click(event => 
        {
            var skillName = $(event.currentTarget).data("skill");
            var skillValue = this.actor.data.data.skills[skillName].value;
            var attributeName = this.actor.data.data.skills[skillName].attribute;
            var attributeValue = this.actor.data.data.attributes[attributeName].damage;
            this.rollDialog.rollDialog(skillName, attributeName, skillName, attributeValue, skillValue, 0, [0,0,0], this.diceSystem, this.actor._id);
        });

        html.find('.rollConsumable').click(event => 
        {
            var consumableName = $(event.currentTarget).data("consumable");
            var consumableValue = this.actor.data.data.consumables[consumableName].value;
            var roll = this.diceSystem.RollConsumable(consumableValue);
            var result = true;
            if (roll < 3 )
                result = false;
            this.rollDialog.rollConsumableToChat(consumableName, result);
        });
       
        html.find('.rollArmor').click(event => 
        {
            const itemId = $(event.currentTarget).data("itemId");
            const rollName = this.actor.getOwnedItem(itemId).name;
            const gearBonus = this.actor.getOwnedItem(itemId).data.data.armorRating.value;
            this.rollDialog.rollDialog(rollName, "none", "none", 0, 0, gearBonus, [0,0,0], this.diceSystem, this.actor._id);
        });

        html.find('.rollWeapon').click(event => 
        {
            const itemId = $(event.currentTarget).data("itemId");
            const rollName = this.actor.getOwnedItem(itemId).name;
            const gearBonus = this.actor.getOwnedItem(itemId).data.data.gearBonus.value;
            const weaponType = this.actor.getOwnedItem(itemId).data.data.type.value;
            var skillName = ""
            if (weaponType === "melee")
            {
                skillName = "melee"
            }
            else if (weaponType === "range")
            {
                skillName = "marksmanship"
            }
            else
            {
                new error("Weapon type not selected");
            }
            var skillValue = this.actor.data.data.skills[skillName].value;
            var attributeName = this.actor.data.data.skills[skillName].attribute;
            var attributeValue = this.actor.data.data.attributes[attributeName].damage;
            this.rollDialog.rollDialog(rollName, attributeName, skillName, attributeValue, skillValue, gearBonus, [0,0,0], this.diceSystem, this.actor._id);
        });

        /////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////// Custom Header ///////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////

        html.find('.closeWindow').click(event => 
        {
            super.close();
        });

        html.find('.openConfiguration').click(event => 
        {
            this._onConfigureSheet(event)
        });


        html.find('.minimizeWindow').click(event => 
        {
            super.minimize(event);
        });
    
		const bookSheet = html.find('.displacementButton')[0];
		if (bookSheet)
		{
			// Make sheet's borders draggable
			new Draggable(this, html, bookSheet, this.options.resizable);
        }
        
        /////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////// Databar //////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////

        // Method used to increase a value of "main / attribute" via right and left clicks.
        html.find('.databar').on('click contextmenu', event => 
        {
            const variable = $(event.currentTarget).data("variable");
            const dataGroup = $(event.currentTarget).data("group");

            if (dataGroup === "main")
            {
                const variableMaximum = $(event.currentTarget).data("maximum");
                const variableValue = this.actor.data.data.main[variable].value;
                if (event.type === "click") 
                {
                    if (variableValue > 0)
                        this.actor.update({["data.main." + variable + ".value"]: variableValue - 1,});
                } 
                else if (event.type === "contextmenu") 
                {
                    if (variableValue < variableMaximum)
                        this.actor.update({["data.main." + variable + ".value"]: variableValue + 1,});
                }
            }
            else if (dataGroup === "attributes")
            { 
                const variableDamage = this.actor.data.data.attributes[variable].damage;
                const variableValue = this.actor.data.data.attributes[variable].value;
                if (event.type === "click") 
                {
                    if (variableDamage > 0)
                        this.actor.update({["data.attributes." + variable + ".damage"]: variableDamage - 1,});
                } 
                else if (event.type === "contextmenu") 
                {
                    if (variableDamage < variableValue)
                        this.actor.update({["data.attributes." + variable + ".damage"]: variableDamage + 1,});
                }
            }
        });

        html.find('.skillUpdate').on('click contextmenu', event => 
        {
            const variable = $(event.currentTarget).data("skill");
            const variableValue = this.actor.data.data.skills[variable].value;
            if (event.type === "click") 
            {
                if (variableValue > 0)
                    this.actor.update({["data.skills." + variable + ".value"]: variableValue - 1,});
            } 
            else if (event.type === "contextmenu") 
            {
                if (variableValue < 5)
                    this.actor.update({["data.skills." + variable + ".value"]: variableValue + 1,});
            }
        });

        html.find('.attributeUpdate').on('click contextmenu', event => 
        {
            const variable = $(event.currentTarget).data("attribute");
            const variableValue = this.actor.data.data.attributes[variable].value;
            if (event.type === "click") 
            {
                if (variableValue > 0)
                {
                    this.actor.update({["data.attributes." + variable + ".value"]: variableValue - 1,});
                    this.actor.update({["data.attributes." + variable + ".damage"]: variableValue - 1,});
                }
            } 
            else if (event.type === "contextmenu") 
            {
                this.actor.update({["data.attributes." + variable + ".value"]: variableValue + 1,});
                this.actor.update({["data.attributes." + variable + ".damage"]: variableValue + 1,});
            }
        });

        /////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////// Item Selector ///////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////

        html.find('.itemSelector').on('click', event => 
        {
            const itemId = $(event.currentTarget).data("itemId");
            if (itemId === this.actor.data.data.auxiliar.currentSelectedItem)
            {
                this.actor.update({"data.auxiliar.itemSelected": false});
                this.actor.update({"data.auxiliar.currentSelectedItem": ""});
                this.actor.getOwnedItem(this.actor.data.data.auxiliar.currentSelectedItem).update({"data.isSelected": false});
            }
            else
            {
                if (this.actor.data.data.auxiliar.currentSelectedItem != "")
                    this.actor.getOwnedItem(this.actor.data.data.auxiliar.currentSelectedItem).update({"data.isSelected": false});
                this.actor.getOwnedItem(itemId).update({"data.isSelected": true});
                this.actor.update({"data.auxiliar.currentSelectedItem": itemId});
                this.actor.update({"data.auxiliar.itemSelected": true});
            }

        });

        html.find('.clearSelection').on('click', event => 
        {
            if (this.actor.data.data.auxiliar.currentSelectedItem != "")
            {
                this.actor.getOwnedItem(this.actor.data.data.auxiliar.currentSelectedItem).update({"data.isSelected": false});
                this.actor.update({"data.auxiliar.itemSelected": false});
                this.actor.update({"data.auxiliar.currentSelectedItem": ""});
            }
            
        });


        // Rollable abilities.
        /*
        html.find('.rollable').click(this._onRoll.bind(this));
        */

    }

    _onItemCreate(event) 
    {
        event.preventDefault();
        let header = event.currentTarget;
        let data = duplicate(header.dataset);
        data["name"] = `New ${data.type.capitalize()}`;
        this.actor.createEmbeddedEntity("OwnedItem", data, { renderSheet: true });
    }

    _onPushRoll() 
    {
        let result = this.diceSystem.PushRoll();
        this.rollDialog.rollToChat(this.diceSystem.rollName, true, result, this.actor._id);
    }
}
