app.controller('SongsController', ['$scope', 'songs', function($scope, songs) {
	$scope.allsongs = songs.getAllSongs();
}]);