const express = require('express');
const { index, create, destroy, update, login } = require('../controllers/user.controller');
const verifyJWT = require('../utils/verifyJWT');

const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJWT, index)
    .post(create);

routerUser.route('/login')
    .post(login);

routerUser.route('/:id')
    .delete(verifyJWT, destroy)
    .put(verifyJWT, update);

module.exports = routerUser;