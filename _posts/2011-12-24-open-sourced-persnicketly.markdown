---
layout: post
title: Open Sourced Persnicketly
date: 2011-12-24 15:52:05
published: true
categories: []
---
 
I just updated the [Persnicketly repository](http://github.com/bryanjswift/persnicketly) on GitHub. Originally it was closed source because it was for a API contest potentially worth money and talking with [Rachel Diesel](http://dieselation.com/), my design partner in the [Persnicketly](http://persnicketly.com) venture we were considering ways to monetize it.

As of now though Persnicketly is much more of a portfolio piece for me (and her as well) I suspect than it is a side project we are still actively pursuing. And so it is much more valuable to me if people can see the source code for what I did than if they can only see the product.

Some of my favorite parts of the source are the [Queue trait](https://github.com/bryanjswift/persnicketly/blob/master/src/main/scala/com/persnicketly/mill/Queue.scala) because it made doing simple AMPQ (Advanced Message Queuing Protocol) operations relatively easy. On the front end my favorite part is the [corner image](https://github.com/bryanjswift/persnicketly/blob/master/src/main/webapp/img/corner.png) used to create the stars and plusses in the bottom right corner of the article blocks.

I've open sourced it under a [non-commercial, share alike Creative Commons license](http://creativecommons.org). If you want to do something with the source this license doesn't allow contact me at <bryan.j.swift@gmail.com>.