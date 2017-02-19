angular.module('eventsApp').controller('eventsListHomeController', function($scope, $http, eventService){

  $scope.updateEvents = function(){
    $http({
      method: 'GET',
      url: '/todayEvents'
    }).then(function(res){
      $scope.events =  res.data;
    });
  };

  $scope.updateEvents();


//need to copy that to other controllers
  $scope.deleteEvent = function(id){
    eventService.deleteEvent(id);
    $scope.updateEvents();
  };

  $scope.isUserEventOwner = function(event){
    if($scope.userId){
      return eventService.isUserEventOwner(event, $scope.userId);
    }
    return false;
  };

  $scope.canUserSignIn = function(event){
    if($scope.userId){
      return eventService.canUserSignIn(event, $scope.userId);
    }
    return false;
  };

  $scope.signupForEvent = function(event){
    if($scope.userId){
      eventService.signupForEvent(event, $scope.userId);
      $scope.updateEvents();
    }
  };

  $scope.isUserSignIn = function(event){
    if($scope.userId){
      return eventService.isUserSignIn(event, $scope.userId);
    }
  }
//end
});
