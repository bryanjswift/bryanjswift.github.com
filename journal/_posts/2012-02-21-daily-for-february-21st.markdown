---
layout: post
title: Daily for February 21st, 2012
date: 2012-02-21 23:59:59
published: true
categories: ["journal"]
---
 
# February 21, 2012

## 3:12:55 AM EST

I think I may finally be honing in on a solution with Redis clustering that actually works. Unfortunately I can't see a way to contribute it back to lettuce. I think it works in large part because I can live with some downtime for my queues but I'm not sure I would be satisfied with Redis as a persistent data store. 

I am not sure I could contribute it back because I am making use of Actors to handle the election asynchronously. But I guess in Java I could use the synchronized keyword on this same method call, or at least for the block of it I don't want executing often. 

I also implemented the queue helper method which goes and moves things from the ack list to the queue list. This helper method is making use of some new scheduling methods I put into the mill.Foreman. I'm leaving it running locally while we sleep and will check on the logs in the morning. If all is way it may be ready for another bug fix deployment. 

## 3:21:16 AM EST

Mai really burnt the crap out of her hand last night while we were making dinner. By reaching over a steaming teapot she gave herself a small second degree burn on her wrist. The blister is pretty gnarly looking and she is in a lot of pain. I do think she has managed to fall asleep but she has her wrist submerged in cold water in order to manage it while sleeping. 

Poor girl, I wish there was something I could do to help her. 

## 11:48:58 AM EST

Woke up with my left knee hurting a great deal. I guess I really do need to quit drinking. I had been trouble free for so long I foolishly assumed I would be ok for a little while. However, I had a couple drinks a night once a week for three weeks or so and now I'm in pain all over again. Hopefully I can get it to subside with just the colchicine I have remaining and then can just stay away from booze and red meat enough to keep it away. I am tired of paying so much money for medical care.