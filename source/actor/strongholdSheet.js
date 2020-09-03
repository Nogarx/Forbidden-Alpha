import { ForbiddenAlphaActorSheet } from "./actorSheet.js";
/**
* Extend the basic ActorSheet with some very simple modifications
* @extends {ForbiddenAlphaActorSheet}
*/
export class ForbiddenAlphaStrongholdSheet extends ForbiddenAlphaActorSheet 
{
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
        classes: ["forbiddenAlpha", "sheet", "actor"],
        template: "systems/forbiddenAlpha/templates/actor/strongholdSheet.html",
        width: 1000,
        height: 700,
        resizable: false,
        tabs: [{ navSelector: ".tabsBar", contentSelector: ".bookBody", initial: "main" },
        {navSelector: ".storageTabs", contentSelector: ".gearItemList", initial: "gear"}]
        });
    }
}
  