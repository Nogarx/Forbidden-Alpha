function preloadHandlebarsTemplates() 
{
    const templatePaths = 
    [
      "systems/forbiddenAlpha/templates/actor/tab/main.html",
      "systems/forbiddenAlpha/templates/actor/tab/combat.html",
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
