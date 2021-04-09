const mongoose = require('mongoose');
const {Schema} = mongoose;

const userRestrictionSchema = mongoose.Schema({
    id: String,
    user:String,
    status:String,
    mapsCounter:Number,
    goalsCounter:Number,
    prosConsCounter:Number,
    moviesTreeCounter:Number,
    booksTreeCounter:Number,
    lastDateOfSaving:Number,
    paymentToken:String,
    billingAgreement:Object,
    billingAgreementAfterExecute:Object
});


const UserRestriction = mongoose.model('UserRestriction', userRestrictionSchema);

module.exports = UserRestriction
