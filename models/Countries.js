const mongoose = require('mongoose');
const {Schema} = mongoose;

const countries = new mongoose.Schema({
    regionTitle: String,
    countries: Array
});



const Countries = mongoose.model('countries', countries);

module.exports = Countries;


