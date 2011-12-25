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

I've open sourced it under a [non-commercial, share alike Creative Commons license](http://creativecommons.org/licenses/by-nc-sa/3.0/). If you want to do something with the source this license doesn't allow contact me at <bryan.j.swift@gmail.com>.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/3.0/80x15.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">Persnicketly</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://bryanwrit.es" property="cc:attributionName" rel="cc:attributionURL">Bryan J Swift</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License</a>.<br />Based on a work at <a xmlns:dct="http://purl.org/dc/terms/" href="http://github.com/bryanjswift/persnicketly" rel="dct:source">github.com</a>.<br />Permissions beyond the scope of this license may be available at <a xmlns:cc="http://creativecommons.org/ns#" href="http://bryanwrit.es/blog/2011/open-sourced-persnicketly" rel="cc:morePermissions">http://bryanwrit.es/blog/2011/open-sourced-persnicketly</a>.