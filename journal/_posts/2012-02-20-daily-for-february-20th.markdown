---
layout: post
title: Daily for February 20th, 2012
date: 2012-02-20 23:59:59
published: true
categories: ["journal"]
---
 
# February 20, 2012

## 8:16:34 PM EST

I haven't written in a while but the last few days have been relatively uneventful. I've mostly been working on Persnicketly, trying to get it to support a more scalable queue. I decided to use Redis and write a queueing solution. The queue was actually fairly easy to implement using Redis list operations the troubling part has been writing something to make Persnicketly aware of and manage the cluster. The clustering part is proving quite difficult and none of the Redis client's I have found manage this for you, at least not the ones written for the JVM.

I'm currently using a client library called [lettuce](http://github.com/wg/lettuce). I really like the library because it provides some illusion of type safety by implementing codecs which are used to parse the byte arrays into the appropriate classes.