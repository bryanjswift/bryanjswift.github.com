<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"> <!-- ends in footer.php -->
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Bryan J Swift's Portfolio</title>
		<link rel="stylesheet" href="style.css" type="text/css" media="screen" />
		<link rel="stylesheet" href="portfolio.css" type="text/css" media="screen" />
	</head>
	<?php flush(); ?>
	<body> <!-- ends in footer.php -->
		<div id="header" class="wrap">
			<h1 class="title">Works of Bryan J Swift</h1>
			<ul id="nav">
				<?php $project = $_GET["project"]; ?>
				<li class="parent<?php if (!isset($project) || $project == "motorola-b2c") { echo " active"; } ?>"><a href="index.php?project=motorola-b2c" title="Motorola Business to Consumer Redesign">Motorola</a></li>
				<li class="parent<?php if ($project == "smirnoff-extranet") { echo " active"; } ?>"><a href="index.php?project=smirnoff-extranet" title="Smirnoff Experience Extranet">Smirnoff Extranet</a></li>
				<li class="parent<?php if ($project == "banty-brothers") { echo " active"; } ?>"><a href="index.php?project=banty-brothers" title="Banty Brothers BBQ">Banty Brothers</a></li>
			</ul>
		</div>
		<div id="body" class="wrap"> <!-- ends in footer.php -->
			<!-- content filled in here -->
			<?php
				$includePath = 'includes/';
				switch ($project) {
					case "motorola-b2c":
					case "smirnoff-extranet":
					case "banty-brothers":
						$includePath = $includePath . $project;
						break;
					default:
						$includePath = $includePath . "motorola-b2c";
						break;
				}
				$includePath = $includePath . ".php";
				include($includePath);
			?>
			<!-- end content -->
		</div> <!-- end of div.body -->
		<script type="text/javascript" src="http://static.bryanjswift.com/js/ga.js"></script>
		<script type="text/javascript" src="http://static.bryanjswift.com/js/mootools-1.2-core.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
	</body>
</html>
