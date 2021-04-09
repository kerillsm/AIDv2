const mongoose = require('mongoose');
const { Schema } = mongoose;

const topQuestion = mongoose.Schema({
    type: String,
    question: String,
    answer: String
});

topQuestion.set('collection', 'top_question');

const TopQuestion = mongoose.model('topQuestion', topQuestion);

module.exports = TopQuestion;