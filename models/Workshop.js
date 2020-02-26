const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workshopSchema = new Schema({
  title : { type : String },
  date : { type : String },
  startHour : { type : Number, max : 24 },
  startMins : {type: String, match :/^[0-9]*$/},
  endHour : { type : Number, max : 24 },
  endMins : {type: String, match :/^[0-9]*$/},
  description : { type : String },
  booking : { type :  String },
  location : { type :  String },
  image : [ String ]
});

module.exports = mongoose.model('Workshop', workshopSchema);
