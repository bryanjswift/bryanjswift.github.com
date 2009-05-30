(function() {
	var transitionPath = 'css/transitions.css';
	var Portfolio = new Class({
		edge: new Element('div',{'class':'edge',html:'&nbsp;'}),
		corner: new Element('div',{'class':'corner',html:'&nbsp;'}),
		content: new Element('div',{'class':'content'}),
		tooltip: new Element('div',{'class':'tooltip'}),
		initialize: function() {
			$(document.head).adopt(new Element('link',{href:'css/transitions.css',type:'text/css',rel:'stylesheet'}));
			var sides = ['top','right','bottom','left'];
			var els = $('client').getElements('li');
			var edges = new Elements(sides.map(function(side) {
				return [this.edge.clone().addClass(side),this.corner.clone().addClass(side)];
			},this).flatten());
			els.each(function(li) {
				var content = this.content.clone();
				var tooltip = this.tooltip.clone();
				li.addClass('boxed');
				li.adopt(edges.clone(),content.adopt(li.getElement('img')));
				li.adopt(tooltip.adopt(li.getElements('h3, p')));
				/**tooltip.addClass('tooltipShow');/**/ /**/this.initializeTooltip(li,content,tooltip);/**/
			},this);
		},
		initializeTooltip: function(li,content,tooltip) {
			var show = this.showTooltip.pass([tooltip],this);
			var hide = this.hideTooltip.pass([tooltip],this);
			var morph = tooltip.addClass('tooltipHide').get('morph',{duration:500,link:'cancel',unit:'%'});
			morph.set.delay(1,morph,['.tooltipHide']); // delay added because otherwise an error is thrown
			content.addEvents({mouseenter: show});
			li.addEvents({mouseleave: hide});
		},
		hideTooltip: function(tooltip) {
			tooltip.morph('.tooltipHide');
		},
		showTooltip: function(tooltip) {
			tooltip.morph('.tooltipShow');
		}
	});
	var port = new Portfolio();
})();
