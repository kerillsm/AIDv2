const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const User = require('../models/User');
const Tree = require('../models/Tree');


var mapsCard = {
    'slider': Map,
    'tree': Tree
}


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username, password, done) {
    User.findOne({ username : username}, function(err,user) {
        return err
            ? done(err)
            : user
                ? user.comparePassword(password, (err, isMatch) => {
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Incorrect password.' })
                    }
                })
                : done(null, false, { message: 'Incorrect username.' });
    });
}));



passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        err
            ? done(err)
            : done(null,user);
    });
});
