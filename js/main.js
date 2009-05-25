(function() {
	var Portfolio = new Class({
		edge: new Element('div',{'class':'edge',html:'&nbsp;'}),
		corner: new Element('div',{'class':'corner',html:'&nbsp;'}),
		content: new Element('div',{'class':'content'}),
		tooltip: new Element('div',{'class':'tooltip'}),
		initialize: function() {
			var sides = ['top','right','bottom','left'];
			var els = $('client').getElements('li');
			var edges = new Elements(sides.map(function(side) {
				return [this.edge.clone().addClass(side),this.corner.clone().addClass(side)];
			},this).flatten());
			els.each(function(li) {
				li.addClass('boxed');
				li.adopt(edges.clone(),this.content.clone().adopt(li.getElement('img')));
				li.adopt(this.tooltip.clone().adopt(li.getElements('h3, p')));
			},this);
		}
	});
	port = new Portfolio();
})();
