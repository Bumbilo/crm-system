const express = require('express');
const controller = require('../controllers/position');
const router = express.Router();

/**
 * router for login http://localhost:5000/api/login
 * @param  {string} '/login' - path for registration
 * @param  {callback} controller.login - callback function from controller
 */
router.post('/login', controller.login);

/**
 * router for registration http://localhost:5000/api/register
 * @param  {string} '/register' - path for registration
 * @param  {callback} controller.register - callback function from controller
 */
router.post('/register', controller.register);

// Export router in app.js
module.exports = router;