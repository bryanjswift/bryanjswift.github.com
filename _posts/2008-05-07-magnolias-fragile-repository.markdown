--- 
layout: post
title: Magnolia's fragile repository
tags: 
- thoughts
- java
- software
status: publish
type: post
published: true
meta: 
  _edit_lock: "1220282903"
  _edit_last: "2"
---
As a follow-up to <a href="http://bryanjswift.com/2008/05/07/what-the-heck-happened/">my previous post</a>, I have spent most of today attempting to import a large amount of data into an existing or a new Magnolia repository. Granted I am using the community edition, and a year old version of the community edition at that. None-the-less having to import pages one by one when they are categorized seems asinine. I guess I should clarify, Magnolia is capable of importing parent pages and the parent's child pages all at once, however the some of the child pages have quite a lot of information attached to them which seems to cause a number of problems when importing.

To make matters worse every time something went wrong with an import connections to the repository would crash and the repository would get, for lack of a better word, corrupted. This meant every problem imported was directly followed by cursing and a reinstall of tomcat and Magnolia and the magnolia module specific to this particular project. I finally gave up on importing large (more than 100MB) files and am now in the process of importing individual pages because the parent was much too large.

The best part is, I still am not totally sure what the root cause of the problem was so for all I know I may be doing this all over again tomorrow, or a week from today or what have you.
