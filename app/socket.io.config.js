var constants = require('../config/constants');
// var stringify = require('json-stringify-safe');

module.exports = function(io, client){
  // var client = new WebTorrent();
  io.on('connection', function(socket){

    socket.on('createTorrent', function(data){
      console.log('Socket: receive asking add', data.name);
      // data.path = constants.downloadUrl;
      client.add(data.url, {path: constants.downloadUrl}, function(torrent){

        var fileList = [];
        for(var i in torrent.files){
          fileList.push(torrent.files[i].name)
        }
          var sended = {
            infoHash : torrent.infoHash,
            magnetURI : torrent.magnetURI,
            files : fileList,
            // torrentFile: torrent.torrentFile,
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
          console.log('Socket: send createdTorrent');
          socket.emit('createdTorrent', sended);
        //   torrent.on('download',function(bytes){
        //     socket.emit('downloading', sended);
        // });
      });

      socket.on('downloading', function(data){
        console.log("downloading data :", data);
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

    socket.on('removeTorrent', function(torrentId){
      client.remove(torrentId, function(err){
        if(err){
          console.log('error removing torrent');
        } else {
          socket.emit('removedTorrent');
        }
      });
    });
    socket.on('getTorrent', function(){
      socket.emit('gettedTorrent', client.torrents);
    })
  });
};
