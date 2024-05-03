const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Product = sequelize.define('product', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
}, { underscored: true });

Product.beforeCreate(async (product) => {
    let formattedPrice = product.price;
    formattedPrice = formattedPrice * 100;
    product.price = formattedPrice;
});

module.exports = Product;