const express = require('express');
const authRoutes = require('./routes/auth');
const analiticRoutes = require('./routes/analitic');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const app = express();


app.use('/api', authRoutes)
app.use('/api/analitic', analiticRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/oreder', orderRoutes)
app.use('/api/position', positionRoutes)



module.exports = app;