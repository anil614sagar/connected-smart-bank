/**
 * Created by ndavuluru on 14/05/16.
 */


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
    getTransactions(function (err, response) {
        res.json(response);
    });
});

var getTransactions = function (callback) {
    var options = {
        method: 'GET',
        url: baseURL + '/accounts/' + cust_id + '/transactions',
        headers: {
            'Ocp-Apim-Subscription-Key': ocpKey,
            'bearer': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjoiNTczNDgxYjllMGEwYmVhMTFkYzRjYjZiIiwicm9sZSI6InVzZXIiLCJwcmltYXJ5U3Vic2NyaWJlcktleSI6IjAyYTYyMjQzNzI4YzRkYTk4MTU0MTRkYmVlNjA1YTFjIiwiaWF0IjoxNDYzMTM1NTkwfQ.qSP7Mu5ETH9vffTkrnc4q-X0GlCc-FO7_kTIDqwVcp8'
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
    getTransactionDetails(req.t_id, function (err, response) {
        if (err) {
            console.log(err)
        }
        else {
            res.json(response);
        }
    });
});

var getTransactionDetails = function (t_id, callback) {
    var options = {
        method: 'GET',
        url: baseURL + '/customers/' + cust_id + '/transactions/' + t_id,
        headers: {
            'Ocp-Apim-Subscription-Key': ocpKey,
            'bearer': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjoiNTczNDgxYjllMGEwYmVhMTFkYzRjYjZiIiwicm9sZSI6InVzZXIiLCJwcmltYXJ5U3Vic2NyaWJlcktleSI6IjAyYTYyMjQzNzI4YzRkYTk4MTU0MTRkYmVlNjA1YTFjIiwiaWF0IjoxNDYzMTM1NTkwfQ.qSP7Mu5ETH9vffTkrnc4q-X0GlCc-FO7_kTIDqwVcp8'
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


});

//get all payments - GET
app.get('/rbs/v1/payments', function (req, res) {
    getPayments(function (err, response) {
        res.json(response);
    });
});

var getPayments = function (callback) {
    var options = {
        method: 'GET',
        url: baseURL + '/accounts/' + cust_id + '/payments',
        headers: {
            //bearer and ocp apim keys from request body
            'Ocp-Apim-Subscription-Key': ocpKey,
            'bearer': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjoiNTczNDgxYjllMGEwYmVhMTFkYzRjYjZiIiwicm9sZSI6InVzZXIiLCJwcmltYXJ5U3Vic2NyaWJlcktleSI6IjAyYTYyMjQzNzI4YzRkYTk4MTU0MTRkYmVlNjA1YTFjIiwiaWF0IjoxNDYzMTM1NTkwfQ.qSP7Mu5ETH9vffTkrnc4q-X0GlCc-FO7_kTIDqwVcp8'
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
    getPayment(req.p_id, function (err, response) {
        res.json(response);
    });
});

var getPayment = function (id, callback) {
    var options = {
        method: 'GET',
        url: baseURL + '/customers/' + cust_id + '/payments' + id,
        headers: {
            'Ocp-Apim-Subscription-Key': ocpKey,
            'bearer': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjoiNTczNDgxYjllMGEwYmVhMTFkYzRjYjZiIiwicm9sZSI6InVzZXIiLCJwcmltYXJ5U3Vic2NyaWJlcktleSI6IjAyYTYyMjQzNzI4YzRkYTk4MTU0MTRkYmVlNjA1YTFjIiwiaWF0IjoxNDYzMTM1NTkwfQ.qSP7Mu5ETH9vffTkrnc4q-X0GlCc-FO7_kTIDqwVcp8'
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