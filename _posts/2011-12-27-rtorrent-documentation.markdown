---
layout: post
title: rtorrent Documentation
date: 2011-12-28 12:55:27
published: true
categories: []
---
 
[rtorrent](http://libtorrent.rakshasa.no) is an awesomely powerful command line BitTorrent (the protocol) client. This little BitTorrent client is important because the tracker I was recently invited to doesn't like the way Transmission reports information.

The documentation for rtorrent is inadequate and so much of today was spent searching on Google for `.rtorrent.rc` file examples and trying to piece together what the declarations meant. My current rtorrent configuration is embedded below from [gist.github.com/1525912](http://gist.github.com/1525912). I have included the explanations I found or puzzled out inline as comments.

Part of the key is keeping torrent files from this private tracker separate from any other torrents I download. I'm using the following folder structure with rtorrent and sorting as appropriate.

<script src="https://gist.github.com/1525912.js?file=gistfile1.txt" async="async"></script>
<noscript>
    tracker
    |-- leeching
    |-- rtactive
    |-- sorted
    |-- torrents
    |-- unsorted
</noscript>

Downloaded .torrent files go into the `torrents` folder for archival purposes, .torrent files can be put into `rtactive` to be automatically added, in progress downloads go into `leeching`, completed downloads go into `unsorted`. From `unsorted` I am manually moving completed downloads into a directory structure under `sorted` and updating the torrent's base directory in rtorrent.

<script src="https://gist.github.com/1525912.js?file=.rtorrent.rc" async="async"></script>
<noscript>
    # This is an example resource file for rTorrent. Copy to
    # ~/.rtorrent.rc and enable/modify the options as needed. Remember to
    # uncomment the options you wish to enable.

    # Maximum and minimum number of peers to connect to per torrent.
    min_peers = 1
    max_peers = 100

    # Same as above but for seeding completed torrents (-1 = same as downloading)
    min_peers_seed = 1
    max_peers_seed = 50

    # Maximum number of simultanious uploads per torrent.
    max_uploads = 10

    # Maximum number of simultaneous downloads
    max_downloads_global = 3
    max_uploads_global = 10

    # Global upload and download rate in KiB. "0" for unlimited.
    download_rate = 0
    upload_rate = 300

    # Default directory to save the downloaded torrents.
    directory = ./leeching

    # Default session directory. Make sure you don't run multiple instance
    # of rtorrent using the same session directory. Perhaps using a
    # relative path?
    session = ./.rtorrent

    # Watch a directory for new torrents, and stop those that have been
    # deleted.
    schedule = watch_directory,5,5,load_start=./rtactive/*.torrent
    schedule = tied_directory,6,5,start_tied=
    schedule = untied_directory,7,5,stop_untied=

    # Close torrents when diskspace is low.
    schedule = low_diskspace,5,60,close_low_diskspace=2000M

    # Periodically save session data
    schedule = session_save,240,300,session_save=

    # Enable the default ratio group.
    ratio.enable=

    # Change the limits, the defaults should be sufficient.
    ratio.min.set=400
    ratio.max.set=2000
    ratio.upload.set=250M

    # When seeding ratio is reached close the torrent
    system.method.set = group.seeding.ratio.command, d.close=

    # Move files around when download completes
    system.method.set_key = event.download.finished,move_complete,"execute=mv,-n,$d.get_base_path=,./unsorted/;d.set_directory=./unsorted/"

    # Port range to use for listening.
    port_range = 33101-33199

    # Start opening ports at a random position within the port range.
    port_random = yes

    # Encryption options, set to none (default) or any combination of the following:
    # allow_incoming, try_outgoing, require, require_RC4, enable_retry, prefer_plaintext
    #
    # The example value allows incoming encrypted connections, starts unencrypted
    # outgoing connections but retries with encryption if they fail, preferring
    # plaintext to RC4 encryption after the encrypted handshake
    #
    encryption = allow_incoming,try_outgoing,enable_retry,prefer_plaintext

    # Enable DHT support for trackerless torrents or when all trackers are down.
    # May be set to "disable" (completely disable DHT), "off" (do not start DHT),
    # "auto" (start and stop DHT as needed), or "on" (start DHT immediately).
    # The default is "off". For DHT to work, a session directory must be defined.
    # 
    #dht = auto

    # UDP port to use for DHT. 
    # 
    #dht_port = 6881

    # Enable peer exchange (for torrents not marked private)
    #
    #peer_exchange = yes
</noscript>

The resources used to put this together are:

* [rtorrent man page](http://libtorrent.rakshasa.no/rtorrent/rtorrent.1.html)
* [rtorrent user guide](http://libtorrent.rakshasa.no/wiki/RTorrentUserGuide)
* [grenage.com's rtorrent config](http://grenage.com/rtorrent.html)
* [Old how to article by K.Mandla](http://kmandla.wordpress.com/2007/05/02/howto-use-rtorrent-like-a-pro/)
* [example rtorrent.rc in source](http://libtorrent.rakshasa.no/browser/trunk/rtorrent/doc/rtorrent.rc?rev=latest)
* [rtorrent common tasks](http://libtorrent.rakshasa.no/wiki/RTorrentCommonTasks)