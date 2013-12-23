---
layout: post
title: Daily for February 22nd, 2012
date: 2012-02-22 23:59:59
published: true
categories: ["journal"]
---
 
# February 22, 2012

## 1:04:02 AM EST

I've been trying for days to write a stable Queue implementation which uses Redis as the broker and is aware of a cluster and I can't for the life of me figure out why it keeps failing. 

Now it seems as though I am randomly losing connection with Redis or the client connections are being closed when they shouldn't. I thought I could get around the problem by swallowing connection errors and moving on but that seems to cause the commands to time out again and again. 

I need to diagnose what is happening but I'm not sure how. I could setup up a network proxy at a system level so I could look at the traffic. I could also add some logging in my code and turn down the general verbosity of the logging except for the package I am working in. 

In order to solve this I may need to not keep an open connection but rather re-establish a connection periodically. Maybe what I really need is a consumer monitor process which keeps track of running threads and restarts them when they fail. 

## 3:10:23 PM EST

I just heard from Dave Garfinkel at Knewton and they decided against wanting to bring me on. I'm not terribly upset about this one company passing but the collection of disinterest is getting disheartening.