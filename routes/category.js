const express = require('express');
const controller = require('../controllers/category');
const passport = require('passport');
const router = express.Router();

/**
 * router for login http://localhost:5000/api/login
 * @param  {string} '/login' - path for registration
 * @param  {callback} controller.login - callback function from controller
 */
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);

/**
 * router for registration http://localhost:5000/api/register
 * @param  {string} '/register' - path for registration
 * @param  {callback} controller.register - callback function from controller
 */
router.get('/:id', controller.getById);

/**
 * router for registration http://localhost:5000/api/register
 * @param  {string} '/register' - path for registration
 * @param  {callback} controller.register - callback function from controller
 */
router.delete('/:id', controller.remove);

/**
 * router for registration http://localhost:5000/api/register
 * @param  {string} '/register' - path for registration
 * @param  {callback} controller.register - callback function from controller
 */
router.post('/', controller.create);

/**
 * router for registration http://localhost:5000/api/register
 * @param  {string} '/register' - path for registration
 * @param  {callback} controller.register - callback function from controller
 */
router.patch('/:id', controller.update);

// Export router in app.js
module.exports = router;