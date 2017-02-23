var vendor = "../vendor/";
require.config({
  baseUrl: 'js/',
	paths: {
    controllers: 'controllers',
    services: 'services',
    directives: 'directives',
    vendor: vendor,

    // Bower_components
		angular: vendor + 'angular/angular.min',
    'angular-deferred-bootstrap': vendor + 'angular-deferred-bootstrap/angular-deferred-bootstrap.min',
    'angular-animate': vendor + 'angular-animate/angular-animate.min',
    'angular-aria': vendor + 'angular-aria/angular-aria.min',
    'angular-material': vendor + 'angular-material/angular-material.min',
    'angular-messages': vendor + 'angular-messages/angular-messages.min',
		'angular-ui-router': vendor + 'angular-ui-router/release/angular-ui-router.min',
    'angular-socket-io': vendor + 'angular-socket-io/socket',
    // 'socket.io': vendor + 'socket.io-client/dist/socket.io',
    'bootstrap-js': vendor + 'bootstrap/dist/js/bootstrap.min',
    'jquery': vendor + 'jquery/dist/jquery.min',
    'web-torrent': vendor + 'webtorrent/webtorrent.min',


	},
	shim : {
    angular : {
      exports: 'angular'
    },
    jquery : {
      exports: '$'
    },
    // 'socket.io': {
    //   exports: 'io'
    // },
    'angular-deferred-bootstrap' : {
      deps: ['angular']
    },
    'angular-animate': {
			deps: ['angular']
		},
    'angular-aria': {
			deps: ['angular']
		},
    'angular-material': {
			deps: ['angular', 'angular-animate', 'angular-aria'],
		},
    'angular-messages': {
			deps: ['angular']
		},
		'angular-ui-router': {
			deps: ['angular']
		},
    'angular-socket-io': {
      deps: ['angular', 'socket.io']
    },
    'bootstrap-js': {
			deps: ['angular']
		}
	}
});

requirejs(['main.core'], function(app) {
  app.init();
});


require.loadCss = function (url) {
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = url;
	document.getElementsByTagName("head")[0].appendChild(link);
};
