// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'firebase', 'starter.controllers']);

var fb = null;

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    fb = new Firebase("https://incandescent-fire-1385.firebaseio.com/");

  });
})

app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state("login", {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginControl"
    })
    .state("home", {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: "HomeControl"
    });

    // .state("playlist", {
    //   url: "/playlist/:id",
    //   templateUrl: "templates/playlist.html",
    //   controller: "PlaylistControl"
    // });

    $urlRouterProvider.otherwise("/login");
})

//
// app.controller("LoginControl", function($scope, $firebaseAuth, $location){
//   $scope.login = function(username, password){
//     var fbAuth = $firebaseAuth(fb);
//     fbAuth.$authWithPassword({
//       email: username,
//       password: password
//     }).then(function(authData){
//       $location.path("/home");
//     }).catch(function(error){
//       alert(error);
//     });
//   };
//
//
//   $scope.register = function(username, password){
//     var fbAuth = $firebaseAuth(fb);
//
//     fbAuth.$createUser({email: username, password: password}).then(function(){
//       return fbAuth.$authWithPassword({ email: username, password: password});
//     }).then(function(authData){
//       $location.path("/home");
//     }).catch(function(error){
//       alert(error);
//     });
//
//   }
//
//
// });
//
//
// app.controller("HomeControl", function($scope, $firebaseObject, $ionicPopup){
//   $scope.list = function(){
//     var fbAuth = fb.getAuth();
//
//     if(fbAuth){
//       var sync = $firebaseObject(fb.child("users/" + fbAuth.uid));
//       // var syncObject = sync.$asObject();
//       sync.$bindTo($scope, "data");
//
//
//     }
//   };
//
//
//   $scope.newPlaylist = function(){
//     $ionicPopup.prompt({
//       title: "Enter a name for your playlist",
//       inputType: "text",
//     }).then(function(result){
//       if(result !="" && result != null){
//         if($scope.data.hasOwnProperty("playlists") !== true){
//             $scope.data.playlists = [];
//         }
//         $scope.data.playlists.push({title: result});
//       }
//     });
//   }
//
// });
