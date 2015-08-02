// var fb = new Firebase("https://incandescent-fire-1385.firebaseio.com/");

var app = angular.module('starter.controllers', ['ionic', 'firebase'])


app.controller("LoginControl", function($scope, $firebaseAuth, $location){
  $scope.login = function(username, password){
    var fbAuth = $firebaseAuth(fb);
    fbAuth.$authWithPassword({
      email: username,
      password: password
    }).then(function(authData){
      $location.path("/home");
    }).catch(function(error){
      alert(error);
    });
  };


  $scope.register = function(username, password){
    var fbAuth = $firebaseAuth(fb);

    fbAuth.$createUser({email: username, password: password}).then(function(){
      return fbAuth.$authWithPassword({ email: username, password: password});
    }).then(function(authData){
      $location.path("/home");
    }).catch(function(error){
      alert(error);
    });

  }


});


app.controller("HomeControl", function($scope, $firebaseObject, $ionicPopup){
  var fbAuth = fb.getAuth();
  console.log(fbAuth.uid);
  $scope.list = function(){
    if(fbAuth){
      var sync = $firebaseObject(fb.child("playlist/"));
      sync.$bindTo($scope, "playlists");
    }
  };

  $scope.newPlaylist = function(){
    $ionicPopup.prompt({
      title: "Enter a name for your playlist",
      inputType: "text",
    }).then(function(result){
      if(result !="" && result != null){

          var newPlaylist = {};
          newPlaylist.title = result;
          newPlaylist.songs = [];
          newPlaylist.creator_uid = fbAuth.uid;
          newPlaylist.creator_email = fbAuth.password.email;
          var playlistID = Math.round(Math.random() * 10000000);

          newPlaylist.id = playlistID;
          $scope.playlists[playlistID] = newPlaylist;

      }
    });
  }


});

app.controller("PlaylistControl", function($scope, $firebaseObject, $stateParams, $ionicPopup){
  var pid = $stateParams.id;
  $scope.list = function(){
    var sync = $firebaseObject(fb.child("playlist/" + pid + "/songs"));
    sync.$bindTo($scope, "playlist.songs");

  }

  $scope.addItem = function(){
    $ionicPopup.prompt({
      title: "Enter the name of a song",
      inputType: "text"
    }).then(function(result){
      if(result !="" && result != null){
          var newItem = {};
          newItem.title = result;
          newItem.added_by = fb.getAuth().password.email;
          newItem.added_by_id = fb.getAuth().uid;
          var itemID = Math.round(Math.random() * 10000000);
          newItem.id = itemID;
          $scope.playlist.songs[newItem] = newItem;
      }
    })
  }
});
