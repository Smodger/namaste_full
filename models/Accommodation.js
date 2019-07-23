const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let accommodationSchema = new Schema({
  fullyBooked : { type : Boolean , default : false },
  costOverview : { type : String },
  bedRooms :[{
    type : Schema.Types.ObjectId,
    ref : 'bedrooms'
  }]
})

module.exports = mongoose.model('Accommodation', accommodationSchema);
