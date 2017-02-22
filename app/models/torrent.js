var mongoose = require('mongoose');
var constants = require('../../config/constants');

module.exports = mongoose.model('Torrent', {
	name: {
		type: String,
		default: ''
	},
	url: {
		type: String,
		default: ''
	},
	path: {
		type: String,
		default: constants.downloadUrl
	},
	torrent: {
		infoHash: {
			type: String,
			default: ''
		},
		magnetURI : {
			type: String,
			default: ''
		},
		files : {
			type: Array,
			default: []
		},
		torrentFile : {
			type: Buffer,
			default: null
		},
		path : {
			type: String,
			default: ''
		},
		timeRemaining : {
			type: Number,
			default: 0
		},
		received : {
			type: Object,
			default: null
		},
		downloaded : {
			type: Object,
			default: null
		},
		uploaded : {
			type: Object,
			default: null
		},
		downloadSpeed : {
			type: Number,
			default: 0
		},
		uploadSpeed : {
			type: Number,
			default: 0
		},
		progress : {
			type: Number,
			default: 0
		},
		ration : {
			type: Number,
			default: 0
		},
		numPeers : {
			type: Number,
			default: 0
		}
	}
});
