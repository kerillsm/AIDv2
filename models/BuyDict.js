const mongoose = require('mongoose');
const { Schema } = mongoose;

const buyDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array
});

buyDict.set('collection', 'buy_dict');

const BuyDict = mongoose.model('buyDict', buyDict);

module.exports = BuyDict;