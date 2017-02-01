var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CitySchema = new Schema({

	label: {type:'String', required:true}

});

var City = mongoose.model('cityList', CitySchema);
module.exports = City;