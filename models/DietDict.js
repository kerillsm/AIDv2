const mongoose = require('mongoose');
const { Schema } = mongoose;

const dietDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array
});

dietDict.set('collection', 'diet_dict');

const DietDict = mongoose.model('dietDict', dietDict);

module.exports = DietDict;