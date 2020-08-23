// Import Modules
import { ForbiddenAlphaActor } from "./actor/actor.js";
import { ForbiddenAlphaActorSheet } from "./actor/actor-sheet.js";
import { ForbiddenAlphaItem } from "./item/item.js";
import { ForbiddenAlphaItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function() {

  game.forbiddenAlpha = {
    ForbiddenAlphaActor,
    ForbiddenAlphaItem
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = ForbiddenAlphaActor;
  CONFIG.Item.entityClass = ForbiddenAlphaItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("forbiddenAlpha", ForbiddenAlphaActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("forbiddenAlpha", ForbiddenAlphaItemSheet, { makeDefault: true });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });
});