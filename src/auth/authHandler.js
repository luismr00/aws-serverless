const serverless = require('serverless-http');
const express = require('express');
const app = express();
const authRoutes = require('./authRoutes');

app.use(express.json());
app.use('/auth', authRoutes);

module.exports.handler = serverless(app);
