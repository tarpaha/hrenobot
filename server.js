'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const answers = require('./answers');

const app = express();
const parser = bodyParser.urlencoded({ extended: false });

app.post('/', parser, function(req, res) {
    res.send({
        answer: answers.get(req.body.text)
    });
});

const port = 8000;
app.listen(port, () => {
    console.log('Server started on: ' + port);
});