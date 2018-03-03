var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    productId: Number,
    name: String,
    price: Number,
});
module.exports = mongoose.model('Product', ProductSchema);
