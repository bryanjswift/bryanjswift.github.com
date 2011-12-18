--- 
layout: post
title: "How-To: Adding Foldings to Javascript Files in MacVim"
tags: 
- thoughts
- how-to
- javascript
- mac
- productivity
- software
status: publish
type: post
published: true
meta: 
  _edit_lock: "1220283470"
  _edit_last: "2"
---
Having used <a href="http://macromates.com/" title="TextMate - The Missing Editor for Mac OS S">TextMate</a> for a while I have grown quite accustomed to being able to fold sections of code, particularly function declarations, so I can glance through the file to see what functions and variables I have defined. However, I recently made a totally nerd bragging rights based decision to test out <a href="http://code.google.com/p/macvim/" title="macvim - Google Code">MacVim</a>. Well it wasn't all bragging rights, being able to navigate a file without having to move my fingers from 'home base' would be a big plus.

The project I'm currently working on though has a couple of really large javascript files and navigating them quickly in MacVim without the foldings was something I found to be quite difficult so I started looking at the Vim help files and found the ability to create folds. Due to a disciplined use of tabs to indent code blocks <code>:set foldmethod=indent</code> worked fairly well but eventually it started to bug me because the of the fold was actually the first line of the content which meant the folds looked something like <code>functionName: function() {<br />+ - - if (test) {<br />},</code>
There had to be a better way. I realized what I wanted to do was create a fold on the line with the function declaration down to the line with the ending brace. I could not find an easy command to do this so I created a simple javascript filetype plugin (<a href='/img/blog/addfoldings.vim'>addfoldings vim plugin</a>).

In order to get this to work I had to add <code>filetype plugin on</code> to my .vimrc file and I had to create the ~/.vim/ftplugin/javascript directory and drop the addfoldings.vim file into it. By default the foldings are all open but they have been created.

<em>Update: </em>Things are of course never as easy as they seem. The above works fine as long as you don't add lines to the file you're working on which is of course absurd, additionally it won't update the foldings as you go which sort of limits the usefulness. Hopefully I'll be able to update this to be more useful.
