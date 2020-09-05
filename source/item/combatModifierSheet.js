import { ForbiddenAlphaItemSheet } from "./itemSheet.js";
/**
* Extend the basic ItemSheet with some very simple modifications
* @extends {ForbiddenAlphaItemSheet}
*/
export class ForbiddenAlphaCombatModifierSheet extends ForbiddenAlphaItemSheet 
{
    /** @override */
    static get defaultOptions() 
    {
        return mergeObject(super.defaultOptions, {
        classes: ["forbiddenAlpha", "sheet", "item"],
        template: "systems/forbiddenAlpha/templates/item/itemModifierSheet.html",
        width: 450,
        height: 600,
        resizable: false,
        tabs: [{navSelector: ".tabsBar", contentSelector: ".tabsContent", initial: "main" }]
        });
    }

    /** @override */
	getData() 
	{
        const data = super.getData();
        return data;
	}
}