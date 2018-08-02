const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const analiticRoutes = require('./routes/analitic');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true
    })
    .then(() => console.log('base was connected'))
    .catch(error => console.log('error', error));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api/oreder', orderRoutes);
app.use('/api/analitic', analiticRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/position', positionRoutes);

module.exports = app;