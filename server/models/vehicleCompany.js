var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VehicleCompany = new Schema ({
	id:{type:'String'},
	company:{type:'String'}
});

var VehicleComp = mongoose.model('vehicleComp', VehicleCompany);
module.exports = VehicleComp;