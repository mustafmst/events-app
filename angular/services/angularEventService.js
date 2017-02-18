angular.module('eventsApp').service('eventService', function($http){
  this.deleteEvent = function(id){
    console.log('Inside angular controller: user deletes event: '+id);
    $http({
      method: 'DELETE',
      url: '/event/'+id
    })
  };

  this.isUserEventOwner = function(event, userId){
    return userId == event.owner_id;
  };

  this.canUserSignIn = function(event, userId){
    if(!userId) return false;
    return !this.isUserEventOwner(event, userId);
  };

  this.signupForEvent = function(event, userId){
    $http({
      method: 'POST',
      url: '/event/addUser',
      params:{
        eventId: event._id,
        userId: userId
      }
    });
  };
});
