const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workshopSchema = new Schema({
  title : { type : String },
  date : { type : String },
  startHour : { type : Number, max : 24 },
  startMins : { type : Number, max : 60 },
  endHour : { type : Number, max : 24 },
  endMins : { type : Number, max : 60 },
  description : { type : String },
  booking : { type :  String },
  location : { type :  String }
});

module.exports = mongoose.model('Workshop', workshopSchema);
