/**
* Extend the basic ActorSheet with some very simple modifications
* @extends {ActorSheet}
*/
export class ForbiddenAlphaActorSheet extends ActorSheet 
{
    activateListeners(html) 
    {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        // Add Inventory Item
        html.find('.itemCreate').click(this._onItemCreate.bind(this));

        // Update Inventory Item
        html.find('.itemEdit').click(ev => 
        {
            const div = $(ev.currentTarget).parents(".item");
            const item = this.actor.getOwnedItem(div.data("itemId"));
            item.sheet.render(true);
        });

        // Delete Inventory Item
        html.find('.itemDelete').click(ev => 
        {
            const div = $(ev.currentTarget).parents(".item");
            this.actor.deleteOwnedItem(div.data("itemId"));
            div.slideUp(200, () => this.render(false));
        });

        // Delete Inventory Item
        html.find('.itemEquip').click(ev => 
        {
            const div = $(ev.currentTarget).parents(".item");
            const item = this.actor.getOwnedItem(div.data("itemId"));
            item.update({"data.isEquiped.value": !item.data.data.isEquiped.value});
        });
            


        html.find('.itemSelection').click( ev => 
        {
            const div = $(ev.currentTarget).parents(".buildingItem");
            const selectedItem = this.actor.getOwnedItem(div.data("itemId"));
            const items = this.actor.items;
            items.forEach((item) => 
            {
                if (item.type === "building") 
                {
                    if (item != selectedItem) {item.update({"data.selected": false});}
                    else {item.update({"data.selected": true});}
                }
            });
        });

        /////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////// Custom Header ///////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////

        html.find('.closeWindow').click(ev => 
        {
            super.close();
        });

        html.find('.openConfiguration').click(ev => 
        {
            this._onConfigureSheet(ev)
        });
    
		const bookSheet = html.find('.scrollBorder')[0];
		if (bookSheet)
		{
			// Make sheet's borders draggable
			new Draggable(this, html, bookSheet, this.options.resizable);
	
			// Make sheet's borders minimizable
			if ( this.options.minimizable ) 
			{
				bookSheet.addEventListener('dblclick', this._onToggleMinimize.bind(this));
			}
        }
        
        /////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////// Databar //////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////

        // Method used to increase a value of "main / attribute" via right and left clicks.
        html.find('.databar').on('click contextmenu', ev => 
        {
            const variable = $(ev.currentTarget).data("variable");
            const dataGroup = $(ev.currentTarget).data("group");

            if (dataGroup === "main")
            {
                const variableMaximum = $(ev.currentTarget).data("maximum");
                const variableValue = this.actor.data.data.main[variable].value;
                if (ev.type === "click") 
                {
                    if (variableValue > 0)
                        this.actor.update({["data.main." + variable + ".value"]: variableValue - 1,});
                } 
                else if (ev.type === "contextmenu") 
                {
                    if (variableValue < variableMaximum)
                        this.actor.update({["data.main." + variable + ".value"]: variableValue + 1,});
                }
            }
            else if (dataGroup === "attributes")
            { 
                const variableDamage = this.actor.data.data.attributes[variable].damage;
                const variableValue = this.actor.data.data.attributes[variable].value;
                if (ev.type === "click") 
                {
                    if (variableDamage > 0)
                        this.actor.update({["data.attributes." + variable + ".damage"]: variableDamage - 1,});
                } 
                else if (ev.type === "contextmenu") 
                {
                    if (variableDamage < variableValue)
                        this.actor.update({["data.attributes." + variable + ".damage"]: variableDamage + 1,});
                }
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
}
