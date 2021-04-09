const mongoose = require('mongoose');
const { Schema } = mongoose;

const investDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array    
});

investDict.set('collection', 'invest_dict');

const InvestDict = mongoose.model('investDict', investDict);

module.exports = InvestDict;
