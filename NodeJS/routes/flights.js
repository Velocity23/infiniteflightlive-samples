'use strict';
var express = require('express');
var router = express.Router();

var infiniteflight = require('../InfiniteFlightLive');

router.get('/', async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_DOMAIN);
    res.contentType("application/json");

    var data;
    if (typeof req.query.server === 'undefined' || !req.query.server) {
        res.status(400);
        data = JSON.stringify({
            "error": 400,
            "text": "Bad Request"
        });
    } else {
        try {
            data = JSON.stringify(await infiniteflight.flights(req.query.server));
        } catch {
            res.status(500);
            data = JSON.stringify({
                "error": 500,
                "text": "Internal Server Error"
            });
        }
    }

    res.write(data);
    res.end();
});

router.get('/flightplans', async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_DOMAIN);
    res.contentType("application/json");

    var data;
    if (typeof req.query.server === 'undefined' || !req.query.server) {
        res.status(400);
        data = JSON.stringify({
            "error": 400,
            "text": "Bad Request"
        });
    } else {
        try {
            data = JSON.stringify(await infiniteflight.flightPlans(req.query.server));
        } catch {
            res.status(500);
            data = JSON.stringify({
                "error": 500,
                "text": "Internal Server Error"
            });
        }
    }

    res.write(data);
    res.end();
});

module.exports = router;
