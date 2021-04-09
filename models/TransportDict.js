const mongoose = require('mongoose');
const { Schema } = mongoose;

const transportDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array
});

transportDict.set('collection', 'transport_dict');

const TransportDict = mongoose.model('transportDict', transportDict);

module.exports = TransportDict;