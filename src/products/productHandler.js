const serverless = require('serverless-http');
const express = require('express');
const app = express();
const productRoutes = require('./productRoutes');

app.use(express.json());
app.use('/products', productRoutes);

module.exports.handler = serverless(app);
