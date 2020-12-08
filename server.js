const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const { Helmet } = require('react-helmet');
const ReactDOMServer = require('react-dom/server');
const clientApp = require('./client/src/App');

const lessonRoutes = require('./routes/lessons.js');
const lessonSchema = require('./models/Lesson.js');

const retreatRoutes = require('./routes/retreats.js');
const retreatSchema = require('./models/Retreat.js');

const workshopRoutes = require('./routes/workshops.js');
const workshopSchema = require('./models/Workshop.js');

const userRoutes = require('./routes/users.js');
const userSchema = require('./models/User.js');

app.use(cors());

// hide express (even though on github I state it's mern stack!)
app.disable('x-powered-by')

app.use(bodyParser.json());

if(process.env.NODE_ENV === 'development'){
  mongoose.connect('mongodb://127.0.0.1:27017/namaste', {useNewUrlParser : true});
  const connection = mongoose.connection;

  connection.once('open', () => {
    console.log('MongoDb running successfully')
  });
}

if(process.env.NODE_ENV === 'production'){
  mongoose.connect(process.env.MONGODB_URI , {useNewUrlParser : true});
  const connection = mongoose.connection;

  connection.once('open', () => {
    console.log('MongoDb running successfully')
  });
}

app.use('/uploads', express.static('uploads'));

app.use('/lessons', lessonRoutes)
app.use('/retreats', retreatRoutes)
app.use('/workshops', workshopRoutes)
app.use('/user', userRoutes)

app.use(express.static(path.resolve("client/build")));

app.get('*', (req,res) => {
  const appStr = ReactDOMServer.renderToStaticNodeStream(JSON.stringify(clientApp));
  const helmet = Helmet.renderStatic();

  res.send(formatHTML(appStr, helmet));
  res.sendFile(path.resolve(__dirname, 'client', "build", "index.html"))
});

// app.get('/*', (req,res) => {
//   console.log('in');
//   // const appStr = renderToString(clientApp);
//   const appStr = ReactDOMServer.renderToStaticNodeStream(clientApp);
//
//   const helmet = Helmet.renderStatic();
//
//   res.send(formatHTML(appStr, helmet));
// });

function formatHTML(appStr, helmet) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">
          ${ appStr }
        </div>
        <script src="./bundle.js"></script>
      </body>
    </html>
  `
}

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log('Server running on ' + PORT);
});
