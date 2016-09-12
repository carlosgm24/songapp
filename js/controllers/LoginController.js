app.controller('LoginController', ['$scope', '$location', function($scope, $location) {
	$scope.regexEmail = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
	$scope.regexPass = "^(?=.*[0-9])[a-zA-Z0-9!-_#.+=*%$@]{8,24}$";

	$scope.submit = function() {
		var loggedin = true;
		
		$("span.error-email, span.error-pass").addClass("ng-hide");

		if(!$scope.LoginForm.email.$valid){
			$("span.error-email").removeClass("ng-hide");
			loggedin = false;
		} 
		if(!$scope.LoginForm.password.$valid){
			$("span.error-pass").removeClass("ng-hide");
			loggedin = false;
		}
		if(loggedin){
			$location.url('/songs')
		}
    };
}]);