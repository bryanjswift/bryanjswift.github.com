---
layout: post
title: Persnicketly v1.1.7
date: 2012-01-22 20:21:52
published: true
categories: []
---
 
Version 1.1.7 of Persnicketly was just deployed. It contains changes to the way data is retrieved from the Readability API. Dispatch was far too confusing when trying to maintain code written using it. Persnicketly now uses [scribe-java](https://github.com/fernandezpablo85/scribe-java) which is an open source library by [@fernandezpablo](https://twitter.com/fernandezpablo). Dispatch is a 'cooler' piece of software, written in Scala and capable of doing non-blocking IO but it is also difficult brain to parse after some downtime. scribe-java on the other hand uses HttpUrlConnection but works fine and abstracts the requests away in a perfectly understandable way.

The new version of Persnicketly also includes an RSS feed of the top articles in the last sixty days. The RSS feature is not linked too yet because it needs some real word testing first but it should be releasable in the next couple of days.