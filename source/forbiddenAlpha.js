// Import Modules
import { ForbiddenAlphaActor } from "./actor/actor.js";
import { ForbiddenAlphaCharacterSheet } from "./actor/characterSheet.js";
import { ForbiddenAlphaMonsterSheet } from "./actor/monsterSheet.js";
import { ForbiddenAlphaStrongholdSheet } from "./actor/strongholdSheet.js";
import { ForbiddenAlphaAdventureSiteSheet } from "./actor/adventureSiteSheet.js";
import { ForbiddenAlphaItem } from "./item/item.js";
import { ForbiddenAlphaTalentSheet } from "./item/talentSheet.js";
import { ForbiddenAlphaSpellSheet } from "./item/spellSheet.js";
import { ForbiddenAlphaWeaponSheet } from "./item/weaponSheet.js";
import { ForbiddenAlphaArmorSheet } from "./item/armorSheet.js";
import { ForbiddenAlphaBookChapterSheet } from "./item/bookChapterSheet.js";
import { ForbiddenAlphaCriticalInjurySheet } from "./item/criticalInjurySheet.js";
import { ForbiddenAlphaMonsterAttackSheet } from "./item/monsterAttackSheet.js";
import { ForbiddenAlphaBuildingSheet } from "./item/buildingSheet.js";
import { ForbiddenAlphaHirelingSheet } from "./item/hirelingSheet.js";
import { ForbiddenAlphaGearSheet } from "./item/gearSheet.js";
import { ForbiddenAlphaCombatModifierSheet } from "./item/combatModifierSheet.js";
import { ForbiddenAlphaMaterialSheet } from "./item/materialSheet.js";
import { ForbiddenAlphaArtifactSheet } from "./item/artifactSheet.js";
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
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaTalentSheet, { types: ["talent"], makeDefault: true });
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaSpellSheet, { types: ["spell"], makeDefault: true });
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaWeaponSheet, { types: ["weapon"], makeDefault: true });
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaArmorSheet, { types: ["armor"], makeDefault: true });
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaBookChapterSheet, { types: ["bookChapter"], makeDefault: true });
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaCriticalInjurySheet, { types: ["criticalInjury"], makeDefault: true });
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaMonsterAttackSheet, { types: ["monsterAttack"], makeDefault: true });
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaBuildingSheet, { types: ["building"], makeDefault: true });
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaHirelingSheet, { types: ["hireling"], makeDefault: true });
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaGearSheet, { types: ["gear"], makeDefault: true });
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaCombatModifierSheet, { types: ["combatModifier"], makeDefault: true });
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaMaterialSheet, { types: ["material"], makeDefault: true });
	Items.registerSheet("forbiddenAlpha", ForbiddenAlphaArtifactSheet, { types: ["artifact"], makeDefault: true });

	// Handlebars initialization.
	initializeHandlebars();
});