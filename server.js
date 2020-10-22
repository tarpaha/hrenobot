'use strict';

const port = 8000;

const fastify = require('fastify')({ logger: false });
const answers = require('./answers');

fastify.post('/', async (req, res) => {
    return { answer: await answers.get(req.body.text) }
});

const start = async () => {
    try {
        await fastify.listen(port);
    } catch (err) {
        process.exit(1);
    }
}

start();