var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicle_Model = new Schema ({
	model:{type:'String'}
});

var VehicleModel = mongoose.model('vehicleModel', vehicle_Model);
module.exports = VehicleModel;