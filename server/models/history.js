var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistorySchema = new Schema({

    customerID:{type:mongoose.Schema.Types.ObjectId, ref:'customerList'}, 
    mechanicID:{type:mongoose.Schema.Types.ObjectId, ref:'Mechanics'}, 
    vehicleCompany:{type:mongoose.Schema.Types.ObjectId, ref:'vehicleComp' }, 
    vehicleModel:{type:mongoose.Schema.Types.ObjectId, ref:'vehicleModel' },
    typeOfRepair:{type:String,required:true},
    Date:{ type: Date,default:new Date()},
    Bill:{
    	pdf_id:String,
    	amount:Number

    }


});

var HistoryDao = mongoose.model('historylist', HistorySchema);
module.exports = HistoryDao;
















