import { ForbiddenAlphaActorSheet } from "./actorSheet.js";
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ForbiddenAlphaActorSheet}
 */
export class ForbiddenAlphaCharacterSheet extends ForbiddenAlphaActorSheet 
{
    /** @override */
    static get defaultOptions() 
    {
        return mergeObject(super.defaultOptions, {
        classes: ["forbiddenAlpha", "sheet", "actor"],
        template: "systems/forbiddenAlpha/templates/actor/characterSheet.html",
        width: 1000,
        height: 700,
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
  