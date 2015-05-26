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

firebaseApp.controller('ExampleController', function($scope, $firebaseAuth, $cordovaOauth, $ionicPopup){
  var auth = $firebaseAuth(fb);

  var showAlert = function(titleStr, response){
    $ionicPopup.alert({
      title: titleStr,
      content: response
    }).then(function(res) {
      console.log('Test Alert Box');
    });
  }

  $scope.loginFb = function(){
    $cordovaOauth.facebook('442668512567921', ['email']).then(function(result){
      auth.$authWithOAuthToken('facebook', result.access_token).then(function(authData){
        showAlert('Successfully login', JSON.stringify(authData));
      }, function(error){
        showAlert('ERROR at the firebaseAuth level', error);
      });
    }, function(error){
      showAlert('ERROR at the facebook level',  error);
    });
  }
  $scope.loginGp = function(){
    $cordovaOauth.google('534265459229-jpvjvcbk8vmevna8i8iccrvgmb7tcp4o.apps.googleusercontent.com', ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result){
      auth.$authWithOAuthToken('facebook', result.access_token).then(function(authData){
        showAlert('Successfully login', JSON.stringify(authData));
      }, function(error){
        showAlert('ERROR at the firebaseAuth level', error);
      });
    }, function(error){
      showAlert('ERROR at the google plus level', error);
    });
  }
});
