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