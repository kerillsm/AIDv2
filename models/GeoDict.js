const mongoose = require('mongoose');
const { Schema } = mongoose;

const geoDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array    
});

geoDict.set('collection', 'geo_dict');

const GeoDict = mongoose.model('geoDict', geoDict);

module.exports = GeoDict;