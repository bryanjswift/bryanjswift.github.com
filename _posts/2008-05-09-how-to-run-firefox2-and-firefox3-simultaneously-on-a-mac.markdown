--- 
layout: post
title: "How-To: Run Firefox2 and Firefox3 Simultaneously on a Mac"
tags: 
- thoughts
- "*nix"
- how-to
- mac
- software
status: publish
type: post
published: true
meta: 
  _edit_lock: "1220283204"
  _edit_last: "2"
---
I've found a number of step by steps to set this up on a Windows machine, the most in-depth being on <a href="http://lifehacker.com/software/firefox/geek-to-live--manage-multiple-firefox-profiles-231646.php" title="Manage multiple Firefox profiles">Lifehacker</a>. However, I haven't found a quick one to set up multiple profiles on the Mac.

My reason for wanting to do this was pretty simple; I wanted to be able to play with Firefox3 while still using Firefox2 and the magic of <a href="http://getfirebug.com" title="Get Firebug">Firebug</a> for debugging and web development. As I knew from the many PC articles I just needed to set up a profile for each browser. Since I already had Firefox2 in my Applications folder (Firefox.app) I opened up terminal and ran <code style="text-align: center;">/Applications/Firefox.app/Contents/MacOS/firefox -ProfileManager</code> which brings up a screen allowing you to manage existing profiles and create new ones it should look something like this... <a href='/assets/img/blog/firefoxprofilemanager.png'><img src="/assets/img/blog/firefoxprofilemanager.png" alt="Firefox Profile Manager" title="Firefox Profile Manager" width="335" height="253" class="aligncenter size-full wp-image-25" /></a>As you can see I've already added the profile, yours will probably only have one profile called default and will have the "Don't ask at startup" checked. The first thing I did was rename the default profile to Firefox2 (since that is what I already had installed and had been using). Then I created a new profile called Firefox3 and unchecked "Don't ask at startup". Easy as pie. After that I renamed Firefox.app in my Applications folder to Firefox2.app, downloaded the Firefox3 beta, copied it to Applications and renamed it to Firefox3.app.

<del datetime="2008-05-12T23:22:08+00:00">The drawback is that whenever I launch either application it asks me which profile to use and I have to select the profile I want. I probably could edit the actual shell script at /Applications/Firefox2.app/Contents/MacOS/firefox and /Applications/Firefox3.app/Contents/MacOS/firefox respectively and hardcode the -P option in order to avoid this minor hassle but at this point it doesn't seem worth it</del>.

<em>Update: </em>after realizing I knew how I would do it if I wanted to setup default profiles it really started to bother me that I had to select a profile every time so I tried the method outlined above and it doesn't work. Well it does if you start Firefox by running the script at /Applications/Firefox3.app/Contents/MacOS/firefox but that's not what I foresee most people doing.
