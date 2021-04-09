const mongoose = require('mongoose');
const {Schema} = mongoose;

const mapSchema = mongoose.Schema({
    id: String,
    type:String,
    title: String,
    owner: String,
    cases: Array,
    options: Array,
    start: Number,
    end:Number,
    private: Boolean
});


const Map = mongoose.model('Map', mapSchema);

module.exports = Map
