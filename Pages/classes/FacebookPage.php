<?php

require_once('FacebookGraph.php');


class FacebookPage extends FacebookGraph {

	protected $pageID;

	public function __construct($data) {
		parent::__construct($data['appID'], $data['appSecret']);
		$this->pageID = $data['pageID'];
	}

	/**
	 * [getLatestPosts returns the latest posts by page author]
	 * @param  integer $limit the number of post objects to return, default is 5
	 * @return json         json containing the latest page author posts
	 */
	public function getLatestPosts($limit = 5) {
		if ($this->pageID) {
			$fql = "SELECT message, attachment, likes, comments, type FROM stream 
					WHERE type IN (46, 80, 128, 247) 
					AND source_id = '{{pageID}}' 
					AND actor_id = '{{pageID}}' 
					AND message != '' 
					LIMIT $limit";

			$fql = str_replace('{{pageID}}', $this->pageID, $fql);
			$url = $this->build_fql_url($fql);
			$jsonStr = $this->curl_get($url);
			return $jsonStr;
		}
	}






}