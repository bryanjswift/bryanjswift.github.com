--- 
layout: post
title: Using Gist to Keep Task Synced
tags: 
- thoughts
- "*nix"
- git
- github
- productivity
status: publish
type: post
published: true
meta: 
  _edit_lock: "1220284300"
  _edit_last: "2"
---
The folks at <a href="http://github.com" title="GitHub">GitHub</a> recently launched <a href="http://gist.github.com" title="Gist">Gist</a> which may well be the best code sharing/pasting tool ever. It has nice syntax highlighting and a plain user interface plus you can share more than one file in the same paste or gist. In addition to this you have the ability to create a 'private' gist. The quotes are because they are private only by obscurity not by any authentication logic. A SHA1 (I think) key is created and they use that as the url to you new, small git repository but they don't show up in the view of all gists and a SHA1 is pretty unlikely to have it's value guessed correctly.

Gist by itself is great news and a useful tool but the thing I find really appealing is that I can use it to keep simple text files in sync across multiple computers. This is incredibly useful to me because I typically track my work hours in a simple text file because our timesheet application is pretty horrendous to use and I want to deal with it as few times a week as possible. So I created a new private gist and added this time tracking text file and now I don't have to worry about having my hours at work but not at home or vice versa because I can just pull from the private gist. Not only that but now my time tracking sheet is versioned so I don't have worry about losing notes I make about how I spent my time in the unlikely event someone asks I can find it.

This was a grand breakthrough for me and I was quite pleased. Lately though I got to looking at some task tracking software and found some great ones but I am reluctant to pay for software I know I'm likely to stop using after a little while. Of the free options I didn't find any which would allow me to easily sync my todo list from my home computer to my work computer. About this time I remembered a shell script I had used about a year ago which tracked all the information in simple text files. After a little looking I found <a href="http://todotxt.com/" title="Todo.txt">Todo.txt - Task tracking for command line lovers</a>. I dug around for the script on my computer and tried to update it but whenever I listed out my tasks I had this -e being printed in front of the first one. I'm fairly certain it was a misplaced sed argument but with all the regular expressions in the shell script I didn't want to break things worse. I tried to search for the problem and came up empty on the mailing list but did find a link to <a href="http://www.beckingham.net/task.html" title="Task 1.4.1">a todo manager called Task</a> which even provided an installer for Leopard!

Once I installed the package it was a simple matter of updating the configuration to write files to the directory where my time tracking gist was already located and TADA! easy syncing of time and tasks across multiple computers using the magic of the command line.
