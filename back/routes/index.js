const routes = require('express').Router();
const user = require('../controllers/user');
routes.use('/user', user);

module.exports = routes;