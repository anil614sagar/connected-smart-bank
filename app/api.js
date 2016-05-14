/**
 * Created by ndavuluru on 14/05/16.
 */

var baseURL = 'https://bluebank.azure-api.net/api/v0.6.3';
var ocpKey = '02a62243728c4da9815414dbee605a1c';
var bearer = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjoiNTczNDgxYjllMGEwYmVhMTFkYzRjYjZiIiwicm9sZSI6InVzZXIiLCJwcmltYXJ5U3Vic2NyaWJlcktleSI6IjAyYTYyMjQzNzI4YzRkYTk4MTU0MTRkYmVlNjA1YTFjIiwiaWF0IjoxNDYzMTM1NTkwfQ.qSP7Mu5ETH9vffTkrnc4q-X0GlCc-FO7_kTIDqwVcp8';


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
    app.post('/rbs/v1/hue/devices', function (req, res) {
        var hueIp = req.hue_ip;
        res.send({
            message: 'successfully registered',
            hueIP: hueIp
        });
    });


//Ideal metrics data - POST
    app.post('/rbs/v1/metrics', function (req, res) {
        console.log('entered values are: ' + JSON.parse(req.body));
        var idealInvestment = {};
        var idealSpends = {};
        var body = {};
        //investments
        idealInvestment.bonds = req.bonds;
        idealInvestment.stocks = req.stocks;
        idealInvestment.insurance = req.insurance;
        idealInvestment.mutualFund = req.mutualFund;
        idealInvestment.fd = req.fd;
        //spends
        idealSpends.rent = req.rent;
        idealSpends.shopping = req.shopping;
        idealSpends.travel = req.travel;
        idealSpends.food = req.food;
        idealSpends.emi = req.emi;
        //body
        body.idealInvestment = idealInvestment;
        body.idealSpends = idealSpends;
        //prepare options
        var options = {
            method: 'POST',
            url: 'http://12.0.0.1:300/rbs/v1/metrics',
            headers: {},
            body: body
        };
        //send the data using request
        request(options, function (err, res, body) {
            if (err) {
                console.log(err)
            }
            else {
                res.send(body)
            }
        });

    });

//get list of transactions - GET
    app.get('/rbs/v1/transactions', function (req, res) {
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
    app.get('/rbs/v1/transactions/:transaction_id', function (req, res) {
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
    app.post('/rbs/v1/payments', function (req, res) {
        res.send('Payment added!');
    });

//get all payments - GET
    app.get('/rbs/v1/payments', function (req, res) {
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
    app.get('/rbs/v1/payments/:p_id', function (req, res) {
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