var EventModel = require('../models/EventModel');

var EventService = {
  createEvent: createEvent
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

module.exports = EventService;
