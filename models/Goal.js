const mongoose = require('mongoose');
const {Schema} = mongoose;

const goalSchema = mongoose.Schema({
    id: String,
    type:String,
    title: String,
    owner: String,
    smart: Array,
    pure: Array,
    clear: Array,
    end: Number,
    start: Number,
    public: Boolean
});


const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal