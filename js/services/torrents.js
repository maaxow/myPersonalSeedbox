define(function(require){
	// var WebTorrent = require('web-torrent');
	require("angular");
	var socket = io.connect(location.host);
	var torrentService = angular.module('app.service.torrents', [])

	.factory('$torrents', ['$http','$q',function($http, $q) {
		return {
			get : function() {
				return $http.get('/api/torrents');
			},
			create : function(torrentsData) { // { name : '', url: '' }
				var defer = $q.defer();
				if(torrentsData){
					console.log("client service $torrent: send torrentdata to server ", torrentsData);
					socket.emit('createTorrent', torrentsData);
					socket.on('createdTorrent', function(data){
						console.log("client:torrent.js on createdTorrent", data, torrentsData);
						torrentsData.torrent = {
							magnetURI: data
						};
						defer.resolve($http.post('/api/torrents', torrentsData));
					});
				} else {
					defer.resolve($http.get('/api/torrents'));
				}
				return defer.promise;
			},
			update : function(id){
				if(id){
					return $http.post('/api/torrents/' + id);
				}
			},
			delete : function(id) {
				if(id){
					return $http.delete('/api/torrents/' + id);
				} else {
					return $http.get('/api/torrents');
				}
			}
		}
	}]);
	return torrentService;
});
