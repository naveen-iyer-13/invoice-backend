var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var InvoiceSchema = new Schema({
    id: Number,
    customerDetails: {
      fullName: String,
      phone: String,
      address: String,
      email: String,
      pincode: String
    },
    products: [
      {
        id: Number,
        name: String,
        quantity: Number,
        price: Number,
      }
    ],
    tax: Number,
    discount: Number,
    totalPrice: Number
});
module.exports = mongoose.model('Invoice', InvoiceSchema);
