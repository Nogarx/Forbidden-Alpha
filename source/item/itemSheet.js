/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class ForbiddenAlphaItemSheet extends ItemSheet 
{
	getData() 
	{
	const data = super.getData();
	return data;
	}

	setPosition(options = {}) 
	{
	const position = super.setPosition(options);
	const sheetBody = this.element.find(".sheet-body");
	const bodyHeight = position.height - 192;
	sheetBody.css("height", bodyHeight);
	return position;
	}

    activateListeners(html) 
    {
      super.activateListeners(html);

      // Everything below here is only needed if the sheet is editable
      if (!this.options.editable) return;

      // Roll handlers, click handlers, etc. would go here.
    }
}
