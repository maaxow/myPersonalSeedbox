var Torrent = require('./models/torrent');
var path = require('path');

function getTorrents(res){
  Torrent.find(function(err, torrents){
    if(err){
      res.send(err);
    }
    res.json(torrents);
  });
}

function getTorrentsByUrl(url){
  return Torrent.find({url : url}, function(err, torrents){
    if(err){
      console.error("Error finding ", err);
    } else {
      return torrents;
    }
  });
}

var isExist = function(url){
  var defer = new Promise(function(resolve, reject){
    resolve(getTorrentsByUrl(url));
  });
  return defer.then(function(data){
    return data;
  })
}

module.exports = function (app, client) {

    // GET ALL
    app.get('/api/torrents', function (req, res) {
      // console.log("client torrent list", client.torrents);
      getTorrents(res);
    });

    // POST CREATE
    app.post('/api/torrents', function (req, res) {
      isExist(req.body.url).then(function(data){
        console.log("Route: add ", req.body.name, data);
        // IF the torrent exist
        if(data.length > 0){
            return Torrent.update(req.body, function(err,torrent){
              if(err){
                console.error("error", err);
              } else {
                console.log("updating :", torrent);
              }
            });
        } else {
            // create a torrent, information comes from AJAX request from Angular
            return Torrent.create(req.body, function (err, todo) {
              if (err)
              res.send(err);
              // get and return all the torrents after you create another
              getTorrents(res);
            });
        }
      });
    });

    // UPDATE
    app.post('/api/torrents/:torrent_id', function(req, res){
    });

    // delete a todo
    app.delete('/api/torrents/:torrent_id', function (req, res) {
      // socket.emit('removeTorrent', req.params.torrent_id);
        Torrent.remove({
            _id: req.params.torrent_id
        }, function (err, todo) {
            if (err)
                res.send(err);
                getTorrents(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('/*', function (req, res) {
      res.sendFile(path.resolve(__dirname + '/../public/index.html')); // load the single view file (angular will handle the page changes on the front-end)
    });
};
