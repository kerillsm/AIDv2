const mongoose = require('mongoose');
const { Schema } = mongoose;

const goDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array
});

goDict.set('collection', 'go_dict');

const GoDict = mongoose.model('goDict', goDict);

module.exports = GoDict;