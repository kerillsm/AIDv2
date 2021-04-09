const mongoose = require('mongoose');
const { Schema } = mongoose;

const vacationDict = mongoose.Schema({
    id: String,
    value: String,
    type: String,
    data: Array    
});

vacationDict.set('collection', 'vacation_dict');

const VacationDict = mongoose.model('vacationDict', vacationDict);

module.exports = VacationDict;