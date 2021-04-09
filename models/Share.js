const mongoose = require('mongoose');
const {Schema} = mongoose;

const shareSchema = mongoose.Schema({
    id: String,
    title: String,
    cases: Array,
    total: Array,
    results: Object
});



const Share = mongoose.model('Share', shareSchema);

module.exports = Share