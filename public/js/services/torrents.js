define(function(require){
	// var WebTorrent = require('web-torrent');
	require("angular");
	// console.log("location hhost", location);
	var socket = io.connect(location.host + ':8081');
	var torrentService = angular.module('app.service.torrents', [])

	.factory('$torrents', ['$http','$q',function($http, $q) {
		return {
			get : function() {
				return $http.get('/api/torrents');
			},
			create : function(torrentsData) { // { name : '', url: '' }
				var defer = $q.defer();
				if(torrentsData){
					console.log("Service: asking add to Socket");
					socket.emit('createTorrent', torrentsData);
					socket.on('createdTorrent', function(data){
						console.log("Service: torrent created ", data);
						torrentsData.torrent = data;
						console.log("Service: send ask add to Route");
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
				socket.on('removedTorrent', function(){
					console.log("torrent removed");
				})
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
