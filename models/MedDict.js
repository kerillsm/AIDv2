const mongoose = require('mongoose');
const { Schema } = mongoose;

const medDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array    
});

medDict.set('collection', 'med_dict');

const MedDict = mongoose.model('medDict', medDict);

module.exports = MedDict;
