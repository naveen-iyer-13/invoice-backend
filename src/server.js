var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var product = require('./product');
var invoice = require('./invoice');
var user = require('./user');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8090;
// var router = express.Router();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


mongoose.connect('mongodb://invoice:invoice@ds155288.mlab.com:55288/heroku_14l605nz');

mongoose.Promise = global.Promise

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongo connection error'))

app.post('/invoice', (req, res) => {
  console.log('==================================');
  var count = 0
  invoice.find((err, invoices) => {
    if (err) {
        res.send(err);
    }
    count = invoices.length;
    var subTotalAmount = 0
    var discountAmount = 0
    var taxAmount = 0
    var grandTotal = 0
    if (req.body.products) {
      req.body.products.map(product => {
        subTotalAmount = subTotalAmount + product.price
      })
    }
    discountAmount = (subTotalAmount*req.body.discount/100)
    taxAmount = (subTotalAmount*req.body.tax/100)
    grandTotal = subTotalAmount + taxAmount - discountAmount

    var i = new invoice();
    i.id = count + 1;
    i.time = '04:20 am'
    i.products = req.body.products;
    i.customerDetails = req.body.customerDetails;
    i.tax = req.body.tax
    i.discount = req.body.discount
    i.totalPrice = grandTotal
    i.save((err) => {
        if (err) {
            res.send(err);
        }
        res.send({ message: 'Invoice Saved !' })
    })
  });
});

app.get('/invoices', (req, res) => {
  invoice.find((err, invoices) => {
        if (err) {
            res.send(err);
        }
        res.send(invoices);
    });
})

app.get('/test', (req, res) => {
  res.send('Fuck you')
})


app.use(cors());
app.listen(port);
console.log('REST API is runnning at ' + port);
