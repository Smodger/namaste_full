const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bedroomSchema = new Schema({
  booked : { type : Boolean , default : false },
  description : { type : String },
  costPerPerson : { type : Number }
})

module.exports = mongoose.model('bedrooms', bedroomSchema);
