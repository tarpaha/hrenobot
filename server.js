'use strict';

const port = 8000;

const throng = require('throng');
throng(start);

function start() {
    const express = require('express');
    const answers = require('./answers');
    
    const app = express();
    app.use(express.json());
    
    app.post('/', function(req, res) {
        res.send({
            answer: answers.get(req.body.text)
        });
    });
    
    app.listen(port, () => {
        console.log('Server started on: ' + port);
    });
}