const mongoose = require('mongoose');
const { Schema } = mongoose;

const fitDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array
});

fitDict.set('collection', 'fit_dict');

const FitDict = mongoose.model('fitDict', fitDict);

module.exports = FitDict;