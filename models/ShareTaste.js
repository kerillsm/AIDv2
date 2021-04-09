const mongoose = require('mongoose');
const {Schema} = mongoose;

const shareTaste = mongoose.Schema({
    id: String,
    data: Array
});


const ShareTaste = mongoose.model('shareTasteTheTravel', shareTaste);

module.exports = ShareTaste