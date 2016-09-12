var app = angular.module('MusicApp', ['ngRoute','ngResource']);
app.config(function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      //controller: 'LoginController', 
      templateUrl: 'views/login.html' 
    })
    .when('/songs', { 
      //controller: 'SongsController', 
      templateUrl: 'views/songs.html' 
    })
    .when('/detail/:songname', { 
      //controller: 'DetailController', 
      templateUrl: 'views/detail.html' 
    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
});