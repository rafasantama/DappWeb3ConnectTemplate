const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
	profileimg: String,
    kycid: String,
});

// create mongoose model
const user = mongoose.model('user', userSchema);

module.exports = user;