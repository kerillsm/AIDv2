const mongoose = require('mongoose');
const {Schema} = mongoose;

const filmHelper = new mongoose.Schema({
    routeId: Number,
    name: String
});



const FilmHelper = mongoose.model('movies', filmHelper);

module.exports = FilmHelper;


