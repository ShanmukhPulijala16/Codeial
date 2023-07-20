// Why all const's because we don't want someone to override these things
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// Extract styles & scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes/index.js'));
// app.use('/', require('./routes'));
// This will also work as by default index.js is only chosen

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server:', err);
    }
    console.log('Server is running on port:', port);
});