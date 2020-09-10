import { ForbiddenAlphaActorSheet } from "./actorSheet.js";
/**
* Extend the basic ActorSheet with some very simple modifications
* @extends {ForbiddenAlphaActorSheet}
*/
export class ForbiddenAlphaStrongholdSheet extends ForbiddenAlphaActorSheet 
{
    /** @override */
    static get defaultOptions() 
    {
        return mergeObject(super.defaultOptions, {
        classes: ["forbiddenAlpha", "sheet", "actor"],
        template: "systems/forbiddenAlpha/templates/actor/strongholdSheet.html",
        width: 1000,
        height: 700,
        resizable: false,
        tabs: [{ navSelector: ".tabsBar", contentSelector: ".bookBody", initial: "main" },
        {navSelector: ".storageNav", contentSelector: ".gearItemList", initial: "gear"}]
        });
    }

    /** @override */
    _onChangeTab(event, tabs, active) 
    {
        if (active === "storage") 
        {
            this._tabs[1].activate("gear");
        }
        super._onChangeTab();
    }
}
  