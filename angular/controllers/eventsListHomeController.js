angular.module('eventsApp').controller('eventsListHomeController', function($scope, $http){

  $scope.updateEvents = function(){
    $http({
      method: 'GET',
      url: '/todayEvents'
    }).then(function(res){
      $scope.events =  res.data;
    });
  };

  $scope.updateEvents();

  $scope.deleteEvent = function(id){
    console.log('Inside angular controller: user deletes event: '+id);
    $http({
      method: 'DELETE',
      url: '/event/'+id
    }).then(function(res){
        $scope.updateEvents();
    });
  };

  $scope.isUserEventOwner = function(event){
    return $scope.userId == event.owner_id;
  };

  $scope.canUserSignIn = function(event){
    if(!$scope.userId) return false;
    return !$scope.isUserEventOwner(event);
  }

});
