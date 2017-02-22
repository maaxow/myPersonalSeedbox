define(function(require){
	require('angular');
	var toto = require('services/torrents');
	var socket = io.connect(location.host);
	return angular.module('app.controller.download', ['app.service.torrents'])

	// inject the Todo service factory into our controller
	.controller('downloadController', ['$scope','$http','$torrents', function($scope, $http, $torrents) {
		$scope.url = "https://archive.org/download/charlie_chaplin_film_fest/charlie_chaplin_film_fest_archive.torrent";
		$scope.formData = {
			name: 'char',
			url: 'https://archive.org/download/charlie_chaplin_film_fest/charlie_chaplin_film_fest_archive.torrent'
		};

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		var updateListTorrent = function(){
			$torrents.get()
			.then(function(data) {
				console.log("getting torrents :", data.data);
				$scope.torrents = data.data;
			});
		};
		updateListTorrent();
		$scope.$on('updateListTorrents', function(event, arguments){
			updateListTorrent();
		});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTorrents = function() {

			console.log('createTorrent', $scope.formData);
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined && $scope.formData.url !== undefined) {
				console.log('send data to service $torrent', $scope.formData);
				// call the create function from our service (returns a promise object)
				$torrents.create($scope.formData).then(function(){
					console.log("on a creer le torrent, on update la liste");
					updateListTorrent();
				});

				// if successful creation, call our get function to get all the new todos
				// .then(function(data) {
				// 	$scope.formData = {}; // clear the form so our user is ready to enter another
				// 	$scope.torrents = data.data; // assign our new list of todos
				// });
			}
		};

		socket.on('downloading', function(data){
			console.log("recup downloding..", data);
		});

	}]);

});
