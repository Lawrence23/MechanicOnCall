const express = require('express');
const router = express.Router();
const customer = require('../models/Customer');
const vehicleComp = require('../models/vehicleCompany');
const vehicleModel = require('../models/vehicleModel');
const mechanic = require('../models/mechanic');
const city = require('../models/city');
var mongoose = require('mongoose');


/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});


router.post('/customer', (req, res) => {

    var customer_details = {};
    customer_details.firstName = req.body.firstName;
    customer_details.lastName = req.body.lastName;
    customer_details.email = req.body.email;
    customer_details.contactNo = req.body.contactNo;
    customer_details.password = req.body.password;
    customer_details.city = req.body.city;
    customer.create(customer_details, function(err, customers) {
        if (err) {
            res.send(err);
        } else {

            res.json({

                status: "1",
                message: "Success",
                data: customers

            });

        }
    });

});

router.get('/customer', (req, res) => {
    customer.find(function(err, person) {
        if (err) {
            res.json({
                "err": err
            });
        } else {
            res.json({

                status: 1,
                message: "Success",
                data: person

            });
        }
    });
});




router.post('/vehicleCompany', (req, res) => {
    var vehicle_company_details = {};
    vehicle_company_details.id = req.body.id;
    vehicle_company_details.company = req.body.company;

    vehicleComp.create(vehicle_company_details, function(err, vehicle_company) {
        if (err) {
            res.send(err);
        } else {

            res.json({

                status: 1,
                message: "Success",
                data: vehicle_company

            });

        }
    });
});



router.get('/vehicleCompany', (req, res) => {
    vehicleComp.find(function(err, vehicleComp) {
        if (err) {
            res.json({
                "err": err
            });
        } else {
            res.json({

                status: 1,
                message: "Success",
                data: vehicleComp

            });
        }
    });
});




router.post('/vehicleModel', (req, res) => {
    var vehicle_model_details = {};
    vehicle_model_details.id = req.body.id;
    vehicle_model_details.model = req.body.model;

    vehicleModel.create(vehicle_model_details, function(err, vehicel_model) {
        if (err) {
            res.send(err);
        } else {
            res.json({

                status: 1,
                message: "Success",
                data: vehicel_model

            });

        }
    });
});


router.get('/vehicleModel', (req, res) => {
    vehicleModel.find(function(err, vehicel_model) {
        if (err) {
            res.json({
                "err": err
            });
        } else {
            res.json({

                status: 1,
                message: "Success",
                data: vehicel_model

            });
        }
    });
});





router.post('/mechanic', (req, res) => {
    var mechanic_details = {};
    mechanic_details.firstName = req.body.firstName;
    mechanic_details.lastName = req.body.lastName;
    mechanic_details.email = req.body.email;
    mechanic_details.contactNo = req.body.contactNo;
    mechanic_details.password = req.body.password;
   // mechanic_details.veicleTypes = req.body;
    mechanic_details.status = req.body.status;
   // mechanic_details.location = req.body.location;
    //mechanic_details.address = req.body.address;

    mechanic_details.city = req.body.city;

    mechanic.create(req.body, function(err, mechanic) {
        if (err) {
            res.send(err);
        } else {

            res.send(mechanic);

        }
    });
});

router.post('/city', (req, res) => {


    city.create(req.body, function(err, city) {
        if (err) {
            res.send(err);
        } else {

            res.send(city);

        }
    });
});

router.get('/city', (req, res) => {
    city.find(function(err, city) {
        if (err) {
            res.json({
                "err": err
            });
        } else {
            res.json({

                status: 1,
                message: "Success",
                data: city

            });
        }
    });
});








router.post('/login', (req, res) => {
    // 0 for user and  1 for mechanic
    if (req.body.status == '0') {

        customer.find({ email: req.body.email, password: req.body.password }).exec(function(err, data) {
            if (err) {
                res.json({

                    status: 0,
                    message: "Error",
                    err: err

                });
            } else if (data.length === 0) {
                res.json({

                    status: 0,
                    message: "User not found",
                    data: data

                });
            } else {

                res.json({

                    status: "1",
                    message: "User found",
                    data: data

                });
            }

        });

    } else if (req.body.status == '1') {


        mechanic.find({ email: req.body.email, password: req.body.password }).exec(function(err, data) {
            if (err) {
                res.json({

                    status: 0,
                    message: "Error",
                    err: err

                });
            } else if (data.length === 0) {

                res.json({

                    status: 0,
                    message: "User not found",
                    data: data

                });
            } else {

                res.json({

                    status: "1",
                    message: "User found",
                    data: data

                });
            }

        });


    } else {

        res.json({

            status: "0",
            message: "Invalid parameter"

        });

    }


});



router.post('/signup', (req, res) => {
    // 0 for user and  1 for mechanic
    if (req.body.status == '0') {

        customer.find({ email: req.body.email }).exec(function(err, data) {
            if (err) {
                res.json({

                    status: 0,
                    message: "Error",
                    err: err

                });
            } else if (data.length === 0) {

                res.json({

                    status: 0,
                    message: "User not found",
                    data: data

                });

            } else {

                res.json({

                    status: "1",
                    message: "User already Exist",
                    data: data

                });

            }



        });

    } else if (req.body.status == '1') {

        mechanic.find({ email: req.body.email }).exec(function(err, data) {
            if (err) {
                res.json({

                    status: 0,
                    message: "Error",
                    err: err

                });

            } else if (data.length == 0) {

                res.json({

                    status: 0,
                    message: "User not found",
                    data: data

                });

            } else if (data) {

                res.json({

                    status: 1,
                    message: "User already Exist",
                    data: data

                });

            }





        });




    } else {

        res.json({

            status: "0",
            message: "Invalid parameter"

        });

    }




});

// router.post('/filterByType', (req, res) => {

// var city = req.body.city;
// var Objcity =mongoose.Types.ObjectId(city);
// var vehicletype = req.body.vehicletype;
// var Objvehicletype = mongoose.Types.ObjectId(vehicletype);

// mechanic.find({ city: Objcity ,  vehicleTypes:{$elemMatch:{ id: Objvehicletype}  }   }).exec(function(err, data){

//     if(err){
//         res.send(err);

//     }
//     else{
//         res.send(data);

//     }


// });

// });



router.post('/filterByType', (req, res) => {

var city = req.body.city;
var Objcity =mongoose.Types.ObjectId(city);
var vehicletype = req.body.vehicletype;
var Objvehicletype = mongoose.Types.ObjectId(vehicletype);
var vehiclemodel = req.body.vehiclemodel;
var Objvehiclemodel =  mongoose.Types.ObjectId(vehiclemodel);

mechanic.find({ city: Objcity ,  vehicleTypes:{$elemMatch:{ id: Objvehicletype}  } ,  vehicleTypes:{ model:{$in:Objvehiclemodel} }  }).exec(function(err, data){

    if(err){
        res.send(err);

    }
    else{
        res.send(data);

    }


});

});


module.exports = router;
