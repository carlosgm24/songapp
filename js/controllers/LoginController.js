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