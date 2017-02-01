const express = require('express');
const router = express.Router();
const customer = require('../models/Customer');
const vehicleComp = require('../models/vehicleCompany');
const vehicleModel = require('../models/vehicleModel');
const mechanic = require('../models/mechanic');


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
    customer.create(customer_details, function(err, customers) {
        if (err) {
            res.send(err);
        } else {

            res.send(customers);

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
                "success": person
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

            res.send(vehicle_company);

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

            res.send(vehicel_model);

        }
    });
});

router.post('/mechanic', (req, res) => {
    var mechanic_details = {};
    mechanic_details.firstName = req.body.firstName;
    mechanic_details.lastName = req.body.lastName;
    mechanic_details.email = req.body.email;
    mechanic_details.contactNo = req.body.contactNo;
    mechanic_details.veicleTypes = req.body;
    mechanic_details.status = req.body.status;
    mechanic_details.location = req.body.location;
    mechanic_details.address = req.body.address;

    mechanic.create(req.body, function(err, mechanic) {
        if (err) {
            res.send(err);
        } else {

            res.send(mechanic);

        }
    });
});




module.exports = router;
