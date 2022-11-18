const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error');
//For Handlebars
//const expressHbs = require('express-handlebars');

const app = express();

// Additional Code for handlebars
// app.engine('hbs', expressHbs({
//     layoutsDir: 'views/layouts/', 
//     defaultLayout: 'main-layout', 
//     extname: 'hbs'
// }));
// This allows us to set any values globally on our express application
//app.set('view engine', 'hbs'); //For Handlebars
//app.set('view engine', 'pug'); //For pug
app.set('view engine', 'ejs'); //For ejs

// Path for the views folder
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

// If chaining the res methods, send should be the the last method

// using next after send will result in error -> as you cannot set headers after sending reponse

//use Method allows us to add a new middleware function

//createserver creates a listener only when you are using HTTP library
//const server = http.createServer(app);
app.listen(3000);