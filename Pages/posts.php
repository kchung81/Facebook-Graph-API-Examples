<?php 

require_once('classes/FacebookPage.php');


$rg = new FacebookPage('128508180498533');
echo $rg->getLatestPosts();