const express = require('express');
const controller = require('../controllers/order');
const router = express.Router();

/**
 * router for login http://localhost:5000/api/login
 * @param  {string} '/login' - path for registration
 * @param  {callback} controller.login - callback function from controller
 */
router.get('/', controller.getAll);

/**
 * router for registration http://localhost:5000/api/register
 * @param  {string} '/register' - path for registration
 * @param  {callback} controller.register - callback function from controller
 */
router.post('/', controller.create);

// Export router in app.js
module.exports = router;