--- 
layout: post
title: MooTools Builder Script
tags: 
- thoughts
- mootools
status: publish
type: post
published: true
meta: 
  _edit_lock: "1220284348"
  _edit_last: "2"
---
Back when MooTools 1.2 was released I decided I would upgrade/update a number of scripts I had written which were dependent on MooTools and then release them to the open source community. However, with work and some other things going on in my life it has taken a much longer time than anticipated to get things started. Plus there have been other distractions, I would call the subject of this post one such distraction.

I created a script called MooBuilder which examines the javascript objects loaded into memory to determine which components of MooTools are included when MooBuilder loads. The included modules the MooBuilder is aware of can be manually refreshed later if desired. In addition to testing what is already loaded the script will also include new MooTools modules and dependencies if the location to the source trees has been provided. For example I have mootools-core and mootools-more gits on my server so I can point the script at, for example, http://static.bryanjswift.com/mootools-core/Source and it will know where to find the appropriate scripts based on the script name. The script names are determined by the core and more builders and the dependencies are determined by a slightly modified version of scripts.json which is included in each of the source trees.

An example use of MooBuilder to include the Accordion script:

<pre>
<code>
var builder = new MooBuilder('http://static.bryanjswift.com/mootools-core/Source',
                             'http://static.bryanjswift.com/mootools-more/Source');
builder.include('Accordion');
</code>
</pre>

The last feature of the script is the ability to register your own scripts. Registering a script is done by passing the MooBuilder::register an object with a name, a path, a test function to determine if it is already included, and an array of dependencies. For example to register and then include the <a href="http://bryanjswift.com/2008/06/19/mootools-fxposition-nearing-completion/" title="Fx.Position Nearing Completion">Fx.Position script I posted about previously</a> I would:

<pre>
<code>
var builder = new MooBuilder('http://static.bryanjswift.com/mootools-core/Source',
                             'http://static.bryanjswift.com/mootools-more/Source');
builder.register({
    'name': 'Fx.Position',
    'deps': ['Fx.Morph'],
    'test': function() { return typeof Fx !== "undefined" && typeof Fx.Elements !== "undefined"; },
    'path': 'http://github.com/bryanjswift/mootools-plugins/tree/master%2FSource%2FFx%2FFx.Position.js?raw=true'
});
builder.include('Fx.Position');
</code>
</pre>

Obviously registering the scripts you need in every page and then including them seems silly, but I envisioned to use of the script to be creating a builder in the site's main js file and registering all possible components and then on each page including just the ones needed for a given page. Another scenario would be having components themselves tell the builder what they needed before defining them.

I'm certainly open to any feedback!
