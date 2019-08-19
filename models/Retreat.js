const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const retreatSchema = new Schema({
  name : { type : String },
  dateStart : { type: String },
  dateEnd : { type : String },
  retreatSummary : { type : String },
  housing : [{
      type : Schema.Types.ObjectId,
      ref : 'Accommodation'
    }],
  food : { type : String },
  byCar : { type : String },
  byTrain : { type : String },
  bookingDetails : { type : String },
  bookingUrl : { type : String },
  whatsIncluded : {
    tags : [{ type : String }]
  }
});

module.exports = mongoose.model('Retreat', retreatSchema);
