import DiceSystem from "./diceSystem.js";

export default class RollDialog 
{
    /**
    * Display roll dialog and execute the roll.
    * @param  {string}        rollName
    * @param  {object|number} baseDefault     {name: "somename", value: 5} | 5
    * @param  {object|number} skillDefault    {name: "somename", value: 5} | 5
    * @param  {number}        gearDefault
    * @param  {string}        artifactDefault
    * @param  {number}        modifierDefault
    * @param  {number}        damage
    * @param  {DiceRoller}    diceRoller
    * @param  {callback}      [onAfterRoll]
    */

    async rollDialog(rollName, attributeName, skillName, attributeDice, skillDice, gearDice, artifactDice, diceSystem, actorID) 
    {
        let dialogData = 
        {
            attributeLabel: game.i18n.localize("ATTRIBUTES." + attributeName.toUpperCase()),
            attributeValue: attributeDice,
            skillLabel: game.i18n.localize("SKILLS." + skillName.toUpperCase()),
            skillValue: skillDice,
            gearLabel: game.i18n.localize("GEAR.LABEL"),
            gearValue: gearDice,
            artifactLabel: game.i18n.localize("ARTIFACT.LABEL"),
            artifactD8Value: artifactDice[0],
            artifactD10Value: artifactDice[1],
            artifactD12Value: artifactDice[2],
            modifierLabel: game.i18n.localize("MODIFIER.LABEL"),
            modifierValue: 0
        };
        const dialogContent = await renderTemplate("systems/forbiddenAlpha/templates/dialog/diceDialog.html", dialogData);
        let dialogWindow = new Dialog(
        {
            title: "Roll : " + rollName,
            content: dialogContent,
            buttons: 
            {
                roll: 
                {
                    icon: '<img src="systems/forbiddenAlpha/assets/icons/rollMark.png" title="Roll Dices">',
                    callback: (html) => 
                    {
                        let attributeDices = $(html).find('#attribute').length > 0 ? parseInt( $(html).find('#attribute')[0].value ) : 0;
                        let skillDices = $(html).find('#skill').length > 0 ? parseInt( $(html).find('#skill')[0].value ) : 0;
                        let gearDices = $(html).find('#gear').length > 0 ? parseInt( $(html).find('#gear')[0].value ) : 0;
                        let artifactDices = [$(html).find('#artifactD8').length > 0 ? parseInt( $(html).find('#artifactD8')[0].value ) : 0,
                                            $(html).find('#artifactD10').length > 0 ? parseInt( $(html).find('#artifactD10')[0].value ) : 0,
                                            $(html).find('#artifactD12').length > 0 ? parseInt( $(html).find('#artifactD12')[0].value ) : 0];
                        let modifierDices = $(html).find('#modifier').length > 0 ? parseInt( $(html).find('#modifier')[0].value ) : 0;
                        diceSystem.ResetDices();
                        let result = diceSystem.Roll(attributeDices, skillDices, gearDices, artifactDices, modifierDices, rollName);
                        this.rollToChat(rollName, false, result, actorID);
                    }
                },
                cancel: 
                {
                    icon: '<img src="systems/forbiddenAlpha/assets/icons/closeMark.png" title="Close Window">',
                    callback: () => {}
                }
            },
            default: "roll",
            close: () => {}
        },
        {
            classes: ['rollDialog']
        });
        dialogWindow.render(true);
    }
    
    async rollToChat(rollName, push, result, actorID)
    {
        let rollData = 
        {
            name: rollName,
            isPushed: push,
            attributeRoll: result["attributeRoll"],
            skillRoll: result["skillRoll"],
            gearRoll: result["gearRoll"],
            artifactRoll: result["artifactRoll"],
            user: game.user._id,
            actor: actorID
        };
        const html = await renderTemplate("systems/forbiddenAlpha/templates/chat/rollChat.html", rollData);
        let chatData = 
        {
            user: game.user._id,
            rollMode: game.settings.get("core", "rollMode"),
            content: html,
        };
        if (["gmroll", "blindroll"].includes(chatData.rollMode)) 
        {
            chatData.whisper = ChatMessage.getWhisperRecipients("GM");
        } 
        else if (chatData.rollMode === "selfroll") 
        {
            chatData.whisper = [game.user];
        }
        ChatMessage.create(chatData);
    }

    async rollConsumableToChat(rollName, result) 
    {
        let rollData = 
        {
            name: game.i18n.localize("CONSUMABLES." + rollName.toUpperCase()),
            sucess: result,
            sucessLabel:  game.i18n.localize("CHAT.SUCESS"),
            failLabel:  game.i18n.localize("CHAT.FAIL"),
        };
        const html = await renderTemplate("systems/forbiddenAlpha/templates/chat/rollConsumableChat.html", rollData);
        let chatData = 
        {
            user: game.user._id,
            rollMode: game.settings.get("core", "rollMode"),
            content: html,
        };
        if (["gmroll", "blindroll"].includes(chatData.rollMode)) 
        {
            chatData.whisper = ChatMessage.getWhisperRecipients("GM");
        } 
        else if (chatData.rollMode === "selfroll") 
        {
            chatData.whisper = [game.user];
        }
        ChatMessage.create(chatData);
    }
}