const mongoose = require('mongoose');
const {Schema} = mongoose;

const savedMoviesTree = new mongoose.Schema({
    id:String,
    routeId: Number,
    name: String,
    title:String,
    owner:String,
    date:Number,
    type:String,
    public:Boolean
});



const SavedMoviesTree = mongoose.model('savedMoviesTree', savedMoviesTree);

module.exports = SavedMoviesTree;


