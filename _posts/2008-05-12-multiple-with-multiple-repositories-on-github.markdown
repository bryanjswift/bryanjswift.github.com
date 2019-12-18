--- 
layout: post
title: Working with Multiple Repositories on GitHub
tags: 
- thoughts
- git
- github
- mac
- software
status: publish
type: post
published: true
meta: 
  _edit_lock: "1220283375"
  _edit_last: "2"
---
Apparently there's been quite a buzz in the open source community lately about <abbr title="Distributed Version Control System">DVCS</abbr>s in general and <a href="http://git.or.cz/" title="Git - Fast Version Control System">Git</a> and <a href="http://www.selenic.com/mercurial/wiki/" title="Mercurial"><abbr title="Mercurial">Hg</abbr></a> in particular. Up until pretty recently (sometime in the past week) I had totally missed the boat on this. However, I spent some time reading about them in a number of places, though apparently <a href="http://www.dribin.org/dave/blog/archives/2007/12/28/dvcs/" title="Choosing a Distributed Version Control Systme">Dave</a> <a href="http://www.dribin.org/dave/blog/archives/2007/12/30/why_mercurial/" title="Why I Chose Mercurial">Dribin</a>'s writings are the only ones I bookmarked. None-the-less being a good the good little open source developer I pretend to be I thought I ought to at least tinker around with one of them and see what it was all about.

In mostly a snap decision I chose Git, though <a href="http://www.youtube.com/watch?v=4XpnKHJAok8" title="Google Tech Talk: Linus Torvalds on Git">Linus' highly entertaining tech talk</a> may have influenced me. Either way, I already had a project I was working on, it isn't exactly a compelling open source project but I didn't have it under version control yet and it couldn't hurt to get it somewhere. So having decided on Git I registered for a <a href="http://github.com/" title="GitHub">GitHub</a> account and created a repository for it. The whole process was simple and easy, no problems there. Basically the premise behind GitHub is like a developer's social network (well that and free Git repository hosting), you find a project you like and you follow (watch) it or you clone (fork) it. So then I saw <a href="http://ejohn.org/" title="John Resig">John Resig</a>'s <a href="http://twitter.com/jeresig/statuses/809561495" title="Twitter / John Resig">tweet</a> that his recently released <a href="http://ejohn.org/blog/processingjs/" title="processing.js">Processing.js project</a> was being hosted on GitHub and so I decided to fork it, look at the source and play around with it a bit.

The forking process was super easy, one click after being logged in and I had forked his project. No problems there but then I wanted to pull it down to my local machine or clone it so I had a working copy and here's where I ran into problems. Executing <code>git clone git@github.com:bryanjswift/processing-js.git</code> generated the following output.

<pre>Initialized empty Git repository in /Users/.../Projects/processing-js/.git/
ERROR: Permission to bryanjswift/processing-js denied to bryanjswift/bjs-wordpress.
fatal: The remote end hung up unexpectedly
fetch-pack from 'git@github.com:bryanjswift/processing-js.git' failed.</pre>

After a little research I figured out the problem was basically the wrong RSA key was being sent to GitHub and since GitHub uses the RSA key to identify you and determine if you have access to the repository or not my access was being rejected for one or the other of the repositories. Which repository depended on which RSA key was first on the list of the output from <code>ssh-add -l</code>

I could probably have written a pre-hook and post-hook for each of the git repositories I wanted to acess but given the nature of the man who wrote Git I knew there <em>had</em> to be a better solution. So I start digging around and I find a <a href="http://github.com/guides/multiple-github-accounts" title="Multiple GitHub Accounts">guide to multiple GitHub accounts</a>. I realize this isn't really the situation I'm in but it does indeed work. I set up an entry in my <code>~/.ssh/config</code> for each of the two projects each looking something like 

<pre>Host github-bjs-wordpress
User git
Hostname github.com
IdentityFile /Users/.../.ssh/bjs-wordpress_rsa</pre>

Happily this worked once I used the new Host entries as the ssh hosts; so <code>git@github.com:bryanjswift/processing-js.git</code> became <code>git@github-processing-js:bryanjswift/processing-js.git</code> I could now access both my repositories. Hooray! Then I was poking around my account page on GitHub and found I can enter an RSA public key for my account and not just for each repository like I had already done. So I realize my mistake was entering myself as a collaborator on each repository and because I had done it that way I had to create multiple RSA keys for myself (GitHub makes each project collaborator on each project have a unique RSA key) which caused a mess.
