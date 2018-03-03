var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    fullName: String,
    phone: Number,
    address: String,
    email: String,
    pincode: Number
});
module.exports = mongoose.model('User', UserSchema);
