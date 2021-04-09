const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array
});

gameDict.set('collection', 'game_dict');

const GameDict = mongoose.model('gameDict', gameDict);

module.exports = GameDict;