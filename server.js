const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const lessonRoutes = require('./routes/lessons.js');
const lessonSchema = require('./models/Lesson.js')

const retreatRoutes = require('./routes/retreats.js')
const retreatSchema = require('./models/Retreat.js')

const userRoutes = require('./routes/users.js')
const userSchema = require('./models/User.js')

app.use(cors());

// hide express (even though on github I state it's mern stack)
app.disable('x-powered-by')

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/namaste', {useNewUrlParser : true});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDb running successfully')
});

app.use('/uploads', express.static('uploads'));
app.use('/lessons', lessonRoutes)
app.use('/retreats', retreatRoutes)
app.use('/user', userRoutes)

app.use(express.static(path.resolve("client/build")));

app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'client', "build", "index.html"))
});

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log('Server running on ' + PORT);
});
