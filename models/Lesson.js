const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    dayOfTheWeek: {type : String},
    time: {type: Number},
    location: {type: String},
    yogaStyle: {type: String},
    linkToStudio : {type: String}
});

module.exports = mongoose.model('Lesson', lessonSchema);
