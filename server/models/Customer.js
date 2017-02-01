var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({

    firstName:{type:'String' ,required:true},  // Lawrence
    lastName:{type:'String' ,required:true}, // Moraira
    email:{type:'String' ,required:true,unique: true }, // lawret@qburst.com
    password:{type:'String', required: true},
    contactNo:{type:'number',required:true} // ph: 9633339137


});

var CustomerDao = mongoose.model('customerList', CustomerSchema);
module.exports = CustomerDao;

