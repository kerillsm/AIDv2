const mongoose = require('mongoose');
const {Schema} = mongoose;

const treeSchema = new mongoose.Schema({
    id: String,
    type:String,
    title: String,
    edges: Array,
    nodes: Array,
    owner: String,
    date: String,
});


const Tree = mongoose.model('Tree', treeSchema);

module.exports = Tree;


