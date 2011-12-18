--- 
layout: post
title: "How-To: Override the Search Widget in Your Wordpress Theme"
tags: 
- thoughts
- how-to
- web development
- wordpress
status: publish
type: post
published: true
meta: 
  _edit_lock: "1220283497"
  _edit_last: "2"
---
As I've mentioned previously I've been developing my own Wordpress theme. During the course of this I found, as many others have, the 'Search' widget available in the Wordpress sidebar does not use the <code>searchform.php</code> file which template developers can provide. This irritated me and I was pretty sure the behavior of the 'Search' widget could be overridden in <code>functions.php</code>. I was right...
I found the beginning of the answer in the <a href="http://automattic.com/code/widgets/api/" title="Widgets API &laquo; Automattic">Wordpress Widget API</a> but to me the language of 
<blockquote>It is possible for theme authors to define replacement widgets within functions.php. Replace an existing widget by registering its name with a new callback. An empty callback will unregister a widget.</blockquote>
was a little convoluted. As it turns out you need to do two things.

First, define a new function to use as the 'widget callback' or the function that is called when the widget is included in the page.
<pre>
	function bjs_widget_search($args) {
		extract($args);
		echo $before_widget;
		echo $before_title;
		_e("Search");
		echo $after_title;
		include (TEMPLATEPATH . '/searchform.php');
		echo $after_widget;
	}
</pre>

Second, re-register the search widget using your new function name as the callback function.
<pre>
	$widgetOptions = array('classname' => 'widget_search', 'description' => __( "A search form for your blog"));
	wp_register_sidebar_widget('search',__('Search'),'bjs_widget_search',$widgetOptions);
</pre>

And that's all there is to it. You may notice that I actually did more than just make the search widget include <code>searchform.php</code> I also added a header tag with a title for the widget. Keep in mind if you use ids for your search form elements this <em>may</em> invalidate your markup if the search form appears (or can) more than once on your page
