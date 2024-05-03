const express = require('express');
const { index, create, destroy } = require('../controllers/category.controller');
const verifyJWT = require('../utils/verifyJWT');

const routerCategory = express.Router();

routerCategory.route('/')
    .get(index)
    .post(verifyJWT, create);

routerCategory.route('/:id')
    .delete(verifyJWT, destroy);

module.exports = routerCategory;