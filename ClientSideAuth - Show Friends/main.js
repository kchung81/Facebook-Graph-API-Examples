// Load the SDK Asynchronously
(function(d){
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
}(document));



// Init the SDK upon load
window.fbAsyncInit = function() {
	FB.init({
 		appId      : '359628897419417', // App ID
      	channelUrl : '//'+window.location.hostname+'/channel', // Path to your Channel File
      	status     : true, // check login status
      	cookie     : true, // enable cookies to allow the server to access the session
      	xfbml      : true  // parse XFBML
    });

    // listen for and handle auth.statusChange events
	FB.Event.subscribe('auth.statusChange', function(response) {
  		if (response.authResponse) {
        	// user has auth'd your app and is logged into Facebook
        	FB.api('/me', function(me){
          		if (me.name) {
            		document.getElementById('auth-displayname').innerHTML = me.name;
          		}
        	})
        	document.getElementById('auth-loggedout').style.display = 'none';
        	document.getElementById('auth-loggedin').style.display = 'block';
      	} 
		else {
        	// user has not auth'd your app, or is not logged into Facebook
        	document.getElementById('auth-loggedout').style.display = 'block';
        	document.getElementById('auth-loggedin').style.display = 'none';
			removeFriends();
      	}
 	});

    // respond to clicks on the login and logout links
	document.getElementById('auth-loginlink').addEventListener('click', function(){
  		FB.login();
    });

    document.getElementById('auth-logoutlink').addEventListener('click', function(){
      	FB.logout();
    }); 
  
	function createScriptBlock(url) {
		var script = document.createElement('script');
		script.src = url;
		document.getElementsByTagName('body')[0].appendChild(script);
	}
	
	function showFriends(response) {
		//console.log(response);
		var uid = response.authResponse.userID;
	    var accessToken = response.authResponse.accessToken;
		var friendsURL = 'https://graph.facebook.com/me/friends?access_token=' + accessToken+'&callback=yaBuddy';
		createScriptBlock(friendsURL);
	}

/*
	// uncomment this if you want to show friends on page load
	FB.Event.subscribe('auth.statusChange', showFriends);
*/
	
	document.getElementById('showFriends').onclick = function() {
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
		    	// the user is logged in and has authenticated your app, and response.authResponse supplies
		    	// the user's ID, a valid access token, a signed request, and the time the access token 
		    	// and signed request each expire
		    	var uid = response.authResponse.userID;
		    	var accessToken = response.authResponse.accessToken;
				showFriends(response);
		  	} 
			else if (response.status === 'not_authorized') {
		    // the user is logged in to Facebook, but has not authenticated your app
		  	} 
			else {
		    // the user isn't logged in to Facebook.
		  	}
		 });
	};

} //window.fbAsyncInit

function yaBuddy(json) {
	var arr = json.data;
	var friendsDiv = document.getElementById('friends');
	var html = '';
	var i = 0;
	var len = arr.length;
	
	for(; i< len; i++) {
		html += arr[i].name + '<br />';
	}
	friendsDiv.innerHTML = html;
}

function removeFriends() {
	document.getElementById('friends').innerHTML = '';
}