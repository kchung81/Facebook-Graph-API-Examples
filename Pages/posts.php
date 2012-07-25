<?php 

require_once('app_info.php');
require_once('classes/FacebookPage.php');

$rn = new FacebookPage(array(
	'pageID' => '181938933887',
	'appID' => $appID,
	'appSecret' => $appSecret
));

echo $rn->getLatestPosts();