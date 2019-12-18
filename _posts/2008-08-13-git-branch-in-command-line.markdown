--- 
layout: post
title: Displaying Git Branch in the Command Line
tags: 
- thoughts
- "*nix"
- git
- mac
status: publish
type: post
published: true
meta: 
  _edit_lock: "1220284162"
  _edit_last: "2"
---
I was hunting around looking for information about port from svn to git and getting git-svn to compile on OS X a little while back when I ran across <a href="http://www.simplisticcomplexity.com/2008/03/13/show-your-git-branch-name-in-your-prompt/" title="Show Your GIT Branch Name In Your Prompt">Maddox's explanation of branch name in command line</a>. At the time I thought 'Awesome!' but I was on a mission so into <a href="http://delicious.com/bryanjswift" title="bryanjswift's Bookmarks">del.icio.us</a> it went to await later discover.

A couple of days ago I found the post again in my bookmarks and proceeded to spruce up my command line with the knowledge in Maddox's post and in <a href="http://www.mactips.org/archives/2005/07/31/customize-prompt-on-mac-os-x/" title="Customize Prompt on Mac OS X">MacTip's Customize Prompt on OS X article</a>. The long and short of it is that the colors in my command prompt bother me so I cut them out of Maddox's function and ended up with the following to lead off my <code>~/.bash_login</code>.

<pre>
<code>
###### Prompt Setup ######
function parse_git_branch {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/[\1]/'
}
 
function gitPrompt {
PS1="\h:\W\$(parse_git_branch) \u\$ "
PS2='> '
PS4='+ '
}
gitPrompt
</code>
</pre>

I have to say I'm quite please with the new addition to my command line!
