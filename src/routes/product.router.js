const express = require('express');
const { index, create, show, destroy, update } = require('../controllers/product.controller');
const verifyJWT = require('../utils/verifyJWT');

const routerProduct = express.Router();

routerProduct.route('/')
    .get(index)
    .post(verifyJWT, create);

routerProduct.route('/:id')
    .get(show)
    .delete(verifyJWT, destroy)
    .put(verifyJWT, update);

module.exports = routerProduct;