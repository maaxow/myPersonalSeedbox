var WebTorrent = require('webtorrent');
var constants = require('../config/constants');
// var stringify = require('json-stringify-safe');

module.exports = function(io){
  var client = new WebTorrent();

  io.on('connection', function(socket){

    socket.on('createTorrent', function(data){
      console.log('adding new torrent ', data.name, 'using torrentId ', data.url);
      // data.path = constants.downloadUrl;
      client.add(data.url, {path: constants.downloadUrl}, function(torrent){

        socket.emit('createdTorrent', torrent.magnetURI);
        torrent.on('download',function(bytes){
          // console.log("downloading... ", bytes);
          var sended = {
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
          socket.emit('downloading', sended);
        })
      });
      // var tmpTorrent = torrent;
      // for(var prop in tmpTorrent){
      //   if(prop === 'client'){
      //     delete tmpTorrent[prop];
      //   }
      // }
      // console.log("torrent", tmpTorrent);
      // data.path = constants.downloadUrl;
      // data.file = tmpTorrent;
      // client.on('torrent', function(torrent){
      //   data.file = torrent;
      //   // socket.emit('torrentAdded', JSON.parse(stringify(data)));
      // })
    });

  });
};
