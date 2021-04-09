const mongoose = require('mongoose');
const { Schema } = mongoose;

const colorDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array
});

colorDict.set('collection', 'color_dict');

const ColorDict = mongoose.model('colorDict', colorDict);

module.exports = ColorDict;