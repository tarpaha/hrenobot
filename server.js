'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const answers = require('./answers');

const app = express();
app.get('/', answers.get);

const port = 8000;
app.listen(port, () => {
    console.log('Server started on: ' + port);
});