// Import Modules
import { ForbiddenAlphaActor } from "./actor/actor.js";
import { ForbiddenAlphaCharacterSheet } from "./actor/characterSheet.js";
import { ForbiddenAlphaMonsterSheet } from "./actor/monsterSheet.js";
import { ForbiddenAlphaStrongholdSheet } from "./actor/strongholdSheet.js";
import { ForbiddenAlphaAdventureSiteSheet } from "./actor/adventureSiteSheet.js";
import { ForbiddenAlphaItem } from "./item/item.js";
import { ForbiddenAlphaItemSheet } from "./item/itemSheet.js";
import { initializeHandlebars } from "./handlebars.js";

Hooks.once('init', async function() 
{

	game.forbiddenAlpha = 
	{
		ForbiddenAlphaActor,
		ForbiddenAlphaItem
	};

	/**
	 * Set an initiative formula for the system
	 * @type {String}
	 */
	CONFIG.Combat.initiative = 
	{
		formula: "1d20",
		decimals: 2
	};

	// Define custom Entity classes.
	CONFIG.Actor.entityClass = ForbiddenAlphaActor;
	CONFIG.Item.entityClass = ForbiddenAlphaItem;

	// Register sheet application classes.
	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("forbiddenAlpha", ForbiddenAlphaCharacterSheet, { types: ["character"], makeDefault: true });
	Actors.registerSheet("forbiddenAlpha", ForbiddenAlphaMonsterSheet, { types: ["monster"], makeDefault: true });
	Actors.registerSheet("forbiddenAlpha", ForbiddenAlphaStrongholdSheet, { types: ["stronghold"], makeDefault: true });
	Actors.registerSheet("forbiddenAlpha", ForbiddenAlphaAdventureSiteSheet, { types: ["adventureSite"], makeDefault: true });
	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaItemSheet, { makeDefault: true });

	// Handlebars initialization.
	initializeHandlebars();
});