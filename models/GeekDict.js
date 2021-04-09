const mongoose = require('mongoose');
const { Schema } = mongoose;

const geekDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array    
});

geekDict.set('collection', 'geek_dict');

const GeekDict = mongoose.model('geekDict', geekDict);

module.exports = GeekDict;
