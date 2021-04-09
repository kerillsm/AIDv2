const mongoose = require('mongoose');
const { Schema } = mongoose;

const nameDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array
});

nameDict.set('collection', 'name_dict');

const NameDict = mongoose.model('nameDict', nameDict);

module.exports = NameDict;