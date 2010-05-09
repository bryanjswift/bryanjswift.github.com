(function() {
	var tracking = location.host.match(/^(portfolio\.bryanjswift\.com)|(bryanjswift\.github\.com)$/);
	window.tracker = _gat._getTracker("UA-4339554-3");
	tracker._initData();
	function trackClick(e,a) {
		tracker._trackEvent('DOMEvent','Click','Outgoing',a.get('href'));
	}
	addEvent('domready',function () { tracker._trackEvent('DOMEvent','Load','domready'); });
	addEvent('load',function() { tracker._trackPageview(); tracker._trackEvent('DOMEvent','Load','load'); });
	addEvent('resize',function() { tracker._trackEvent('DOMEvent','Resize'); });
	$$('a').each(function(a) {
		a.addEvent('click',trackClick.bindWithEvent(this,[a]));
	});
	var oldTrackEvent = tracker._trackEvent;
	var oldTrackPageview = tracker._trackPageview;
	tracker._trackEvent = function() { if (tracking) { oldTrackEvent.run(arguments,this); } };
	tracker._trackPageview = function() { if (tracking) { oldTrackPageview.run(arguments,this); } };
})();
