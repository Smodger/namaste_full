const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    dayOfTheWeek: {type : String},
    startHour: {type: Number, max: 24},
    startMinutes: {type: String, match :/^[0-9]*$/},
    startTimeOfDay: {type: Boolean, default: false},
    endHour: {type: Number, max: 24},
    endMinutes: {type: String, match :/^[0-9]*$/},
    endTimeOfDay: {type: Boolean, default: false},
    location: {type: String},
    yogaStyle: {type: String},
    linkToStudio : {type: String},
    additionalInfo : {type: String}
});

module.exports = mongoose.model('Lesson', lessonSchema);
