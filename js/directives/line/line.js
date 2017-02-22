define(function(require){
  require('controllers/downloadController');
  require('services/torrents');

  angular.module('app.directives.line', ['app.service.torrents'])

  .directive('line', function($torrents){
    return {
      templateUrl: 'js/directives/line/line.html',
      scope: {
        torrent: '='
      },
      controller: function($scope){
        // console.log("line directive ", $scope.torrent);

        $scope.removeTorrents = function(id) {

          $torrents.delete(id)
          // if successful creation, call our get function to get all the new todos
          .then(function(data) {
            // $scope.torrents = data.data; // assign our new list of todos
            $scope.$emit('updateListTorrents');
          });
        };
      }
    }
  });
});
