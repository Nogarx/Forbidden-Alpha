import { ForbiddenAlphaActorSheet } from "./actorSheet.js";
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ForbiddenAlphaActorSheet}
 */
export class ForbiddenAlphaCharacterSheet extends ForbiddenAlphaActorSheet 
{
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
        classes: ["forbiddenAlpha", "sheet", "actor"],
        template: "systems/forbiddenAlpha/templates/actor/characterSheet.html",
        width: 920,
        height: 570,
        resizable: false,
        tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    /** @override */
    getData() 
    {
        const data = super.getData();
        return data;
    }
}
  