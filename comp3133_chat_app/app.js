const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./socketManager/socket')(io);

// Heroku will provide a PORT number via the .env file. We gain access to it like this.
const port = process.env.PORT || 3000;

//Listen To Port
server.listen(port, function(){
    console.log('Listening on port ' + port);
});

//Connection To Database
mongoose.connect('mongodb://admin:devilmaycry5@ds163255.mlab.com:63255/webchat_socketio', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo database!');
  })
  .catch(err  => {
    console.error('App starting error:', err.stack);
  });

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/views' /**/ )));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')))

//Routes
app.use('/chats', require('./routes/chats'));
app.use('/', require('./routes/index'));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
  })


