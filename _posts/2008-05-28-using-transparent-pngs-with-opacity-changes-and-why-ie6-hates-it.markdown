--- 
layout: post
title: Using Transparent Pngs with Opacity Changes and Why IE6 Hates It
tags: 
- thoughts
- css
- javascript
- web development
status: publish
type: post
published: true
meta: 
  _edit_lock: "1220283532"
  _edit_last: "2"
---
On a project I've been working on recently we are making use of a number of 24-bit PNG images. This has cause a number of problems in IE6 because we're also making use of a number of opacity animations using the <a href="http://mootools.net/" title="mootools">MooTools</a> javascript framework. This results in a lot of black crap showing up when you animate or change the visibility or opacity of the transparent PNGs in Internet Explorer 6 and 7.

The first solution was easy, disable opacity animations on transparent PNGs. This fixed the problem almost completely but on a page with a flash movie and a number of things still changing opacity at the same time (even though it was from 0 to 1 which was basically a visibility toggle) the black overlay still appeared from time to time. The most successful attempts at a solution without eliminating the opacity changes were inspired by an <a href="http://blog.hackedbrain.com/archive/2007/05/21/6110.aspx" title="Mimeo goes 24-bit PNG... IE6 put up a hell of a fight">article about developing Mimeo</a> which was also quite educational about how IE6 handled 24-bit PNGs and some image retrieval in general. The most informational part is included below..
<blockquote><a href="http://msdn2.microsoft.com/en-us/library/ms532954.aspx">The apply method</a> is basically used to tell the filter to capture it's current state in terms of layout and visibility and track changes between then and a call to <a href="http://msdn2.microsoft.com/en-us/library/ms532964.aspx">the play method</a>. It really shouldn't be necessary to call this in the AlphaImageLoader's case because there's no transition, but for whatever reason, this change alone, seemed to make this bug disappear. I say "seemed" because it still appeared every now and then. Later we noticed that once we were no longer including <a href="http://en.wikipedia.org/wiki/PNG#Ancillary_chunks">the gAMA header</a> in the PNGs we generated the problem went away entirely. Since we didn't need gamma settings, this was the final solution to the problem for us. Whether or not the apply call is still needed at this point is unknown as there was no sense in removing something that originally had solved the problem and introduced no performance impact.</blockquote>

Of course I attempted the apply method and removing the gAMA header which rather than fixing the entire problem still only <em>mostly</em> fixed the problem. After being stuck at this point for a while, attempting to find more information and another way to basically fix the way IE6 handled these images without removing the transparency I had something of an epiphany. Since I was already not animating the elements with the transparent background images why not just move them rather than changing the visibility or opacity. It turns out this incredibly simple and solution worked fantastically for me. The elements in question were already using <code>position: absolute;</code> and so all I had to do was set left to something outrageously off the screen, in this case I used -15000px.

Of course the elements won't always already be absolutely positioned but this technique can still be used if you store the original value of position and whatever position attribute (top/left/bottom/right) used to place the element off-screen. That's all there is too it!
