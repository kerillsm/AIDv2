const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactUs = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const ContactUs = mongoose.model('contactUs', contactUs);

module.exports = ContactUs;