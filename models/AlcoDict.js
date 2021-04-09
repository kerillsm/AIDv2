const mongoose = require('mongoose');
const { Schema } = mongoose;

const alcoDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array    
});

alcoDict.set('collection', 'alco_dict');

const AlcoDict = mongoose.model('alcoDict', alcoDict);

module.exports = AlcoDict;
