---
layout: post
title: Interacting with a Redis Cluster
date: 2012-03-15 17:32:25
published: true
categories: []
---

*This is a thing I wrote seven years ago and was stuck in drafts unfinished. I'm "publishing" it now unchanged except for this note, mostly to highlight for myself I was thinking about horizontal scalability for systems I was writing seven years ago.*

After an interview with the folks at [Knewton](http://www.knewton.com/) served as a reminder for an aspect of [Persnciketly's](http://persnicketly.com) architecture which was not capable of scaling horizontally. This specific limitation was due to the choice of [RabbitMQ](http://www.rabbitmq.com/) as a message broker. Previous versions of RabbitMQ did not have support for [Mirrored Queues](http://www.rabbitmq.com/ha.html) though it has since been remedied.

In an effort to make Persnicketly easier to scale out the decision was made to change out RabbitMQ for Redis. Redis is not in and of itself a message broker though it supports data structures which lend it being used as one.
