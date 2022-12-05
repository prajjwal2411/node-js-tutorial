const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:id', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

module.exports = router;
// res.send(`
//     <form action="/admin/add-product" method="POST">
//         <input type="text" name="title">
//         <button type="submit">Add Product</button>
//     </form>
// `);

//res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
// Don't use next after using send -> it'll throw an error