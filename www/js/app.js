// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var firebaseApp = angular.module('starter', ['ionic', 'firebase', 'ngCordovaOauth']);
var fb = new Firebase('https://myfb.firebaseio.com')

firebaseApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

firebaseApp.controller('ExampleController', function($scope, $firebaseAuth, $cordovaOauth){
  var auth = $firebaseAuth(fb);

  $scope.login = function(){
    $cordovaOauth.facebook('442668512567921', ['email']).then(function(result){
      auth.$authWithOAuthToken('facebook', result.access_token).then(function(authData){
        console.log(JSON.stringify(authData));
      }, function(error){
        console.error('ERROR: ' + error);
      });
    }, function(error){
      console.error('ERROR: ' + error);
    });
  }
});
