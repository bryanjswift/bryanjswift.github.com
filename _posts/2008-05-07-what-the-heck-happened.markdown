--- 
layout: post
title: What the heck happened?
tags: 
- reflections
- java
- software
status: publish
type: post
published: true
meta: 
  _edit_lock: "1220282876"
  _edit_last: "2"
---
At some point in recent weeks we had a server essentially just give up. After a little research we found it to actually have been a result of a series of java heap space errors. Fortunately we were able to rescue all of the important data. However, we have not been able to get the server up and stable. It's been up a couple of times for a number of hours but each time the heap space errors would eventually come back.

I'm fairly convinced the heap space errors were the result of a scheduled backup which was running like a cron job except it was scheduled through a java API. More specifically the error was caused by an attempt to write too much data to an xml file from memory. The interesting bit about this is the server ran basically untended for nearly a year. No one checked on it regularly (besides the hosting service) to see the application was still behaving normally, for all I know no one even used the deployed application until a couple weeks ago when someone uploaded a fairly large zip file which the backup attempted to save as binary data killing the server.

Somehow it was determined only the user data actually got corrupted so we saved what we're referring to as the program data and attempted to rebuild <a href="http://www.magnolia.info" title="Magnolia CMS">Magnolia</a>'s jackrabbit repository without having an xml file to import. The only backup we had was the actual repositories directory structure. About here is where things start to get messy.

Because the only backup available was a complete jackrabbit repository directory structure someone had to go mucking about in it. The first important discovery I made was that I could remove individual workspaces and when restarted Magnolia would re-initialize only the removed workspaces. This was a great find because it meant it was possible to remove just the repositories related to user information and then when the server was started again Magnolia would use the bootstrap files to recreate them. However, a large amount of user data had been added since the last successful automatic user repository backup (remember how I said no one was checking on the server?).

I'm not totally sure where I'm going with this. I just needed to walk through it in my head and writing it down helped to do that. I may add more later if I need to straighten my head out again.
