const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send(`
        <form action="/product" method="POST">
            <input type="text" name="title">
            <button type="submit">Add Product</button>
        </form>
    `);
    // Don't use next after using send -> it'll throw an error
});

router.post('/product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/')
});

module.exports = router;