'use strict';
const express = require('express');
const router = express.Router();
const infiniteflight = require('../InfiniteFlightLive');

router.get('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_DOMAIN);
    res.contentType('application/json');

    let data;
    if (typeof req.query.server === 'undefined' || !req.query.server) {
        res.status(400);
        data = JSON.stringify({
            error: 400,
            text: 'Bad Request',
        });
    } else {
        try {
            data = JSON.stringify(
                await infiniteflight.flights(req.query.server)
            );
        } catch {
            res.status(500);
            data = JSON.stringify({
                error: 500,
                text: 'Internal Server Error',
            });
        }
    }

    res.write(data);
    res.end();
});

router.get('/flightplan', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_DOMAIN);
    res.contentType('application/json');

    let data;
    if (typeof req.query.flight === 'undefined' || !req.query.flight) {
        res.status(400);
        data = JSON.stringify({
            error: 400,
            text: 'Bad Request',
        });
    } else {
        try {
            data = JSON.stringify(
                await infiniteflight.flightPlan(req.query.flight)
            );
        } catch {
            res.status(500);
            data = JSON.stringify({
                error: 500,
                text: 'Internal Server Error',
            });
        }
    }

    res.write(data);
    res.end();
});

router.get('/route', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_DOMAIN);
    res.contentType('application/json');

    let data;
    if (typeof req.query.flight === 'undefined' || !req.query.flight) {
        res.status(400);
        data = JSON.stringify({
            error: 400,
            text: 'Bad Request',
        });
    } else {
        try {
            data = JSON.stringify(
                await infiniteflight.flightRoute(req.query.flight)
            );
        } catch {
            res.status(500);
            data = JSON.stringify({
                error: 500,
                text: 'Internal Server Error',
            });
        }
    }

    res.write(data);
    res.end();
});

module.exports = router;
