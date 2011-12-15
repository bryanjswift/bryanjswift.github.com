--- 
layout: post
title: "Quick Tip: scp and spaces"
tags: 
- musings
- "*nix"
status: publish
type: post
published: true
meta: 
  _edit_lock: "1220282610"
  _edit_last: "2"
---
<p>Recently I was trying to transfer a file from a server to my laptop, unfortunately the path to the file I needed to transfer has spaces in it and I didn't have the luxury of transferring from the server to my machine.</p>
<p>A quick google search netted a result to <a href="http://rasterweb.net/raster/2005/01/27/scp-and-spaces/" title="RasterWeb!">RasterWeb!</a>. It's an old post and obviously an old problem. In summary...</p>
<blockquote><p>using scp bar@foo.com:"/home/fubar/some\ folder/file.txt" ./ will work. You need to escape the slash and the space</p></blockquote>
