import { ForbiddenAlphaActorSheet } from "./actorSheet.js";
/**
* Extend the basic ActorSheet with some very simple modifications
* @extends {ForbiddenAlphaActorSheet}
*/
export class ForbiddenAlphaAdventureSiteSheet extends ForbiddenAlphaActorSheet 
{
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
        classes: ["forbiddenAlpha", "sheet", "actor"],
        template: "systems/forbiddenAlpha/templates/actor/adventureSiteSheet.html",
        width: 1000,
        height: 700,
        resizable: false,
        tabs: [{navSelector: ".tabsBar", contentSelector: ".bookBody", initial: "main" }]
        });
    }
}
  