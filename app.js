const express = require('express');

const app = express();

//use Method allows us to add a new middleware function
app.use((req, res, next) => {
    console.log('In the middleware');
    next(); // Allows the request to continue to the next middleware in line
});

app.use((req, res, next) => {
    console.log('In Other middleware');
    res.send(`<h1>Hello from express</h1>`);
    console.log('----')
});

//createserver creates a listener only when you are using HTTP library
//const server = http.createServer(app);
app.listen(3000);