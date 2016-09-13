'use strict';

(function() {
  angular.module('MusicApp', ['ngRoute','ngResource'])
  .config(['$routeProvider', function ($routeProvider) { 
    $routeProvider 
      .when('/', { 
        controller: 'LoginController', 
        templateUrl: 'views/login.html' 
      })
      .when('/songs', { 
        controller: 'SongsController', 
        templateUrl: 'views/songs.html' 
      })
      .when('/detail/:songname', { 
        controller: 'DetailController', 
        templateUrl: 'views/detail.html' 
      })
      .otherwise({ 
        redirectTo: '/' 
      }); 
  }]);
}());
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
(function() {
	angular.module('MusicApp')
	.controller('DetailController', ['$scope', 'songs', '$routeParams', function($scope, songs, $routeParams) {
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
}());
(function() {
	angular.module('MusicApp')
	.controller('LoginController', ['$scope', '$location', function($scope, $location) {
		var storageemail = localStorage.getItem('rememberemail'),
			storagecheckbox = localStorage.getItem('remembercheckbox');
		$scope.email = {
	        text: '',
	        regexEmail: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
	    };
		$scope.regexPass = '^(?=.*[0-9])[a-zA-Z0-9!-_#.+=*%$@]{8,24}$';

		if(!storageemail && !storagecheckbox) {
		  	populateStorage();
		} else if(storagecheckbox === 'true'){
			$scope.checkboxModel = true;
			$scope.email.text = storageemail;
		}

		$scope.submit = function() {
			var loggedin = true;
			var email = $('.email').val();
			
			$('span.error-email, span.error-pass').addClass('ng-hide');

			if(!$scope.LoginForm.email.$valid){
				$('span.error-email').removeClass('ng-hide');
				loggedin = false;
			} 
			if(!$scope.LoginForm.password.$valid){
				$('span.error-pass').removeClass('ng-hide');
				loggedin = false;
			}
			if($scope.checkboxModel && loggedin){
		  		localStorage.setItem('rememberemail', email);
		  		localStorage.setItem('remembercheckbox', true);
			} else {
				localStorage.setItem('rememberemail', '');
		  		localStorage.setItem('remembercheckbox', false);
			}
			if(loggedin){
				$location.url('/songs')
			}
	    };

		function populateStorage() {
		  	localStorage.setItem('rememberemail', '');
		  	localStorage.setItem('remembercheckbox', false);
		}
	}]);
}());
(function() {
	angular.module('MusicApp')
	.controller('SongsController', ['$scope', 'songs', function($scope, songs) {
		$scope.allsongs = songs.getAllSongs();
	}]);
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInNvbmdzLmpzIiwiRGV0YWlsQ29udHJvbGxlci5qcyIsIkxvZ2luQ29udHJvbGxlci5qcyIsIlNvbmdzQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gIGFuZ3VsYXIubW9kdWxlKCdNdXNpY0FwcCcsIFsnbmdSb3V0ZScsJ25nUmVzb3VyY2UnXSlcclxuICAuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHsgXHJcbiAgICAkcm91dGVQcm92aWRlciBcclxuICAgICAgLndoZW4oJy8nLCB7IFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkNvbnRyb2xsZXInLCBcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2xvZ2luLmh0bWwnIFxyXG4gICAgICB9KVxyXG4gICAgICAud2hlbignL3NvbmdzJywgeyBcclxuICAgICAgICBjb250cm9sbGVyOiAnU29uZ3NDb250cm9sbGVyJywgXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9zb25ncy5odG1sJyBcclxuICAgICAgfSlcclxuICAgICAgLndoZW4oJy9kZXRhaWwvOnNvbmduYW1lJywgeyBcclxuICAgICAgICBjb250cm9sbGVyOiAnRGV0YWlsQ29udHJvbGxlcicsIFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGV0YWlsLmh0bWwnIFxyXG4gICAgICB9KVxyXG4gICAgICAub3RoZXJ3aXNlKHsgXHJcbiAgICAgICAgcmVkaXJlY3RUbzogJy8nIFxyXG4gICAgICB9KTsgXHJcbiAgfV0pO1xyXG59KCkpOyIsIihmdW5jdGlvbigpIHtcclxuXHRhbmd1bGFyLm1vZHVsZSgnTXVzaWNBcHAnKVxyXG5cdC5zZXJ2aWNlKCdzb25ncycsIFsnJHJlc291cmNlJywgZnVuY3Rpb24oJHJlc291cmNlKSB7XHJcblx0ICAgIHZhciB1cmxCYXNlID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8nO1xyXG5cclxuXHQgICAgdGhpcy5nZXRBbGxTb25ncyA9IGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICAgIHJldHVybiAkcmVzb3VyY2UodXJsQmFzZSArICdzb25ncycpLnF1ZXJ5KCk7XHJcblx0ICAgIH07XHJcblxyXG5cdCAgICB0aGlzLmdldE9uZVNvbmcgPSBmdW5jdGlvbiAoc29uZ25hbWUpIHtcclxuXHQgICAgICAgIHJldHVybiAkcmVzb3VyY2UodXJsQmFzZSArICdzb25ncz9zb25nbmFtZT0nK3NvbmduYW1lKS5xdWVyeSgpO1xyXG5cdCAgICB9O1xyXG5cclxuXHR9XSk7XHJcbn0oKSk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cdGFuZ3VsYXIubW9kdWxlKCdNdXNpY0FwcCcpXHJcblx0LmNvbnRyb2xsZXIoJ0RldGFpbENvbnRyb2xsZXInLCBbJyRzY29wZScsICdzb25ncycsICckcm91dGVQYXJhbXMnLCBmdW5jdGlvbigkc2NvcGUsIHNvbmdzLCAkcm91dGVQYXJhbXMpIHtcclxuXHRcdHZhciBzb25nbmFtZSA9ICRyb3V0ZVBhcmFtcy5zb25nbmFtZTtcclxuXHJcblx0XHQkc2NvcGUuc29uZ2RldGFpbHMgPSBzb25ncy5nZXRPbmVTb25nKHNvbmduYW1lKTtcclxuXHRcdCRzY29wZS5wbGF5ZXIgPSAnZ2x5cGhpY29uLXBsYXknO1xyXG5cdFx0JHNjb3BlLmNoYW5nZVBsYXllciA9IGZ1bmN0aW9uKCl7XHJcblx0XHQgICAgaWYgKCRzY29wZS5wbGF5ZXIgPT09ICdnbHlwaGljb24tcGxheScpe1xyXG5cdFx0ICAgICAgXHQkc2NvcGUucGxheWVyID0gJ2dseXBoaWNvbi1wYXVzZSc7XHJcblx0XHQgICAgfVxyXG5cdFx0ICAgIGVsc2V7XHJcblx0XHQgICAgICBcdCRzY29wZS5wbGF5ZXIgPSAnZ2x5cGhpY29uLXBsYXknO1xyXG5cdFx0ICAgIH1cclxuXHRcdH07XHJcblx0fV0pO1xyXG59KCkpOyIsIihmdW5jdGlvbigpIHtcclxuXHRhbmd1bGFyLm1vZHVsZSgnTXVzaWNBcHAnKVxyXG5cdC5jb250cm9sbGVyKCdMb2dpbkNvbnRyb2xsZXInLCBbJyRzY29wZScsICckbG9jYXRpb24nLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbikge1xyXG5cdFx0dmFyIHN0b3JhZ2VlbWFpbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZW1lbWJlcmVtYWlsJyksXHJcblx0XHRcdHN0b3JhZ2VjaGVja2JveCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZW1lbWJlcmNoZWNrYm94Jyk7XHJcblx0XHQkc2NvcGUuZW1haWwgPSB7XHJcblx0ICAgICAgICB0ZXh0OiAnJyxcclxuXHQgICAgICAgIHJlZ2V4RW1haWw6IC9bYS16MC05Ll8lKy1dK0BbYS16MC05Li1dK1xcLlthLXpdezIsM30kL1xyXG5cdCAgICB9O1xyXG5cdFx0JHNjb3BlLnJlZ2V4UGFzcyA9ICdeKD89LipbMC05XSlbYS16QS1aMC05IS1fIy4rPSolJEBdezgsMjR9JCc7XHJcblxyXG5cdFx0aWYoIXN0b3JhZ2VlbWFpbCAmJiAhc3RvcmFnZWNoZWNrYm94KSB7XHJcblx0XHQgIFx0cG9wdWxhdGVTdG9yYWdlKCk7XHJcblx0XHR9IGVsc2UgaWYoc3RvcmFnZWNoZWNrYm94ID09PSAndHJ1ZScpe1xyXG5cdFx0XHQkc2NvcGUuY2hlY2tib3hNb2RlbCA9IHRydWU7XHJcblx0XHRcdCRzY29wZS5lbWFpbC50ZXh0ID0gc3RvcmFnZWVtYWlsO1xyXG5cdFx0fVxyXG5cclxuXHRcdCRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGxvZ2dlZGluID0gdHJ1ZTtcclxuXHRcdFx0dmFyIGVtYWlsID0gJCgnLmVtYWlsJykudmFsKCk7XHJcblx0XHRcdFxyXG5cdFx0XHQkKCdzcGFuLmVycm9yLWVtYWlsLCBzcGFuLmVycm9yLXBhc3MnKS5hZGRDbGFzcygnbmctaGlkZScpO1xyXG5cclxuXHRcdFx0aWYoISRzY29wZS5Mb2dpbkZvcm0uZW1haWwuJHZhbGlkKXtcclxuXHRcdFx0XHQkKCdzcGFuLmVycm9yLWVtYWlsJykucmVtb3ZlQ2xhc3MoJ25nLWhpZGUnKTtcclxuXHRcdFx0XHRsb2dnZWRpbiA9IGZhbHNlO1xyXG5cdFx0XHR9IFxyXG5cdFx0XHRpZighJHNjb3BlLkxvZ2luRm9ybS5wYXNzd29yZC4kdmFsaWQpe1xyXG5cdFx0XHRcdCQoJ3NwYW4uZXJyb3ItcGFzcycpLnJlbW92ZUNsYXNzKCduZy1oaWRlJyk7XHJcblx0XHRcdFx0bG9nZ2VkaW4gPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZigkc2NvcGUuY2hlY2tib3hNb2RlbCAmJiBsb2dnZWRpbil7XHJcblx0XHQgIFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVtZW1iZXJlbWFpbCcsIGVtYWlsKTtcclxuXHRcdCAgXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZW1lbWJlcmNoZWNrYm94JywgdHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlbWVtYmVyZW1haWwnLCAnJyk7XHJcblx0XHQgIFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVtZW1iZXJjaGVja2JveCcsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZihsb2dnZWRpbil7XHJcblx0XHRcdFx0JGxvY2F0aW9uLnVybCgnL3NvbmdzJylcclxuXHRcdFx0fVxyXG5cdCAgICB9O1xyXG5cclxuXHRcdGZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZSgpIHtcclxuXHRcdCAgXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVtZW1iZXJlbWFpbCcsICcnKTtcclxuXHRcdCAgXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVtZW1iZXJjaGVja2JveCcsIGZhbHNlKTtcclxuXHRcdH1cclxuXHR9XSk7XHJcbn0oKSk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cdGFuZ3VsYXIubW9kdWxlKCdNdXNpY0FwcCcpXHJcblx0LmNvbnRyb2xsZXIoJ1NvbmdzQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3NvbmdzJywgZnVuY3Rpb24oJHNjb3BlLCBzb25ncykge1xyXG5cdFx0JHNjb3BlLmFsbHNvbmdzID0gc29uZ3MuZ2V0QWxsU29uZ3MoKTtcclxuXHR9XSk7XHJcbn0oKSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
