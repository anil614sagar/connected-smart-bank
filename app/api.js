/**
 * Created by ndavuluru on 14/05/16.
 */

var baseURL = 'https://bluebank.azure-api.net/api/v0.6.3';
var ocpKey = '02a62243728c4da9815414dbee605a1c';
var bearer = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjoiNTczNDgxYjllMGEwYmVhMTFkYzRjYjZiIiwicm9sZSI6InVzZXIiLCJwcmltYXJ5U3Vic2NyaWJlcktleSI6IjAyYTYyMjQzNzI4YzRkYTk4MTU0MTRkYmVlNjA1YTFjIiwiaWF0IjoxNDYzMTM1NTkwfQ.qSP7Mu5ETH9vffTkrnc4q-X0GlCc-FO7_kTIDqwVcp8';

var path = require('path')

var redis = require('redis')
var rclient = redis.createClient()


module.exports = function (app, passport) {
//dashboard
    app.get('/dashboard', function (req, res) {
        res.sendFile(path.resolve('public/views/dashboard.html'));
    });

//transactions
    app.get('/transactions', function (req, res) {
        res.sendFile(path.resolve('public/views/transactions.html'));
    });

//ideal metric config page
    app.get('/metricsConfig', function (req, res) {
        res.sendFile(path.resolve('public/views/metricsConfig.html'));
    });

//hue config page
    app.get('/hueConfig', function (req, res) {
        res.sendFile(path.resolve('public/views/hueConfig.html'));
    });

//following routes handle all requests within the pages

//hue config details - POST
    app.post('/netbnk/v1/hue', function (req, res) {
        var hueIp = req.hue_ip;
        res.send({
            message: 'successfully registered',
            hueIP: hueIp
        });
    });


//Ideal metrics data - POST
    app.post('/netbnk/v1/metrics', function (req, res) {
        console.log(req.body);
        var idealInvestment = {};
        var idealSpends = {};
        var body = {};
        //investments
        idealInvestment.bonds = req.body.data.idealInvestment.bonds;
        idealInvestment.stocks = req.body.data.idealInvestment.stocks;
        idealInvestment.insurance = req.body.data.idealInvestment.insurance;
        idealInvestment.mutualFund = req.body.data.idealInvestment.mutualFund;
        idealInvestment.fd = req.body.data.idealInvestment.fd;
        idealInvestment.misc = req.body.data.idealInvestment.misc;
        //spends
        idealSpends.rent = req.body.data.idealSpend.rent;
        idealSpends.shopping = req.body.data.idealSpend.shopping;
        idealSpends.travel = req.body.data.idealSpend.travel;
        idealSpends.food = req.body.data.idealSpend.food;
        idealSpends.emi = req.body.data.idealSpend.emi;
        idealSpends.misc = req.body.data.idealSpend.misc;
        //body

        body.idealInvestment = idealInvestment;
        body.idealSpends = idealSpends;
        body.mobileNumber = req.body.data.mobileNumber;

        rclient.set('idealMetrics:' + body.mobileNumber, JSON.stringify(body), function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).json({msg: 'failed to store data'})
            } else {
                res.json({message: 'successfully stored data in backend..'})
            }
        });
    });


//get list of transactions - GET
    app.get('/netbnk/v1/transactions', function (req, res) {
        getTransactions(req.customer_id, req.account_id, function (err, response) {
            res.json(response);
        });
    });

    var getTransactions = function (c_id, acc_id, callback) {
        var options = {
            method: 'GET',
            url: baseURL + '/customers/' + c_id + '/accounts/' + acc_id + '/transactions',
            headers: {
                'Ocp-Apim-Subscription-Key': ocpKey,
                'bearer': bearer
            }
        };
        request(options, function (err, body) {
            if (err) {
                callback(err, body)
            }
            else {
                callback(err, body)
            }
        });
    };

//get a single transaction
    app.get('/netbnk/v1/transactions/:transaction_id', function (req, res) {
        getTransactionDetails(req.c_id, req.account_id, req.t_id, function (err, response) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(response);
            }
        });
    });

    var getTransactionDetails = function (customer_id, acc_id, t_id, callback) {
        var options = {
            method: 'GET',
            url: baseURL + '/customers/' + customer_id + '/accounts/' + acc_id + '/transactions/' + t_id,
            headers: {
                'Ocp-Apim-Subscription-Key': ocpKey,
                'bearer': bearer
            } //bearer - token, ocp - key
        };
        request(options, function (err, body) {
            if (err) {
                callback(err, body);
            }
            else {
                callback(err, body);
            }
        });
    };

//post a single payment - POST
    app.post('/netbnk/v1/payments', function (req, res) {
        res.send('Payment added!');
    });

//get all payments - GET
    app.get('/netbnk/v1/payments', function (req, res) {
        getPayments(req.customer_id, req.account_id, function (err, response) {
            res.json(response);
        });
    });

    var getPayments = function (cust_id, account_id, callback) {
        var options = {
            method: 'GET',
            url: baseURL + '/customers/' + cust_id + '/accounts/' + account_id + '/payments',
            headers: {
                //bearer and ocp apim keys from request body
                'Ocp-Apim-Subscription-Key': ocpKey,
                'bearer': bearer
            }
        };
        request(options, function (err, body) {
            if (err) {
                callback(err, body);
            }
            else {
                callback(err, body);
            }
        });
    };

//get a single payment - GET
    app.get('/netbnk/v1/payments/:p_id', function (req, res) {
        getPayment(req.customer_id, req.account_id, req.p_id, function (err, response) {
            res.json(response);
        });
    });

    var getPayment = function (c_id, a_id, p_id, callback) {
        var options = {
            method: 'GET',
            url: baseURL + '/customers/' + cust_id + '/accounts/' + a_id + '/payments' + id,
            headers: {
                'Ocp-Apim-Subscription-Key': ocpKey,
                'bearer': bearer
            }
        };
        request(options, function (err, body) {
            if (err) {
                callback(err, body);
            }
            else {
                callback(err, body);
            }
        })
    }

}