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
  $scope.list = function(){
    var fbAuth = fb.getAuth();

    if(fbAuth){
      var sync = $firebaseObject(fb.child("users/" + fbAuth.uid));
      // var syncObject = sync.$asObject();
      sync.$bindTo($scope, "data");
    }
  };

  $scope.newPlaylist = function(){
    $ionicPopup.prompt({
      title: "Enter a name for your playlist",
      inputType: "text",
    }).then(function(result){
      if(result !="" && result != null){
        if($scope.data.hasOwnProperty("playlists") !== true){
            $scope.data.playlists = [];
        }
        $scope.data.playlists.push({title: result});
      }
    });
  }


});

app.controller("PlaylistControl", function($scope, $firebaseObject, $stateParams){

});
