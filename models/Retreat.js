const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const retreatSchema = new Schema({
  name : { type : String },
  dateStart : { type: String },
  dateEnd : { type : String },
  retreatSummary : { type : String },
  accomodationOverview : { type : String},
  bedRooms :[{
    booked : { type : Boolean , default : false },
    description : { type : String },
    cost : { type : Number }
  }],
  food : { type : String },
  byCar : { type : String },
  byTrain : { type : String },
  bookingDetails : { type : String },
  bookingUrl : { type : String },
  whatsIncluded : [ String ],
  retreatImages : [{
    name : { type : String },
    key : { type : Number }
  }]
});

module.exports = mongoose.model('Retreat', retreatSchema);
