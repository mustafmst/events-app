var eventsApp = angular.module('eventsApp', []);

eventsApp.controller('eventsListController', ['$scope','$http', function($scope, $http){
  $http({
    method: 'GET',
    url: '/todayEvents'
  }).then(function(res){
    $scope.events =  res.data;
  });
}]
);
