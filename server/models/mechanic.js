var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MechanicSchema = new Schema ({
	firstName:{type:'String', required:true},
	lastName:{type:'String', required:true},
	email:{type:'String', required: true,unique: true },
	password:{type:'String', required: true},
	contactNo:{type:'String', required:true},
	status:{type:'String', default:'free'},
	location:{type:'String'},
	address:{type:'String'},
	vehicleTypes:[
		{
			id:String,
			model: [
						{id:String}
					]
		}
	],
	city:{types:Schema.Types.ObjectId}
});

var Mechanic = mongoose.model('Mechanics', MechanicSchema);
module.exports = Mechanic;