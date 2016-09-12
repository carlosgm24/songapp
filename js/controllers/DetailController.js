app.controller('DetailController', ['$scope', 'songs', '$routeParams', function($scope, songs, $routeParams) {
	var songname = $routeParams.songname;

	$scope.songdetails = songs.getOneSong(songname);
	$scope.player = 'glyphicon-play';
	$scope.changePlayer = function(){
	    if ($scope.player === 'glyphicon-play'){
	      	$scope.player = 'glyphicon-pause';
	    }
	    else{
	      	$scope.player = 'glyphicon-play';
	    }
	};
}]);