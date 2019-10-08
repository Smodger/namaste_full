const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accommodationSchema = new Schema({
  fullyBooked : { type : Boolean , default : false },
  costOverview : { type : String },
  bedRooms :{
    booked : { type : Boolean , default : false },
    description : { type : String },
    costPerPerson : { type : Number }
  }
});

module.exports = mongoose.model('Accommodation', accommodationSchema);
