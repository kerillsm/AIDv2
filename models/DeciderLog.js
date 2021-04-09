const mongoose = require('mongoose');
const { Schema } = mongoose;

const deciderLog = new mongoose.Schema({
    user: String,
    datetime: {
        type: Date,
        default: Date.now
    },
    input: String,
    addquestion: Boolean,
    iskeydefined: Boolean,
    outtype: String,
    domain: String,
    params: Array
});

const DeciderLog = mongoose.model('decider_log', deciderLog);

module.exports = DeciderLog;