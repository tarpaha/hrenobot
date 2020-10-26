'use strict';

const fastify = require('fastify')({ logger: false });
const dictionary = require('./dictionary');

const port = 8000;

const config = require('dotenv').config();
if(config.error)
{
    console.log(`Error loading env variables: ${config.error}`);
    process.exit(1);
}

fastify.get('/get', async (req, res) => {
    return dictionary.getReaction(req.query.text);
});

fastify.get('/records', async (req, res) => {
    return dictionary.getRecords();
});

fastify.get('/update', async (req, res) => {
    await dictionary.update();
    return { records: dictionary.getRecords().length };
});

const start = async () => {
    try {
        await dictionary.update();
        await fastify.listen(port, '0.0.0.0');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

start();