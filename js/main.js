(function() {
	var transitionPath = 'css/transitions.css';
	var Portfolio = new Class({
		edge: new Element('div',{'class':'edge',html:'&nbsp;'}),
		corner: new Element('div',{'class':'corner',html:'&nbsp;'}),
		content: new Element('div',{'class':'content'}),
		tooltip: new Element('div',{'class':'tooltip'}),
		initialize: function() {
			if ( // if it isn't a tested browser don't do any of the fancifying
					(Browser.Engine.gecko && Browser.Engine.version < 18) || // Firefox 2
					(Browser.Engine.trident && Browser.Engine.version < 6) || // IE6
					(Browser.Engine.webkit && Browser.Engine.version < 525) || // Safari 3
					(Browser.Engine.presto && Browser.Engine.version < 960) // Opera 9.6
			) {
				this.edge = this.corner = this.content = this.tooltip = null;
				return;
			}
			$(document.head).adopt(new Element('link',{href:'css/transitions.css',type:'text/css',rel:'stylesheet'}));
			addEvent('domready',this.domready.bind(this));
		},
		domready: function() {
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
				this.initializeTooltip(li,content,tooltip);
			},this);
			this.edge = this.corner = this.content = this.tooltip = null;
		},
		hideTooltip: function(e,tooltip) {
			tooltip.morph('.tooltipHide');
		},
		initializeSlider: function(tooltip) {
			var wrapper = new Element('div',{'class':'wrapper'});
			tooltip.adopt(wrapper.adopt(tooltip.getElements('p')));
			var slider = new Form.Slider(wrapper,{
				onRecalibrateFinish: function(slider) { tooltip.removeClass('recalibrating'); },
				onRecalibrateStart: function(slider) { tooltip.addClass('recalibrating'); },
				size:(tooltip.getSize().y - tooltip.getElement('h3').getSize().y)
			});
			addEvent('resize',this.recalibrateSlider.bindWithEvent(this,[tooltip,slider]));
			addEvent('load',this.recalibrateSlider.bindWithEvent(this,[tooltip,slider]));
		},
		initializeTooltip: function(li,content,tooltip) {
			var show = this.showTooltip.bindWithEvent(this,[tooltip]);
			var hide = this.hideTooltip.bindWithEvent(this,[tooltip]);
			// these should be set just by adding the 'tooltipHide' class but FF2 doesn't
			// redraw properly with the elements hidden
			var morph = tooltip.get('morph',{duration:500,link:'cancel',unit:'%'})
					.set({ top: '75%', left: '-8.5%', visibility: 'hidden', opacity: '0' });
			li.addEvents({mouseenter: show,mouseleave: hide});
			this.initializeSlider.delay(100,this,[tooltip]);
		},
		recalibrateSlider: function(e,tooltip,slider) {
			slider.options.size = (tooltip.getSize().y - tooltip.getElement('h3').getSize().y);
			slider.recalibrate();
		},
		showTooltip: function(e,tooltip) {
			tooltip.morph('.tooltipShow');
		}
	});
	var port = new Portfolio();
})();
