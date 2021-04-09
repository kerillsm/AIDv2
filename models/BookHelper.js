const mongoose = require('mongoose');
const {Schema} = mongoose;

const bookHelper = new mongoose.Schema({
    routeId: Number,
    name: String
});



const BookHelper = mongoose.model('books', bookHelper);

module.exports = BookHelper;


