'use strict';

const port = process.env.PORT || 8000;

const librarian_address = process.env.LIBRARIAN_ADDRESS || 'localhost:3000';

const fastify = require('fastify')({ logger: true });
const axios = require('axios');

const answers = require('./answers');

fastify.get('/update', async (req, res) => {
    const response = await axios.get(`http://${librarian_address}/update`);
    return response.data;
});

fastify.post('/', async (req, res) => {
    return { answer: await answers.get(req.body.text) }
});

const start = async () => {
    try {
        await fastify.listen(port, '0.0.0.0');
    } catch (err) {
        process.exit(1);
    }
}

start();