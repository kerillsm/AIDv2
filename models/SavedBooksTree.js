const mongoose = require('mongoose');
const {Schema} = mongoose;

const savedBooksTree = new mongoose.Schema({
    id:String,
    routeId: Number,
    name: String,
    title:String,
    owner:String,
    date:Number,
    type:String,
    public:Boolean
});


const SavedBooksTree = mongoose.model('savedBooksTree', savedBooksTree);

module.exports = SavedBooksTree;


