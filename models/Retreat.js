const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let retreatSchema = new Schema({
  name : { type : String },
  dateStart : { type: Date },
  dateEnd : { type : Date },
  retreatSummary : { type : String },
  housing : [{
      type : Schema.Types.ObjectId,
      ref : 'Accommodation'
    }],
  food : { type : String },
  travel : {
    byCar : { type : String },
    byTrain : { type : String }
  },
  bookingInfo : {
    details : { type : String },
    url : { type : String }
  },
  whatsIncluded : {
    tags : [{ type : String }]
  }
});

module.exports = mongoose.model('Retreat', retreatSchema);
