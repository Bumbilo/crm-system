const express = require('express');
const controller = require('../controllers/position');
const router = express.Router();
const passport = require('passport');

/**
 * router for login http://localhost:5000/api/login
 * @param  {string} '/login' - path for registration
 * @param  {callback} controller.login - callback function from controller
 */
router.get('/:id', passport.authenticate('jwt', {
    session: false
}), controller.getByCategoryId);

/**
 * router for registration http://localhost:5000/api/register
 * @param  {string} '/register' - path for registration
 * @param  {callback} controller.register - callback function from controller
 */
router.post('/', passport.authenticate('jwt', {
    session: false
}), controller.create);

/**
 * router for registration http://localhost:5000/api/register
 * @param  {string} '/register' - path for registration
 * @param  {callback} controller.register - callback function from controller
 */
router.patch('/:id', passport.authenticate('jwt', {
    session: false
}), controller.update);

/**
 * router for registration http://localhost:5000/api/register
 * @param  {string} '/register' - path for registration
 * @param  {callback} controller.register - callback function from controller
 */
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), controller.remove);

// Export router in app.js
module.exports = router;