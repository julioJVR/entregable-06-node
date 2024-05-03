const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const index = catchError(async (request, response) => {
    const results = await User.findAll();

    return response.json(results);
});

const create = catchError(async (request, response) => {
    const result = await User.create(request.body);

    return response.status(201).json(result);
});

const destroy = catchError(async (request, response) => {
    const { id } = request.params;

    const result = await User.destroy({ where: { id } });

    if (!result) return response.sendStatus(404);

    return response.sendStatus(204);
});

const update = catchError(async (request, response) => {
    const { id } = request.params;
    const { firstName, lastName, phone } = request.body;

    const result = await User.update(
        { firstName, lastName, phone },
        { where: { id }, returning: true }
    );

    if (result[0] === 0) return response.sendStatus(404);

    return response.json(result[1][0]);
});

const login = catchError(async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return response.status(401).json('Wrong Credentials.');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return response.status(401).json('Wrong Credentials.');

    const token = jwt.sign(
        { user }, process.env.TOKEN_SECRET, { expiresIn: '1d' },
    );

    return response.json({ user, token });
});

module.exports = { index, create, destroy, update, login };