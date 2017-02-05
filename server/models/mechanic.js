var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MechanicSchema = new Schema ({
	firstName:{type:'String', required:true},
	lastName:{type:'String', required:true},
	email:{type:'String', required: true,unique: true },
	password:{type:'String', required: true},
	contactNo:{type:'String', required:true},
	status:{type:'String', default:'free'},
	// location:[
	// 	{
	// 	lat:Number ,
	// 	lng:Number 		
	// 	}

	// 	],
	// address:{type:'String'},
	vehicleTypes:[
		{
			id:{type:mongoose.Schema.Types.ObjectId, ref:'vehicleComp'},
			model: [
						{type:mongoose.Schema.Types.ObjectId,ref:'vehicleModel'}
				   ]
		}
	],
	city:{type:mongoose.Schema.Types.ObjectId,ref:'cityList'}

});

var Mechanic = mongoose.model('Mechanics', MechanicSchema);
module.exports = Mechanic;





