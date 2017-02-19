var EventModel = require('../models/EventModel');

var EventService = {
  createEvent: createEvent,
  getEventsForToday: getEventsForToday,
  deleteEvent: deleteEvent,
  addUserToEvent: addUserToEvent,
  removeUserFromEvent: removeUserFromEvent
};

function createEvent(user, data){
  var newEvent = new EventModel();

  newEvent.owner_id = user.id;
  newEvent.name = data.eventName;
  newEvent.startDate = data.startDate;
  newEvent.endDate = data.endDate;
  newEvent.description = data.description;
  newEvent.maxGuests = data.maxGuests;

  newEvent.save();
};

function getEventsForToday(res){
  process.nextTick(function(){
    EventModel.find({'startDate':{'$gt': Date.now()}}).sort({stardDate:'asc'}).exec(function(err, events){
      if(err) throw err;
      res.json(events);
    });
  });
}

function deleteEvent(eventId, user, res){
  EventModel.findById(eventId, function(err, event){
    if(err) throw err;
    if(user._id != event.owner_id) res.json({message : 'You are not the owner of this event'});
    event.remove();
  });
}

function addUserToEvent(params, res){
  EventModel.findById(params.eventId, function(err, event){
    if(err) throw err;
    if(params.userId == event.owner_id) res.json({message : 'You are the owner of this event. You can\'t be participant.'});
    event.participants.push(params.userId);
    event.save();
  });
}

function removeUserFromEvent(params, res){
  EventModel.findById(params.eventId, function(err, event){
    if(err) throw err;
    var indexOfParticipant = event.participants.indexOf(params.userId);
    if(indexOfParticipant !== -1){
      event.participants.splice(indexOfParticipant,1);
      event.save();
    }
  });
}

module.exports = EventService;
