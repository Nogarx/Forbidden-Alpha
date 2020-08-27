function preloadHandlebarsTemplates() 
{
    const templatePaths = 
    [
      "systems/forbiddenAlpha/templates/actor/tab/biographyTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/combatTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/gearTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/mainTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/skillTab.html",
	  "systems/forbiddenAlpha/templates/actor/tab/talentTab.html"
    ];
    return loadTemplates(templatePaths);
}
  
function registerHandlebarsHelpers() 
{
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
