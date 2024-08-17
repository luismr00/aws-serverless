const express = require('express');
const router = express.Router();
const productService = require('./productService');
// const authMiddleware = require('../middleware/authMiddleware');

// Use the auth middleware to protect the routes
// router.use(authMiddleware);

router.get('/get-products', productService.getProducts);
router.post('/create-product', productService.createProduct);
router.put('/:id', productService.updateProduct);
router.delete('/:id', productService.deleteProduct);

module.exports = router;
