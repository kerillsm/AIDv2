const mongoose = require('mongoose');
const { Schema } = mongoose;

const studyDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array    
});

studyDict.set('collection', 'study_dict');

const StudyDict = mongoose.model('studyDict', studyDict);

module.exports = StudyDict;
