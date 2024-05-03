const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');

Category.hasMany(Product);
Product.belongsTo(Category);