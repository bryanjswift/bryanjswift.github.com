--- 
layout: post
title: Re-learning old tricks
tags: 
- thoughts
- hibernate
- java
status: publish
type: post
published: true
meta: 
  _edit_lock: "1220282108"
  _edit_last: "2"
---
At work I had been working on a project for a rather difficult client whose name I will decline to mention. But with that work wrapped up in the past week I've been a lot calmer and a lot happier. It has also meant I didn't have a lot of billable work at the office. As a result I decided it was time I got started relearning things I have forgotten due to disuse over the past fourteen months or so. I thought the idea was a good one because from the sounds of things we may have a number of projects coming up soon which will require interaction with a database, something I haven't had to deal with since changing jobs.

I did remember how much easier <a href="http://www.hibernate.org" title="Hibernate">Hibernate</a> made things when I did have to interact with a database so I thought that would be a great place to start my foray into relearning database interaction. Also the last version of Hibernate I used was 2.x and they're now into the 3.x and I wanted to take Annotations for a spin. Put succinctly, Annotations are awesome. It took me a little bit of digging in documentation to remember what all the interactions meant and apply that to what I needed but once I got the hang of it the Hibernate Annotations made adding a new relationship magically easy.

Through the course of writing unit tests for my new database interaction I also discovered <a href="http://hsqldb.org/" title="HSQLDB">HSQLDB</a> which can be used to create a database entirely in memory so your unit tests don't have to rely on a database being up and running on your development machine. I thought that was kind of nice. Given that I found a three year old article at <a href="http://www.theserverside.com/tt/articles/article.tss?l=UnitTesting" title="The Server Side">The Server Side</a> this has been around for a while, none-the-less it was a pleasant discover for me.
