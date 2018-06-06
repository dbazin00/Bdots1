﻿var myApp = angular.module('myApp', []);

myApp.controller('registrationCtrl', function ($scope, $http,$window) {



	$scope.certuser = {};
	var status = {};

	$scope.savedata = function (certuser) {
		
		
		$http.post("/Registration/SaveUser", { newCertUser: certuser })
			.then(function succesCallback(response) {
				debugger;
				status = response.data;
				if (status === 0) {
					alert("Registration successfull");
					$window.location.href = '/NavigationBar/Index';
				}
				else if (status == 1) {
					alert("Username is already in use");
				}
				else if (status == 2) {
					alert("Email is already in use");
				}
				else if (status == 3) {
					alert("Sending mail error");
				}
				
				

			}, function errorCallback(response) {
                alert("POST method error");
			});

	}
	
});

myApp.controller('uploadController', function ($scope, $http,$window) {

	debugger;
	$scope.video = {};

	
	var videoTitle ="";

	
	
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	
	window.onYouTubeIframeAPIReady = function () {
		$scope.player = new YT.Player('player', {
			height: '400',
			width: '400',
			videoId: youtube_parser(videoTitle),
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			},
			playerVars: {
				'controls': 0,
				'showinfo': 0
			}


		});
		

		function onPlayerReady(event) {

			$scope.player.playVideo();

			
		}

		function youtube_parser(url) {
			var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/i;
			var match = url.match(regExp);
			return (match && match[7].length == 11) ? match[7] : false;
		}

		var firstLoad = true;

		//	// The API calls this function when the player's state changes.
		function onPlayerStateChange(event) {
			if (firstLoad == true && event.data === -1) {
				console.log(firstLoad);
				firstLoad = false;
			}
		}
	}

	$scope.check = function (filepath) {

		$scope.player.loadVideoById(youtube_parser(filepath));

		$scope.player.stopVideo();

		function youtube_parser(url) {
			var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/i;
			var match = url.match(regExp);
			return (match && match[7].length == 11) ? match[7] : false;
		}
	};

	$scope.savevideo = function (video) {

		$http.post("/Upload/SaveVideo", { newVideo: video })
			.then(function succesCallback(response) {
				debugger;
				$scope.video = response.data;
				alert("Upload successfull");
				$window.location.href = '/NavigationBar/MyVideos';

			}, function errorCallback(response) {
				alert("Invalid input!");
			});


	}
});

