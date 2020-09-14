/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class ForbiddenAlphaItem extends Item 
{
	/**
	* Augment the basic Item data model with additional dynamic data.
	*/
	prepareData() 
	{
		super.prepareData();

		// Get the Item's data
		const itemData = this.data;
		const actorData = this.actor ? this.actor.data : {};
		const data = itemData.data;
	}

	async itemToChat() 
	{
		console.log("HOLA");
		const itemData = duplicate(this.data);
		var path = "systems/forbiddenAlpha/templates/chat/items/"+ itemData.type +"Chat.html";
		const html = await renderTemplate(path, itemData);
		const chatData = 
		{
		  user: game.user._id,
		  rollMode: game.settings.get("core", "rollMode"),
		  content: html,
		};
        if (["gmroll", "blindroll"].includes(chatData.rollMode)) 
        {
            chatData.whisper = ChatMessage.getWhisperRecipients("GM");
        } 
        else if (chatData.rollMode === "selfroll") 
        {
            chatData.whisper = [game.user];
        }
        ChatMessage.create(chatData);
	}
}
