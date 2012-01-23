---
layout: post
title: Persnicketly v1.1.7
date: 2012-01-22 20:21:52
published: true
categories: []
---
 
Version 1.1.7 of [Persnicketly](http://persnicketly.com) was just deployed. It contains changes to the way data is retrieved from the [Readability API](https://www.readability.com/publishers/api). Prior to v1.1.7 Persnicketly used [Dispatch](http://dispatch.databinder.net) to communicate with Readability but it was far too confusing when trying to maintain code written using it. Persnicketly is now using [scribe-java](https://github.com/fernandezpablo85/scribe-java) which is an open source library created by [@fernandezpablo](https://twitter.com/fernandezpablo).

Dispatch is a 'cooler' piece of software, written in Scala and capable of doing non-blocking IO but it is also difficult for my brain to parse after some downtime. scribe-java on the other hand uses HttpUrlConnection but works fine and abstracts the requests away in a perfectly understandable way. scribe-java seems to be the simplest solution that works right out of the box.

Persnicketly was also using Dispatch to do JSON parsing of the responses from Readability. The response parsing is now being handled by [Jerkson](http://github.com/codahale/jerkson) written by [@coda](http://twitter.com/coda). Jerkson was already included in the dependency tree so it was a no brainer choice to replace Dispatch's JSON parsing. Switching to Jerkson had the benefit of doing faster parsing while keeping nearly the same level of readability.

The new version of Persnicketly also includes an RSS feed of the top articles in the last sixty days. The RSS feature is not linked too yet because it needs some real word testing first but it should be releasable in the next couple of days assuming articles don't get republished to the feed when they shouldn't.