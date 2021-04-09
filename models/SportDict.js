const mongoose = require('mongoose');
const { Schema } = mongoose;

const sportDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array    
});

sportDict.set('collection', 'sport_dict');

const SportDict = mongoose.model('sportDict', sportDict);

module.exports = SportDict;
