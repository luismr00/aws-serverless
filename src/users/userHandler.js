const serverless = require('serverless-http');
const express = require('express');
const app = express();
const userRoutes = require('./userRoutes');

app.use(express.json());
app.use('/users', userRoutes);

module.exports.handler = serverless(app);
