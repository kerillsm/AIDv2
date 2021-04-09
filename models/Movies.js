const mongoose = require('mongoose');
const { Schema } = mongoose;

const moviesDict = mongoose.Schema({
    routeId: Number,
    name: String,   
});

moviesDict.set('collection', 'movies');

const Movies = mongoose.model('moviesDict', moviesDict);

module.exports = Movies;
