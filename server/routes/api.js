const express = require('express');
const router = express.Router();
const customer = require('../models/Customer');

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});


router.post('/customer', (req, res) => {

	var customer_details={};
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





router.get('/customer', (req, res)=> {
    customer.find(function(err, person){
        if(err) {
            res.json({
                "err": err
            });
        }
        else {
            res.json({
                "success" : person
            });
        }
    });
});





module.exports = router;

