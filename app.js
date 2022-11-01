const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send(`<h1>Page not found</h1>`);
});

// If chaining the res methods, send should be the the last method

// using next after send will result in error -> as you cannot set headers after sending reponse

//use Method allows us to add a new middleware function

//createserver creates a listener only when you are using HTTP library
//const server = http.createServer(app);
app.listen(3000);