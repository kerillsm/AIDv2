 const express = require('express');
 const path = require('path');
 const indexPath = path.join(__dirname,'client/dist', 'index.html')
 const publicPath = express.static(path.join(__dirname, 'client/dist'));



 const mongoose = require('mongoose');
 const bodyParser = require('body-parser')
 const cookieParser = require('cookie-parser');
 const session = require('express-session');
 const passport = require('passport');
 require('./services/passport')


 const app = express();

 const uri = 'mongodb+srv://AID:aiDecider123!@cluster0.fypmm.mongodb.net/aid?retryWrites=true&w=majority';

 const options = {
     //useMongoClient: true,
     autoIndex: false, // Don't build indexes
     reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
     reconnectInterval: 500, // Reconnect every 500ms
     poolSize: 10, // Maintain up to 10 socket connections
     // If not connected, return errors immediately rather than waiting for reconnect
     bufferMaxEntries: 0
 };

 mongoose.Promise = require('bluebird');
 mongoose.connect(uri, options).then(
     () => { console.log('successful connect ') },
     err => { console.log(err)}
 );

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: false }));



 app.use(cookieParser());
 app.use(session({
     secret: 'secret',
     resave: false
 }));

// Passport:
 app.use(passport.initialize());
 app.use(passport.session());

 app.use(publicPath);

 app.get('/', function (req, res) {
     res.sendFile(indexPath);
 });

 require('./routes')(app);
 require('./routes/goal')(app);
 require('./routes/migrateMaps')(app);
 require('./routes/multiDecision')(app);
 require('./routes/filmTree')(app);
 require('./routes/userRestriction')(app);
 require('./routes/tasteTheTravel')(app);
 require('./routes/personalAssistant')(app);
 require('./routes/admin')(app);


 app.get('*', function (req, res) {
     res.sendFile(indexPath);

 });





app.listen(process.env.PORT || 3000);



