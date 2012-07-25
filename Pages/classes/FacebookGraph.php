<?php 

require_once('sdk/facebook.php');

class FacebookGraph {

	protected $appID = '124232791048688';
	protected $appSecret = 'd99321004bf0de3bb18adad438b3cb5d';
	protected $fb;


	public function __construct() {
		$this->fb = new Facebook(array(
			'appId'  => $this->appID,
			'secret' => $this->appSecret,
			'fileUpload' => FALSE
		));
	}


	protected function curl_get($url) {
		$session = curl_init($url);
		curl_setopt($session, CURLOPT_HEADER, FALSE);
		curl_setopt($session, CURLOPT_RETURNTRANSFER, TRUE);
		$contents = curl_exec($session);
		curl_close($session);
		return $contents;
	}


	protected function build_fql_url($fql) {
		return "https://graph.facebook.com/fql?q=".urlencode($fql)."&access_token=".$this->fb->getAccessToken();
	}

}