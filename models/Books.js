const mongoose = require('mongoose');
const { Schema } = mongoose;

const booksDict = mongoose.Schema({
    routeId: Number,
    name: String,
});

booksDict.set('collection', 'books');

const Books = mongoose.model('booksDict', booksDict);

module.exports = Books;