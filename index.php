<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Bryan J Swift's Portfolio</title>
		<link rel="stylesheet" href="css/portfolio.css" type="text/css" media="screen" />
	</head>
	<?php flush(); ?>
	<body>
		<h1>Selected works of Bryan J Swift</h1>
		<p>The examples of client work I am showing were completed during my time at <a href="http://akqa.com">AKQA</a>. On these projects I served as the lead front end developer but the designs were produced by the talented members of the creative department.</p>
		<h2>Client Work</h2>
		<ol>
			<li>
				<h3><a href="http://motorola.com" title="Motorola Global Site">Motorola</a></h3>
				<p>AKQA was commissioned to help Motorola rebrand, rearchitect, redesign and rebuild their global website and with the recently launched redesign my front end work is featured prominently on many of the templates/pages.</p>
				<p>I created most of the JavaScript classes and components which control the interactions between the user and the site. These elements were created in JavaScript utilizing an object oriented approach in order to facilitate code re-use on subsequent endeavors with Motorola. This project was interesting and exciting in a lot of ways because it pushed me to create lots of flexible UI components many of which replaced standard browser controls without compromising keyboard accessibility.</p>
				<p>Some of the pages I am most pleased with are the <a href="http://www.motorola.com/consumers/v/index.jsp?vgnextoid=8b871df4f3d89110VgnVCM1000008406b00aRCRD&appInstanceName=default" title="Motorola Phones Browse Page">phones</a>, <a href="http://www.motorola.com/consumers/v/index.jsp?vgnextoid=d44832a609e89110VgnVCM1000008406b00aRCRD&appInstanceName=default" title="Motorola Accessories Browse Page">accessories</a> and the <a href="http://www.motorola.com/Consumers/US-EN/Consumer-Product-and-Services/ch.Mobile-Phones.compare?pMotProductsToCompare=52179_57471_40906&productId=52179&productId=57471&productId=40906" title="Motorola Aura, Motorola Evoke, Motorola Rokr comparison page">product comparison page</a>. As with anything finished work there are some things I would like to change or tweak but all things considered I believe these turned out well.</p>
			</li>
			<li>
				<h3><a href="http://smirnoff.com" title="Smirnoff Global Site">Smirnoff Gateway</a></h3>
				<p>Diageo was having trouble with an abnormally high dropoff rate at the age validation step prior to gaining access to the site and felt the dropoff was related to the Gateway being in Flash. So they asked AKQA to redesign and rebuild it for them.</p>
				<p>Once the creative department had finished creating an updated look in psd format it was handed off to me for top to bottom implementation. One of the more interesting challenges of this was backporting a number of MooTools plugins (which I had previously written) for use with a legacy version which broke plugin compatibility in a bunch of ways. The most enjoyable part of this project was finally getting to add better keyboard support for the MooTools dropdown replacement script I wrote.</p>
			</li>
			<li>
				<h3><a href="http://bryanjswift.com/projects/bm-extranet/index.html" title="Mockup of Benjamin Moore Extranet Site">Benjamin Moore Extranet</a></h3>
				<p>The extranet project was another piece of work AKQA was commissioned to do, this time for Benjamin Moore. I'm sure by now this site is live, however as it is private all I can link to is the mock-up we delivered to them so they could integrate it with their back-end architecture. I was not as heavily involved in the coding of this project as I was in the Motorola or Smirnoff projects. I was, however, responsible for overseeing the front-end development as well as the bulk of the JavaScript work.</p>
				<p>I enjoyed this project because it required me to really dive into jQuery whereas much of my other work utilizes the MooTools framework. I'm the type of person who wants to grok a framework or tool and it's best practices before using it heavily and this design and interaction required heavy scripting and the client required jQuery.</p>
			</li>
		</ol>
		<h2>Open Source Work</h2>
		<ol>
			<li>
				<h3><a href="http://github.com/bryanjswift/mootools-plugins/tree/master" title="Source of MooTools Plugins on GitHub">MooTools Plugins</a></h3>
				<p>This is a project I've been working on off and on since mid-June 2008. It started a as a collection of relatively poorly implemented scripts and has evolved into a number of plugins I use on a fairly regular basis for client work. All of the code is released under the MIT license (same as the MooTools source). Currently the documentation and demos are lackluster (or wholly absent) but I've been much more focused on the implementation than on trying to wrap them up for 'release' but with the changes to the way MooTools More is being handled I'm a little more focused on updating the docs and demos.</p>
				<p>One of my favorite plugins in this collection is Form.Dropdown which is a stylized replacement for a select dropdown. I like this plugin because as it has evolved I've been able to include a considerable amount of keyboard accessibility features making it, in my biased opinion, as or more (in the case of Internet Explorer) usable than the default browser selects.</p>
			</li>
			<li>
				<h3><a href="http://github.com/bryanjswift/vimblog/tree/master" title="Source of Vimblog on GitHub">Vimblog Fork</a></h3>
				<p>The inclusion of this project is admittedly odd because it is no where near what I would call complete. However it is one of the few projects of mine which has gotten <a href="http://blog.tquadrado.com/?page_id=146">kudos from another developer</a>. I used this vim plugin as my "I should learn Ruby" project. Prior to working on this I was relatively unfamiliar with Ruby's syntax because I had done nearly no development in the langage.</p>
				<p>I originally started work on this after discovering TextMate's blogging plugin which I found to be useful for interacting with Wordpress but I was (and continue to) using MacVim as my primary editor so I wanted to be able to replicate the functionality of the TextMate blogging plugin in Vim. I really enjoyed digging into the Ruby language a bit with this project and it served to whet my appetite for more functional languages.</p>
			</li>
		</ol>
		<script type="text/javascript" src="js/main.js"></script>
	</body>
</html>
