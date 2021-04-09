const mongoose = require('mongoose');
const { Schema } = mongoose;

const disches = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array    
});

disches.set('collection', 'disches');

const Disches = mongoose.model('disches', disches);

module.exports = Disches;
