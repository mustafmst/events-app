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
    if(this.isUserSignIn(event, userId)) return false;
    return !this.isUserEventOwner(event, userId);
  };

  this.isUserSignIn = function(event, userId){
    return event.participants.includes(userId);
  };

  this.signupForEvent = function(event, userId){
    $http({
      method: 'POST',
      url: '/event/addUser/'+userId+'/'+event._id
    });
  };
});
