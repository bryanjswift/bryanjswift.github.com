---
layout: post
title: Daily for February 23rd, 2012
date: 2012-02-23 23:59:59
published: true
categories: ["journal"]
---
 
# February 23, 2012

## 12:29:53 AM EST

I finally fixed the problem where my Redis connection was throwing command timed out errors. The timeout I was using for the blocking pop operations was the same timeout as for the underlying connection. As a result the connections were timing out before the blocking pop operations and I was getting an Exception. I finally figured it out because looking at the log files I could see the processing was getting done when there was data in the Queue but when empty the timeouts would happen. 

The problem with connections dying seems to have been solved as well but this was fixed by making RedisConnection instances shorter lived inside RedisQueue::startConsumer by doing the while loop outside the call to withClient. This means there is more connection overhead because it happens often but it doesn't die. 

## 11:37:46 PM EST

Confirmed a meeting with Kaare and followed up on some other potential leads, including hearing from Doug. They do have some work coming up I may be able to help with in a couple of weeks which would be great. Good pay and generally good hours. 

I also got an email from Darrell about a potential iOS development project for a successfully Kickstarted product called The Present. I don't have much iOS experience but I would like more and working on a fairly simple app would be a great way to get some and with Darrell's recommendation and a low rate (low for iOS devs anyway) I think I could actually get the gig and I know I could finish the project. 

Mai and I walked around a bit today doing errands. It hurt to be walking around but I know it was good for my joints because they feel better tonight than they have the last couple nights after days of being lazy. Hopefully things will continue to improve and I can just cut the booze and get on with my life. My new different life. I guess this is me finally accepting my life is never going back to the bottle of whiskey in a couple days mode. I will miss it but not drinking and being relatively pain free is way better than drinking and having to take drugs for the rest of my life. 