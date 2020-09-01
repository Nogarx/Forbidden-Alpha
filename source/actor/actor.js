/**
* Extend the base Actor.
* @extends {Actor}
*/
export class ForbiddenAlphaActor extends Actor
{
	/**
	* Augment the basic actor data with additional dynamic data.
	*/
	prepareData() 
	{
		super.prepareData();

		const actorData = this.data;
		const data = actorData.data;
		const flags = actorData.flags;

		// Prepare item, regardless of actor type.
		this._prepareItemsData(actorData);

		// Prepare specific data for each actor type.
		if (actorData.type === "character") 
		{
			this._prepareCharacterData(actorData);
		}
		else if (actorData.type === "monster") 
		{
			this._prepareCharacterData(actorData);
		}
		else if (actorData.type === "stronghold") 
		{
			this._prepareCharacterData(actorData);
		}
		else if (actorData.type === "adventureSite") 
		{
			this._prepareCharacterData(actorData);
		}
	}

	/* Items Data */
	_prepareItemsData(data) 
	{
		for (let item of Object.values(data.items)) 
		{
		  item.isArmor = item.type === "armor";
		  item.isArtifact = item.type === "artifact";
		  item.isBuilding = item.type === "building";
		  item.isCriticalInjury = item.type === "criticalInjury";
		  item.isGear = item.type === "gear";
		  item.isHireling = item.type === "hireling";
		  item.isMaterial = item.type === "material";
		  item.isMonsterSpell = item.type === "monsterSpell";
		  item.isMonsterTalent = item.type === "monsterTalent";
		  item.isSpell = item.type === "spell";
		  item.isTalent = item.type === "talent";
		  item.isWeapon = item.type === "weapon";
		}
	}

		/**
	* Prepare Character type specific data
	*/
	_prepareCharacterData(actorData) 
	{
		const data = actorData.data;
		// Make modifications to data here. For example:
		// Loop through ability scores, and add their modifiers to our sheet output.
		/*for (let [key, ability] of Object.entries(data.attributes))
		{
			// Calculate the modifier using d20 rules.
			ability.mod = Math.floor((ability.value - 10) / 2);
		}*/
	}
}