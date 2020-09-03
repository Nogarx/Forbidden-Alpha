import { ForbiddenAlphaItemSheet } from "./itemSheet.js";
/**
* Extend the basic ItemSheet with some very simple modifications
* @extends {ForbiddenAlphaItemSheet}
*/
export class ForbiddenAlphaGearSheet extends ForbiddenAlphaItemSheet 
{
    /** @override */
    static get defaultOptions() 
    {
        return mergeObject(super.defaultOptions, {
        classes: ["forbiddenAlpha", "sheet", "item"],
        template: "systems/forbiddenAlpha/templates/item/gearSheet.html",
        width: 450,
        height: 600,
        resizable: false,
        tabs: [{navSelector: ".gearTabsBar", contentSelector: ".gearTabs", initial: "main" }]
        });
    }

    /** @override */
	getData() 
	{
        const data = super.getData();
        return data;
	}
}