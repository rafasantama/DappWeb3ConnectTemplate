const mongoose = require('mongoose');

const { Schema } = mongoose;

const kycSchema = new Schema({
	name: String,
    lastName: String,
    email: String,
    phone: String,
    dateBirth: String,
    address1: String,
    address2: String,
    country: String,
    city: String,
    state: String,
    nationality: String,
    zipCode: String,
    sourceDocument1: String,
    sourceDocument2: String,
    wallet: String,
    agreePolics: String,
    accountActive:String
});

// create mongoose model
const kyc = mongoose.model('kyc', kycSchema);

module.exports = kyc;