---
layout: post
title: CaseClassSigParser Exceptions in SBT Console
date: 2012-01-19 00:13:06
published: true
categories: []
---
 
When doing something in an [SBT](http://code.google.com/p/simple-build-tool) console which requires the loading of Case Class instances via [fig](http://github.com/codahale/fig) or [jerkson](http://github.com/codahale/jerkson) ClassNotFoundExceptions will be generated because the console runs in a different ClassLoader than the one responsible for loading other classpath classes. As a result the ClassLoader reflection used to make this bit of `case class` magic doesn't work unless the code is executed within a Thread which has had it's ClassLoader set to the original. This is where `inClassLoader` comes in. Code executed within this beautiful function will produce a result rather than a `ClassNotFoundException`.

For example in [Persnicketly](http://github.com/bryanjswift/persnicketly):

    val articles = inClassLoader(classOf[com.persnicketly.persistence.Connection$]) {
      ScoredArticleDao.select(from = 60, count = 100)
    }

Will successfully load MongoDB configuration from `config.json`, access the db and retrieve articles.

Source of `inClassLoader`:

<script src="https://gist.github.com/1637690.js?file=inClassLoader.scala"></script>
<div class="noscript" markdown="1">
    def inClassLoader[T](cls: Class[_])(f: => T): T = {
      val prev = Thread.currentThread.getContextClassLoader
      try {
        Thread.currentThread.setContextClassLoader(
           cls.getClassLoader
        )
        f
      } finally {
        Thread.currentThread.setContextClassLoader(prev)
      }
    }
</div>

Code provided by [softprops](http://github.com/softprops) in [issue #38 of jerkson](https://github.com/codahale/jerkson/issues/38).