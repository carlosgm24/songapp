(function() {
	angular.module('MusicApp')
	.service('songs', ['$resource', function($resource) {
	    var urlBase = 'http://localhost:3000/';

	    this.getAllSongs = function () {
	        return $resource(urlBase + 'songs').query();
	    };

	    this.getOneSong = function (songname) {
	        return $resource(urlBase + 'songs?songname='+songname).query();
	    };

	}]);
}());