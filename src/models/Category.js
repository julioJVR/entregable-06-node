const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Category = sequelize.define('category', {
    name: { type: DataTypes.STRING, allowNull: false },
}, { underscored: true });

module.exports = Category;