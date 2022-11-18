const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

module.exports = router;
// res.send(`
//     <form action="/admin/add-product" method="POST">
//         <input type="text" name="title">
//         <button type="submit">Add Product</button>
//     </form>
// `);

//res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
// Don't use next after using send -> it'll throw an error