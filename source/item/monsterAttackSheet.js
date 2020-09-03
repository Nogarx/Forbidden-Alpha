import { ForbiddenAlphaItemSheet } from "./itemSheet.js";
/**
* Extend the basic ItemSheet with some very simple modifications
* @extends {ForbiddenAlphaItemSheet}
*/
export class ForbiddenAlphaMonsterAttackSheet extends ForbiddenAlphaItemSheet 
{
    /** @override */
    static get defaultOptions() 
    {
        return mergeObject(super.defaultOptions, {
        classes: ["forbiddenAlpha", "sheet", "item"],
        template: "systems/forbiddenAlpha/templates/item/monsterAttackSheet.html",
        width: 450,
        height: 600,
        resizable: false
        });
    }

    /** @override */
	getData() 
	{
        const data = super.getData();
        return data;
	}
}