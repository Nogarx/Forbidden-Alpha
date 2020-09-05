import { ForbiddenAlphaItemSheet } from "./itemSheet.js";
/**
* Extend the basic ItemSheet with some very simple modifications
* @extends {ForbiddenAlphaItemSheet}
*/
export class ForbiddenAlphaArtifactSheet extends ForbiddenAlphaItemSheet 
{
    /** @override */
    static get defaultOptions() 
    {
        return mergeObject(super.defaultOptions, {
        classes: ["forbiddenAlpha", "sheet", "item"],
        template: "systems/forbiddenAlpha/templates/item/artifactSheet.html",
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