(function() {
	String.implement({
		template: function(props) {
			var regex = /%(\w+)%/g;
			var newStr = this.replace(regex,function replacer(mid) {
				var key = mid.substring(1,mid.length-1);
				var value = props[key];
				if (typeof value === 'string') {
					return props[key];
				} else {
					return '';
				}
			});
			return newStr;
		}
	});
	var production = location.host === 'portfolio.bryanjswift.com';
	var body = $('body');
	portfolio = {
		INCLUDE_PATH: 'includes/%includeName%.php',
		request: new Request.HTML({
			'update': body,
			'evalScripts': false,
			'method': 'get'
		}),
		navParents: new Elements(),
		tracker: _gat._getTracker("UA-4339554-3"),
		updateProject: function(e) {
			var evt = new Event(e);
			evt.stop();
			portfolio.nav.getChildren().removeClass('active');
			var href = this.get('href');
			this.getParent().addClass('active');
			var params = { includeName: href.substring(href.indexOf('=') + 1) };
			var path = portfolio.INCLUDE_PATH.template(params);
			portfolio.request.removeEvents('onSuccess').addEvent('onSuccess',portfolio.requestSuccess.pass(['/ajax/' + path]));
			portfolio.request.get(path);
		}
	};
	portfolio.requestSuccess = production && portfolio.tracker ? portfolio.tracker._trackPageview : $empty;
	
	addEvent('domready',function() {
		portfolio.tracker._initData();
		if (production) { portfolio.tracker._trackPageview(); }
		portfolio.nav = $('nav');
		portfolio.nav.getElements('a').addEvent('click',portfolio.updateProject);
	});
})();