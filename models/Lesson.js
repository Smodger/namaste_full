const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    dayOfTheWeek: {type : String},
    startHour: {type: Number, max: 24},
    startMinutes: {type: String, pattern: "/[0-9]+/g"},
    endHour: {type: Number, max: 24},
    endMinutes: {type: String, pattern: "/[0-9]+/g"},
    location: {type: String},
    yogaStyle: {type: String},
    linkToStudio : {type: String},
    additionalInfo : {type: String}
});

module.exports = mongoose.model('Lesson', lessonSchema);
