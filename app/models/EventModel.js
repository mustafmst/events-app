var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  owner_id: mongoose.Schema.Types.ObjectId,
  name: String,
  startDate: Date,
  endDate: Date,
  description: String,
  participants: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Event', eventSchema);
