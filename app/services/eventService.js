var EventModel = require('../models/EventModel');

var EventService = {
  createEvent: createEvent,
  getEventsForToday: getEventsForToday
};

function createEvent(user, data){
  var newEvent = new EventModel();

  newEvent.owner_id = user.id;
  newEvent.name = data.eventName;
  newEvent.startDate = data.startDate;
  newEvent.endDate = data.endDate;
  newEvent.description = data.description;

  newEvent.save();
};

function getEventsForToday(){
  process.nextTick(function(){
    EventModel.find({'startDate':{'$gt': Date.now()}}, function(err, events){
      if(err) throw err;
      console.log('service\n'+events);
      return events;
    });
  });
}

module.exports = EventService;
