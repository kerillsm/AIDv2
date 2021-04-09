const mongoose = require('mongoose');
const {Schema} = mongoose;

const dish = new mongoose.Schema({
    id:String,
    region:String,
    country:String,
    type:String,
    title:String,
    cousin:String,
    description:String,
    img:String,
    tag:String
});



const Dish = mongoose.model('dish', dish);

module.exports = Dish;


