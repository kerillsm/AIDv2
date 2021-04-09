const mongoose = require('mongoose');
const { Schema } = mongoose;

const socDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array
});

socDict.set('collection', 'soc_dict');

const SocDict = mongoose.model('socDict', socDict);

module.exports = SocDict;