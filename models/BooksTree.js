const mongoose = require('mongoose');
const {Schema} = mongoose;

const booksTree = new mongoose.Schema({
    id: Number,
    data: Array,

});


const BooksTree = mongoose.model('booksTree', booksTree);

module.exports = BooksTree;


