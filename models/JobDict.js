const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array    
});

jobDict.set('collection', 'job_dict');

const JobDict = mongoose.model('jobDict', jobDict);

module.exports = JobDict;
