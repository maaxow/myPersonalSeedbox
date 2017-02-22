var Torrent = require('./models/Torrent');
var WebTorrent = require('webtorrent');
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
      // console.log("torrent finded :", torrents);
      // res.json(torrents);
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
  // return getTorrentsByUrl(url).then(function(data){
  //   // console.log("data in server", data.length);
  //   return data;
  // });
}


function download(client){
  console.log("Downloading ...");
  Torrent.find(function(err, torrents){
    if(err){
      console.log("erreur", err);
    } else {
      // console.log("client", client);
      // TODO make downloading !
    }
  });
}

module.exports = function (app) {
  // TODO to remove ?
    var client = new WebTorrent();
    // download(client);
    // console.log("socket io", io);

    // GET ALL
    app.get('/api/torrents', function (req, res) {
        getTorrents(res);
    });

    // POST CREATE
    app.post('/api/torrents', function (req, res) {

      isExist(req.body.url).then(function(data){
        if(data.length > 0){

          // TODO client.get(req.body.url) ...
          var torrent = client.get(req.body.torrent.magnetURI);
          console.info("getting client torrent ,", torrent);
          if(torrent){
            console.log("adding torrent info in Torrent.file", torrent.torrentFile);
            // req.body.file = torrent.torrentFile;
            req.body.file = {
              infoHash : torrent.infoHash,
              magnetURI : torrent.magnetURI,
              files : torrent.files,
              torrentFile: torrent.torrentFile,
              path: torrent.path,
              timeRemaining: torrent.timeRemaining,
              received: torrent.received,
              downloaded: torrent.downloaded,
              uploaded: torrent.uploaded,
              downloadSpeed: torrent.downloadSpeed,
              uploadSpeed: torrent.uploadSpeed,
              progress: torrent.progress,
              ration: torrent.ratio,
              numPeers: torrent.numPeers
            };
            // if torrents url exists TODO compare webtorrent file
            // var webtorrentFile = client.add(url,undefined,function(torrent){
            //   console.log("web torrent ", torrent);
            // });
            console.log("juste before update :", req.body, torrent);
            return Torrent.update(req.body, function(err,torrent){
              if(err){
                console.error("error", err);
              } else {
                console.log("updating :", torrent);
              }
            });
          }else {
              console.warn("unknow torrent, create it !");
              client.add(req.body.url, undefined, function(torrent){

                console.log("adding torrent info in Torrent.file", torrent.torrentFile);
                // req.body.file = torrent.torrentFile;
                req.body.file = {
                  infoHash : torrent.infoHash,
                  magnetURI : torrent.magnetURI,
                  files : torrent.files,
                  torrentFile: torrent.torrentFile,
                  path: torrent.path,
                  timeRemaining: torrent.timeRemaining,
                  received: torrent.received,
                  downloaded: torrent.downloaded,
                  uploaded: torrent.uploaded,
                  downloadSpeed: torrent.downloadSpeed,
                  uploadSpeed: torrent.uploadSpeed,
                  progress: torrent.progress,
                  ration: torrent.ratio,
                  numPeers: torrent.numPeers
                };
              // create a torrent, information comes from AJAX request from Angular
              return Torrent.create(req.body, function (err, todo) {
                if (err)
                res.send(err);
                // get and return all the torrents after you create another
                getTorrents(res);
              });

            });
          }
        } else {
            console.log("creating torrent ...");
            client.add(req.body.url, undefined, function(torrent){

              console.log("adding torrent info in Torrent.file", torrent.torrentFile);
              // req.body.file = torrent.torrentFile;
              req.body.file = {
                infoHash : torrent.infoHash,
                magnetURI : torrent.magnetURI,
                files : torrent.files,
                torrentFile: torrent.torrentFile,
                path: torrent.path
              };
            // create a torrent, information comes from AJAX request from Angular
            return Torrent.create(req.body, function (err, todo) {
              if (err)
              res.send(err);
              // get and return all the torrents after you create another
              getTorrents(res);
            });

          });
        }

      });
    });

    // UPDATE
    app.post('/api/torrents/:torrent_id', function(req, res){
    });

    // delete a todo
    app.delete('/api/torrents/:torrent_id', function (req, res) {
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
