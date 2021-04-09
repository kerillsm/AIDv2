const mongoose = require('mongoose');
const { Schema } = mongoose;

const petDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array
});

petDict.set('collection', 'pet_dict');

const PetDict = mongoose.model('petDict', petDict);

module.exports = PetDict;