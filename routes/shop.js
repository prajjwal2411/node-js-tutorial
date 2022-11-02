// Module to get custom path
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    // __dirname is a global variable by node js, it holds absolute path on os to this project folder
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;