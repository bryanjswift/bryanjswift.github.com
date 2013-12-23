---
layout: post
title: Daily for January 6th, 2012
date: 2012-01-07 00:26:40
published: true
categories: ["journal"]
---
 
Up stupid early this morning. The alarm goes off at 03:45, about four hours after 'bedtime'. Before falling asleep last night I thought about where I might have put my keys and couldn't remember so I added a reminder to look for them this morning. After my shower I tore through the boxes left at Mom and Dad's to try and find them and didn't. I don't remember where in my bag I had them. Hopefully they are in my boots or something and I'll find them in DC.

For the first time I was faced with the back scatter radiation machines at security in LAX. I opted out as I think everyone should but I was the only one I saw. Maybe I'm not as sensitive about my "areas" as others but the pat down didn't feel overly invasive (compared to the possibility of getting cancer). Or at least not as bad as the internet had made it out to be. I guess that is how the internet works though.

Worked on Persnicketly for the first couple hours of the flight and got the map-reduce solution working. At least it seems to be working, I should probably do some more testing though. In the course of this I discovered at least part of the reason the front-page hadn't changed in so long: the group based aggregation I was doing fails if there are more than 20000 unique ids. Of course I was doing this in a scheduled task in a joined thread so the exception was being discarded. It is why the compute job was only executing once throughout the lifetime of the JVM though.

Once back at Dave's house I fixed a few more Persnicketly bugs and pushed it live. Then Mai and I hung out for a little while watching movies and the like. Then we looked for apartments for what seemed like forever. Fucking Craigslist.
