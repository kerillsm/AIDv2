const mongoose = require('mongoose');
const { Schema } = mongoose;

const musicDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array    
});

musicDict.set('collection', 'music_dict');

const MusicDict = mongoose.model('musicDict', musicDict);

module.exports = MusicDict;
