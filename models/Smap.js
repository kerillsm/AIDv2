const mongoose = require('mongoose');
const {Schema} = mongoose;

const smapSchema = mongoose.Schema({
    id: String,
    category: String,
    subcategory: String,
    title: String,
    owner: String,
    cases: Array,
    options: Array,
});


const Smap = mongoose.model('Smap', smapSchema);

module.exports = Smap;
