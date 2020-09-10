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

        html.find('.closeWindow').click(ev => 
		{
			super.close();
		});

		html.find('.openConfiguration').click(ev => 
		{
			this._onConfigureSheet(ev)
		});

		// Get custom header.
		const scrollSheet = html.find('.scrollBorder')[0];
		if (scrollSheet)
		{
			// Make sheet's borders draggable
			new Draggable(this, html, scrollSheet, this.options.resizable);
	
			// Make sheet's borders minimizable
			if ( this.options.minimizable ) 
			{
				scrollSheet.addEventListener('dblclick', this._onToggleMinimize.bind(this));
			}
		}
    }
}
