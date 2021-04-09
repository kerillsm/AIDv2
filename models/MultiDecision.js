const mongoose = require('mongoose');
const {Schema} = mongoose;

const multiDecisionSchema = mongoose.Schema({
    id: String,
    type:String,
    data: Array,
    owner: String,
    title: String,
    start:Number,
    end:Number
});


const MultiDecision = mongoose.model('procons', multiDecisionSchema);

module.exports = MultiDecision