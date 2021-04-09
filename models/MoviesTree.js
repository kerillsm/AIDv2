const mongoose = require('mongoose');
const {Schema} = mongoose;

const moviesTree = new mongoose.Schema({
    id: Number,
    data: Array
});


const MoviesTree = mongoose.model('moviesTree', moviesTree);

module.exports = MoviesTree;


