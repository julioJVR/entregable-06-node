const User = require('../models/User');

const userCreate = async () => {
    await User.create({
        firstName: 'Josuan',
        lastName: 'Rodriguez',
        email: 'josuan.rodriguez@mail.com',
        password: 'josuan1234',
        phone: '123456789',
    });
};

module.exports = userCreate;