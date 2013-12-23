---
layout: post
title: Daily for January 20th, 2012
date: 2012-01-21 00:28:53
published: true
categories: ["journal"]
---
 
What started out as today's daily turned into a blog post. So let's try again.

Mai went to work filing again today but instead of going to Starbucks to work I stayed at the house and spent the time trying to address some bugs I found. The biggest problem was receiving 401 Unauthorized responses from the Readability API. Presumably the related accounts were either deleted or revoked Persnicketly's privilege to access their information. Regardless there seems to be about five users for whom I may no longer get data. This was causing a problem because yesterday I fixed a bug which meant rejected deliveries were never being re-queued so they simply disappeared. I fixed this by changing it so they were always re-queued which served to highlight these 401 Unauthorized responses.

In order to combat this I am only allowing deliveries to be re-queued once (so two passes total) and we give up if it fails. In the future I would like to be able to do a better job of handling different HTTP response codes but that means moving away from Dispatch as my HTTP interface.

Dispatch is, I'm sure, well done and makes perfect sense to it's author but when I try and read code which uses it I can't help but wonder what the hell is going on.

After working Mai and I went to dinner. After dinner we met her friend Ayana at Willow for dessert. There was a lot of dessert. I had my first drink in weeks, a glass of Balvenie Doublewood, neat. Much of the time was spent with Mai and Ayana catching up and then there was a fair bit of discussion about Ayana having to plan class reunions.