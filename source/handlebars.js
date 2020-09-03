function preloadHandlebarsTemplates() 
{
    const templatePaths = 
    [
      "systems/forbiddenAlpha/templates/actor/tab/biographyTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/combatTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/gearTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/gearGearTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/gearMaterialTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/gearArmorTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/gearWeaponTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/mainTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/mainMonsterTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/mainStrongholdTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/mainAdventureSiteTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/skillTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/talentTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/buildingTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/hirelingTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/storageTab.html",

	  "systems/forbiddenAlpha/templates/item/spellSheet.html",
	  "systems/forbiddenAlpha/templates/item/talentSheet.html",
	  "systems/forbiddenAlpha/templates/item/monsterAttackSheet.html",

	  "systems/forbiddenAlpha/templates/item/recipeTab.html",

	  "systems/forbiddenAlpha/templates/item/armorSheet.html",
	  "systems/forbiddenAlpha/templates/item/artifactSheet.html",
	  "systems/forbiddenAlpha/templates/item/buildingSheet.html",
	  "systems/forbiddenAlpha/templates/item/criticalInjurySheet.html",
	  "systems/forbiddenAlpha/templates/item/gearSheet.html",
	  "systems/forbiddenAlpha/templates/item/hirelingSheet.html",
	  "systems/forbiddenAlpha/templates/item/iteModifierSheet.html",
	  "systems/forbiddenAlpha/templates/item/materialSheet.html",
	  "systems/forbiddenAlpha/templates/item/weaponSheet.html"
    ];
    return loadTemplates(templatePaths);
}
  
function registerHandlebarsHelpers() 
{
	Handlebars.registerHelper('ifLessEqual', function(v1, v2, options) 
	{
		if(v1 <= v2) {
		  return options.fn(this);
		}
		return options.inverse(this);
	  });

	Handlebars.registerHelper('ifCond', function(v1, v2, options) 
	{
		if(v1 === v2) {
		  return options.fn(this);
		}
		return options.inverse(this);
	  });

  	Handlebars.registerHelper('concat', function() 
	{
		var outStr = '';
		for (var arg in arguments) 
		{
		if (typeof arguments[arg] != 'object') 
		{
			outStr += arguments[arg];
		}
		}
		return outStr;
	});

	Handlebars.registerHelper('toLowerCase', function(str)
	{
		return str.toLowerCase();
	});
}

export const initializeHandlebars = () => 
{
    registerHandlebarsHelpers();
    preloadHandlebarsTemplates();
};
