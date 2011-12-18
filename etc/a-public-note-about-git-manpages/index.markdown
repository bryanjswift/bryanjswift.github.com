--- 
layout: post
title: A Public Note About Git Manpages
tags: 
- etc.
- "*nix"
- git
status: publish
type: post
published: true
meta: 
  _edit_lock: "1231829527"
  _edit_last: "2"
---
If you need to install all the software to compile the git manpages check out <a href="http://rails.wincent.com/wiki/Setting_up_the_Git_documentation_build_chain_on_Mac_OS_X_Leopard" title="wincent.com: Setting up the Git documentation build chain on Mac OS X Leopard">wincent.com: Setting up the Git documentation build chain on Mac OS X Leopard</a>.

If the only concern is recompiling the man pages...

<pre>
make prefix=/usr/local doc
sudo make prefix=/usr/local install-doc
</pre>
