---
layout: post
title: Using Local DNS Server for Device Testing
date: 2014-05-03 07:32:36
published: true
categories: []
styles: /assets/posts/2014-05-03-using-local-dns-server-for-device-testing/style.css
---

## TL;DR

I used [unbound][unbound] to set up a local DNS server then pointed my wireless router at it. This made it easy to test changes from my development machine right on the device on the my local wifi network without a noticeable affect on standard browsing performance.

## Motivation

The web application I've been working on ([Lynr, a cloud based inventory management tool for car dealerships][lynr]) is targeted primarily for mobile use cases. In this case mobile translates (mostly) to small viewport and moving but not necessarily distracted. To facilitate rapid development, all my local testing had thus far been done in Google Chrome with a narrow (640 pixels wide) viewport. This was fine for a while but inevitably there were rendering differences between desktop Chrome, Mobile Safari, Android Browser and Android Chrome. The nearer to launch we got (and now post-launch) the more important these small differences became. I needed a way to test local application changes without first pushing them to a staging server[^1].

## Assumptions

I'm running OS X 10.9 (Mavericks) and have access to the admininstration panel of my wireless router. Unbound should work with any Linux based OS and the DNS changes can be done per device (at least for iOS) rather than on the router but making the DNS change on the router makes it one change for all devices and one change to revert when you're done testing[^2] as opposed to having to manage settings on multiple devices[^3]. Linux software packages are installed via [Homebrew][homebrew].

## Setup

