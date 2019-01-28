const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRouter = require('./routes');
const client = path.join(__dirname, '../client');

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/api', apiRouter);
app.use(express.static(client));

app.listen(3000);