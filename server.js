'use strict';

const express = require('express');
const answers = require('./answers');

const app = express();
app.use(express.json());

app.post('/', function(req, res) {
    res.send({
        answer: answers.get(req.body.text)
    });
});

const port = 8000;
app.listen(port, () => {
    console.log('Server started on: ' + port);
});