The first thing to do is install [Unbound][unbound] which is the crux of this the whole solution.

	$ brew install unbound
	
	==> Downloading https://downloads.sf.net/project/machomebrew/Bottles/unbound-1.4.22.mavericks.bottle.tar.gz
	######################################################################## 100.0%
	==> Pouring unbound-1.4.22.mavericks.bottle.tar.gz
	==> Caveats
	To have launchd start unbound at startup:
    	sudo cp -fv /usr/local/opt/unbound/*.plist /Library/LaunchDaemons
	Then to load unbound now:
	    sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.unbound.plist
	==> Summary
	🍺  /usr/local/Cellar/unbound/1.4.22: 52 files, 3.4M
	
I don't like software always running in the background if it isn't necessary so I did not run the `launchctl` command. Instead I am starting unbound when I want it running using [`dtach`][dtach][^4]. You could alternatively use `screen`, `tmux`, `launchctl` or even an open and ignored terminal window; whatever you are most comfortable with.

The next thing to do is configure `unbound`. The configuration file, when installed via homebrew, is located at `/usr/local/Cellar/unbound/1.4.22/etc/unbound/unbound.conf`. My [full unbound.conf][unbound.conf] is not embedded because I modified the default file and, including comments, it is 650 lines. The important bits are included below and in this [abbreviated unbound.conf file][unbound.conf.abbr].

<script src="https://gist.github.com/bryanjswift/2f31ace15bbfffea0ae3.js?file=abbreviated-unbound.conf"></script>

The things to make sure you change are `access-control:`, `username:` and the `local-zone:`. Search for these properties in `/usr/local/Cellar/unbound/1.4.22/etc/unbound/unbound.conf` and change them. `username:` is the easiest to change, it should be whatever your username is when you are logged in. If you don't know this you can find out by executing the `whoami` command in a Terminal window. Regarding `local-zone:`, during development I run local applications with names like `production.domain.com.local` because it makes both what I'm working on and where it is hosted obvious at a glance. The domain name (lynr.co.bimac from my abbreviated configuration file) in `unbound.conf` can be changed to whatever convention you've adopted for yourself. `access-control:` is an IP mask for your router's internal IP addresses. Internal IPs typically start with `192.168.` or `10.0.`. To find out which your router uses open the Network panel in System Preferences and look for the text 'and has the IP address' under 'Status: Connected' when looking at the Wi-Fi panel. The first two numbers (dots included) should replace the `10.0.` on line 8 of [abbreviated unbound.conf][unbound.conf.abbr]. The whole IP address should replace `10.0.1.7` on line 15.

![Example of internal IP address in System Preferences](/assets/posts/2014-05-03-using-local-dns-server-for-device-testing/system-preferences-network-internalip.png)

Unbound should now be appropriately configured to direct requests for your web application to the machine where your local development server is running. All you have to do is start it. Starting unbound will require `sudo` or superuser/admin privileges[^5]. I start `unbound` via `dtach` by executing `dtach -c unbound.sock sudo /usr/local/opt/unbound/sbin/unbound -c /usr/local/Cellar/unbound/1.4.22/etc/unbound/unbound.conf`, if you are using `screen`, `tmux` or something else you only need `sudo /usr/local/opt/unbound/sbin/unbound -c /usr/local/Cellar/unbound/1.4.22/etc/unbound/unbound.conf`.

On the topic of your development server, make sure it is binding to `0.0.0.0` or your internal IP address (e.g. 10.0.1.7) and not `127.0.0.1` (localhost). If your development server is bound to localhost it will not be able to accept connections that do not originate from your local machine. Lynr is built on a Ruby/Rack stack and by default the `rackup` command binds to `0.0.0.0`. However, if you're changing Ruby files you're likely to be using something like [shotgun][shotgun] which binds to `127.0.0.1` by default. `shotgun` accepts a `-o` option to change host, so `shotgun -o 0.0.0.0` will change the host to which the ruby process binds. If you're developing with [Node.js][node] the [`server.listen`][node.server.listen] does the right thing (binding to 0.0.0.0) by default.

The last thing to do on your development machine is to make sure the OS firewall is either disabled or allowing connections by the `unbound` process and whatever process is running your site (ruby in my case). Firewall settings are found in System Preferences in the Security & Privacy panel on the Firewall tab. When the firewall is on the panel says 'Firewall: On' with a green dot.

![Example of System Preferences Firewall panel](/assets/posts/2014-05-03-using-local-dns-server-for-device-testing/system-preferences-security-firewall.png)

If the firewall is on go into Firewall Options... and make sure the `unbound` and your server process have green dots saying 'Allow incoming connections'.

![Example of System Preferences Firewall options](/assets/posts/2014-05-03-using-local-dns-server-for-device-testing/system-preferences-security-firewall-options.png)

Your development machine is now ready to respond to DNS requests and serve your application to devices on the network. The last thing we have to do is tell the devices to use your shiny new, local DNS server. I did this by changing my router settings to use my development machine for DNS queries first and [Google Public DNS][googledns] second. I have an Apple Airport Extreme so I was able to do this with the Airport Utility application. If you change the DNS settings on the router they will propogate to all devices connected to the network[^6] via that router.

![Example of Airport Utility DNS Servers](/assets/posts/2014-05-03-using-local-dns-server-for-device-testing/router-dns-settings.png)

The DNS server settings can also be changed one a device-by-device basis. On iOS 7, for example, go into Settings > Wi-Fi and tap the blue information circle next to your wireless connection. About two thirds of the way down the screen is a field which says DNS where you can add the internal IP address of your development machine.

![Example of iOS 7 Network DNS Servers](/assets/posts/2014-05-03-using-local-dns-server-for-device-testing/settings-wifi-network.png)

If anyone knows how to change this on an individual Android device I'd appreciate it if you [let me know](mailto:mail@bryanwrit.es).

I've been running this setup for a couple of days and I haven't noticed any degraded network performance, even when my development machine is asleep and not able to serve DNS requests. This has been a huge win for me, vastly improving my workflow and front-end testing on devices.



[dtach]: http://dtach.sourceforge.net
[googledns]: https://developers.google.com/speed/public-dns/
[homebrew]: http://brew.sh
[lynr]: https://www.lynr.co
[node]: http://nodejs.org
[node.server.listen]: http://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback
[shotgun]: https://github.com/rtomayko/shotgun
[unbound]: http://unbound.net
[unbound.conf]: /assets/posts/2014-05-03-using-local-dns-server-for-device-testing/unbound.conf
[unbound.conf.abbr]: /assets/posts/2014-05-03-using-local-dns-server-for-device-testing/abbreviated-unbound.conf

[^1]: Lynr is hosted on Heroku and I didn't want to create a commit and push to staging to test every change. I did this for a couple of changes and it was a pain in the ass.
[^2]: for the day, because you're never done testing.
[^3]: Assuming you're testing on multiple devices. You *are* testing on multiple devices right?
[^4]: `dtach` hasn't been updated in years but it continues to run just fine.
[^5]: `unbound` binds to port 53 which requires root access.
[^6]: Provided those devices are getting IP addresses from DHCP.