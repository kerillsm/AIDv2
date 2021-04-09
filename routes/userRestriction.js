const uuidv1 = require('uuid/v1');
var paypal = require('paypal-rest-sdk');
const moment = require('moment');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ASdmBPmb06IFnk_lnLE7JXNh3dAuzJKzPI7ANRkc_3vlG5SqGGeaX4wjEAnUYj9_A1yBeE-H6-rIR-6V',
    'client_secret':'EBLL7D4A-FLzWeAgHMFgg7wC9tRLDEHUjycunO72Sc6YSnRmdRuo2KBKDVLnYEUY4-QdvdLR42LjxDpU'
});
var url = require('url');


let test = moment().add({seconds:60}).format()


const UserRestriction = require('../models/UserRestrictions')

module.exports = app => {
    app.get('/api/userRestriction/lastDate/:user', function(req, res) {
        UserRestriction.findOne({user:req.params.user}, function (err, user) {
            if (err) return console.error(err);
            console.log('CHECKING', Date.now(),user.lastDateOfSaving);
            if(Date.now() - user.lastDateOfSaving > 86400000 && user.lastDateOfSaving !== null ){
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'mapsCounter':3,
                        'goalsCounter':1,
                        'prosConsCounter':2,
                        'booksTreeCounter':2,
                        'moviesTreeCounter':2,
                        'lastDateOfSaving':null
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }
            else {
                res.send(user || {error: 'file not found'});
            }


        })
    })



    app.post('/api/userRestriction/saveUser',function (req,res) {
        let newUserRestriction = new UserRestriction({
            id: uuidv1(),
            user:req.body.user,
            status:'bronze',
            mapsCounter:3,
            goalsCounter:1,
            prosConsCounter:2,
            booksTreeCounter:2,
            moviesTreeCounter:2,
            lastDateOfSaving:null,
            paymentToken:"",
            billingAgreement:{},
            billingAgreementAfterExecute:{}
        })

        newUserRestriction.save(function (err,user) {
            res.send(user)
        })
    })



    app.get('/api/userRestriction/maps/update/:user', function(req, res) {
        UserRestriction.findOne({user:req.params.user}, function (err, user) {
            if (err) return console.error(err);

            if(user.mapsCounter === 3 && user.lastDateOfSaving === null ){
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'mapsCounter':2,
                        'lastDateOfSaving':Date.now()
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }
            else if(user.mapsCounter === 3 && user.lastDateOfSaving !== null ){
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'mapsCounter':2
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }
            else {
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'mapsCounter':user.mapsCounter-1
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }

        })
    })

    app.get('/api/userRestriction/goals/update/:user', function(req, res) {
        console.log('UPDATE GOALS')
        UserRestriction.findOne({user:req.params.user}, function (err, user) {
            if (err) return console.error(err);

            if(user.goalsCounter === 1 && user.lastDateOfSaving === null ){
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'goalsCounter':0,
                        'lastDateOfSaving':Date.now()
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }
            else if(user.goalsCounter === 1 && user.lastDateOfSaving !== null ){
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'goalsCounter':0
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }


        })
    })

    app.get('/api/userRestriction/prosCons/update/:user', function(req, res) {
        UserRestriction.findOne({user:req.params.user}, function (err, user) {
            if (err) return console.error(err);

            if(user.prosConsCounter === 2 && user.lastDateOfSaving === null ){
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'prosConsCounter':1,
                        'lastDateOfSaving':Date.now()
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }
            else if(user.prosConsCounter === 2 && user.lastDateOfSaving !== null ){
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'prosConsCounter':1
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }
            else {
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'prosConsCounter':user.prosConsCounter-1
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }

        })
    })

    app.get('/api/userRestriction/moviesTree/update/:user', function(req, res) {
        UserRestriction.findOne({user:req.params.user}, function (err, user) {
            if (err) return console.error(err);

            if(user.moviesTreeCounter === 2 && user.lastDateOfSaving === null ){
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'moviesTreeCounter':1,
                        'lastDateOfSaving':Date.now()
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }
            else if(user.moviesTreeCounter === 2 && user.lastDateOfSaving !== null ){
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'moviesTreeCounter':1
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }
            else {
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'moviesTreeCounter':user.moviesTreeCounter-1
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }

        })
    })


    app.get('/api/userRestriction/booksTree/update/:user', function(req, res) {
        UserRestriction.findOne({user:req.params.user}, function (err, user) {
            if (err) return console.error(err);

            if(user.booksTreeCounter === 2 && user.lastDateOfSaving === null ){
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'booksTreeCounter':1,
                        'lastDateOfSaving':Date.now()
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }
            else if(user.booksTreeCounter === 2 && user.lastDateOfSaving !== null ){
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'booksTreeCounter':1
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }
            else {
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'booksTreeCounter':user.booksTreeCounter-1
                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                    res.send(map || {error: 'file not found'});
                });
            }

        })
    })

    app.get('/api/paypal', function(req, res) {
        res.status(200).send("Paypal IPN Listener");
        res.end('Response will be available on console, nothing to look here!');
    });

    app.get('/api/paypal/get',function (req,res) {
        var billingAgreementId = "P-0NJ10521L3680291SOAQIVTQ";

        paypal.billingAgreement.get(billingAgreementId, function (error, billingAgreement) {
            if (error) {
                console.log(error);
                throw error;
            } else {
                console.log("Get Billing Agreement");
                console.log(JSON.stringify(billingAgreement));
                res.send(billingAgreement)
            }
        });
    })


    app.post('/api/paypal/month/:user', function(req, res) {

        var isoDate = new Date();
        isoDate.setMinutes(isoDate.getMinutes() + 1);
        let datePaypal = isoDate.toISOString().slice(0, 19) + 'Z';


        var billingPlanAttributes = {
            "name": "Plan with Regular and Trial Payment Definitions",
            "description": "Plan with regular and trial payment definitions.",
            "type": "INFINITE",
            "payment_definitions": [
                {
                    "name": "Regular payment definition",
                    "type": "REGULAR",
                    "frequency": "MONTH",
                    "frequency_interval": "1",
                    "amount": {
                        "value": "6.9",
                        "currency": "USD"
                    },
                    "cycles": "0"
                }
            ],
            "merchant_preferences": {
                "return_url": "http://localhost:8080/subscribe/month",
                "cancel_url": "http://localhost:8080/me/profile",
                "auto_bill_amount": "YES",
                "initial_fail_amount_action": "CONTINUE",
                "max_fail_attempts": "0"
            }
        };

        var billingPlanUpdateAttributes = [
            {
                "op": "replace",
                "path": "/",
                "value": {
                    "state": "ACTIVE"
                }
            }
        ];

        var billingAgreementAttributes = {
            "name": " имя Соглашения месячной подписки",
            "description": "Соглашения месячной подписки",
            "start_date": datePaypal,
            "plan": {
                "id": "123"
            },
            "payer": {
                "payment_method": "paypal"
            }
        };

// Create the billing plan
        paypal.billingPlan.create(billingPlanAttributes, function (error, billingPlan) {
            if (error) {
                console.log(error);
                console.log(error.response);
                throw error;
            } else {
                console.log("Create Billing Plan Response");
                console.log(billingPlan);

                // Activate the plan by changing status to Active
                paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, function (error, response) {
                    if (error) {
                        console.log(error);
                        throw error;
                    } else {
                        console.log("Billing Plan state changed to " + billingPlan.state);
                        billingAgreementAttributes.plan.id = billingPlan.id;

                        // Use activated billing plan to create agreement
                        paypal.billingAgreement.create(billingAgreementAttributes, function (error, billingAgreement) {
                            if (error) {
                                console.log(error);
                                console.log(error.response);
                                throw error;
                            } else {
                                console.log("Create Billing Agreement Response");
                                //console.log(billingAgreement);
                                for (var index = 0; index < billingAgreement.links.length; index++) {
                                    if (billingAgreement.links[index].rel === 'approval_url') {
                                        var approval_url = billingAgreement.links[index].href;
                                        console.log("For approving subscription via Paypal, first redirect user to");
                                        console.log(approval_url);

                                        console.log("Payment token is");
                                        let paymentToken = url.parse(approval_url, true).query.token
                                        console.log(paymentToken);
                                        UserRestriction.findOneAndUpdate({user:req.params.user}, {
                                            '$set': {
                                                'paymentToken':paymentToken,
                                                'billingAgreement':billingAgreement
                                            }
                                        }, {new:true}, function(err, map){
                                            console.log('ERR',map);
                                            res.redirect(approval_url)
                                        });



                                        // See billing_agreements/execute.js to see example for executing agreement
                                        // after you have payment token

                                    }
                                }
                            }
                        });
                    }
                });
            }
        });


    });


    app.get('/api/paypal/checking/month/:user/:paymentToken',function(req,res){

        let paymentToken = req.params.paymentToken
        console.log(paymentToken);
        paypal.billingAgreement.execute(paymentToken, {}, function (error, billingAgreement) {
            if (error) {
                console.log(error);
                res.send(false)
            } else {
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'status':'goldMonth',
                        'mapsCounter':10000000,
                        'goalsCounter':10000000,
                        'prosConsCounter':10000000,
                        'booksTreeCounter':10000000,
                        'moviesTreeCounter':10000000,
                        'lastDateOfSaving':Date.now(),
                        'billingAgreementAfterExecute':billingAgreement

                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                });
                console.log("Billing Agreement Execute Response");
                console.log(JSON.stringify(billingAgreement));
                console.log(req.params.user)



                res.send(true)
            }
        });
    })


    app.get('/api/paypal/canceling/month/:user/:billingAgreementId',function(req,res){

        let billingAgreementId = req.params.billingAgreementId;

        var cancel_note = {
            "note": "Canceling the agreement"
        };

        paypal.billingAgreement.cancel(billingAgreementId, cancel_note, function (error, response) {
            if (error) {
                console.log(error);
                res.send(false)
            } else {
                console.log("Cancel Billing Agreement Response");
                console.log(response);

                paypal.billingAgreement.get(billingAgreementId, function (error, billingAgreement) {
                    if (error) {
                        console.log(error.response);
                        res.send(false)
                    } else {
                        console.log(billingAgreement.state);
                        UserRestriction.findOneAndUpdate({user:req.params.user}, {
                            '$set': {
                                'status':'bronze',
                                'mapsCounter':3,
                                'goalsCounter':1,
                                'prosConsCounter':2,
                                'booksTreeCounter':2,
                                'moviesTreeCounter':2,
                                'lastDateOfSaving':null,
                                'paymentToken':"",
                                'billingAgreement':{},
                                'billingAgreementAfterExecute':{}

                            }
                        }, {new:true}, function(err, map){
                            console.log('ERR',map);
                            res.send(true)

                        });

                    }
                });
            }
        });
    })

    //Year



    app.post('/api/paypal/year/:user', function(req, res) {

        var isoDate = new Date();
        isoDate.setMinutes(isoDate.getMinutes() + 1);
        let datePaypal = isoDate.toISOString().slice(0, 19) + 'Z';


        var billingPlanAttributes = {
            "name": "Plan with Regular and Trial Payment Definitions",
            "description": "Plan with regular and trial payment definitions.",
            "type": "INFINITE",
            "payment_definitions": [
                {
                    "name": "Regular payment definition",
                    "type": "REGULAR",
                    "frequency": "YEAR",
                    "frequency_interval": "1",
                    "amount": {
                        "value": "69",
                        "currency": "USD"
                    },
                    "cycles": "0"
                }
            ],
            "merchant_preferences": {
                "return_url": "http://localhost:8080/subscribe/year",
                "cancel_url": "http://localhost:8080/me/profile",
                "auto_bill_amount": "YES",
                "initial_fail_amount_action": "CONTINUE",
                "max_fail_attempts": "0"
            }
        };

        var billingPlanUpdateAttributes = [
            {
                "op": "replace",
                "path": "/",
                "value": {
                    "state": "ACTIVE"
                }
            }
        ];

        var billingAgreementAttributes = {
            "name": " имя Соглашения годовой подписки",
            "description": "Соглашения годовой подписки",
            "start_date": datePaypal,
            "plan": {
                "id": "123"
            },
            "payer": {
                "payment_method": "paypal"
            }
        };

// Create the billing plan
        paypal.billingPlan.create(billingPlanAttributes, function (error, billingPlan) {
            if (error) {
                console.log(error);
                console.log(error.response);
                throw error;
            } else {
                console.log("Create Billing Plan Response");
                console.log(billingPlan);

                // Activate the plan by changing status to Active
                paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, function (error, response) {
                    if (error) {
                        console.log(error);
                        throw error;
                    } else {
                        console.log("Billing Plan state changed to " + billingPlan.state);
                        billingAgreementAttributes.plan.id = billingPlan.id;

                        // Use activated billing plan to create agreement
                        paypal.billingAgreement.create(billingAgreementAttributes, function (error, billingAgreement) {
                            if (error) {
                                console.log(error);
                                console.log(error.response);
                                throw error;
                            } else {
                                console.log("Create Billing Agreement Response");
                                //console.log(billingAgreement);
                                for (var index = 0; index < billingAgreement.links.length; index++) {
                                    if (billingAgreement.links[index].rel === 'approval_url') {
                                        var approval_url = billingAgreement.links[index].href;
                                        console.log("For approving subscription via Paypal, first redirect user to");
                                        console.log(approval_url);

                                        console.log("Payment token is");
                                        let paymentToken = url.parse(approval_url, true).query.token
                                        console.log(paymentToken);
                                        UserRestriction.findOneAndUpdate({user:req.params.user}, {
                                            '$set': {
                                                'paymentToken':paymentToken,
                                                'billingAgreement':billingAgreement
                                            }
                                        }, {new:true}, function(err, map){
                                            console.log('ERR',map);
                                            res.redirect(approval_url)
                                        });



                                        // See billing_agreements/execute.js to see example for executing agreement
                                        // after you have payment token

                                    }
                                }
                            }
                        });
                    }
                });
            }
        });


    });


    app.get('/api/paypal/checking/year/:user/:paymentToken',function(req,res){

        let paymentToken = req.params.paymentToken
        console.log(paymentToken);
        paypal.billingAgreement.execute(paymentToken, {}, function (error, billingAgreement) {
            if (error) {
                console.log(error);
                res.send(false)
            } else {
                UserRestriction.findOneAndUpdate({user:req.params.user}, {
                    '$set': {
                        'status':'goldYear',
                        'mapsCounter':10000000,
                        'goalsCounter':10000000,
                        'prosConsCounter':10000000,
                        'booksTreeCounter':10000000,
                        'moviesTreeCounter':10000000,
                        'lastDateOfSaving':Date.now(),
                        'billingAgreementAfterExecute':billingAgreement

                    }
                }, {new:true}, function(err, map){
                    console.log('ERR',map);

                });
                console.log("Billing Agreement Execute Response");
                console.log(JSON.stringify(billingAgreement));
                console.log(req.params.user)



                res.send(true)
            }
        });
    })


    app.get('/api/paypal/canceling/year/:user/:billingAgreementId',function(req,res){

        let billingAgreementId = req.params.billingAgreementId;

        var cancel_note = {
            "note": "Canceling the agreement"
        };

        paypal.billingAgreement.cancel(billingAgreementId, cancel_note, function (error, response) {
            if (error) {
                console.log(error);
                res.send(false)
            } else {
                console.log("Cancel Billing Agreement Response");
                console.log(response);

                paypal.billingAgreement.get(billingAgreementId, function (error, billingAgreement) {
                    if (error) {
                        console.log(error.response);
                        res.send(false)
                    } else {
                        console.log(billingAgreement.state);
                        UserRestriction.findOneAndUpdate({user:req.params.user}, {
                            '$set': {
                                'status':'bronze',
                                'mapsCounter':3,
                                'goalsCounter':1,
                                'prosConsCounter':2,
                                'booksTreeCounter':2,
                                'moviesTreeCounter':2,
                                'lastDateOfSaving':null,
                                'paymentToken':"",
                                'billingAgreement':{},
                                'billingAgreementAfterExecute':{}

                            }
                        }, {new:true}, function(err, map){
                            console.log('ERR',map);
                            res.send(true)

                        });

                    }
                });
            }
        });
    })







}

