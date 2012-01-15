---
layout: post
title: Check the font-weight Stupid
date: 2011-12-21 13:35:10
published: true
categories: []
---

![font troubles on iOS](/assets/img/blog/2011-12-21-font-trouble.png)
Last night and this morning I was battling a minor but irritating problem with (I thought) Typekit font rendering in iOS. I was setting the headlines of this site in a number of fonts with condensed styles and they all looked as expected in Safari and Chrome on the desktop but when looking at the site on my iPhone or iPad they appeared to have a really heavy `text-shadow`. I took a screen shot and asked [@typekit](http://twitter.com/typekit) [about the problem](https://twitter.com/bryanjswift/status/149542016907350016). I quickly received [a response](https://twitter.com/bdunzer/status/149555140351897601) from [@bdunzer](https://twitter.com/bdunzer) pointing me to a [StackOverflow question similar to my own](http://stackoverflow.com/questions/5069752/ios-4-2-webfont-ttf-s-bold-font-weight-rendering-bug).

The moral of the story is don't forget `h1, h2, h3, h4, h5, h6` have a browser default style of `font-weight: bold`. 
