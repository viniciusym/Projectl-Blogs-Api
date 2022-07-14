const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },
};
/** @param {import('sequelize').Sequelize} sequelize */
const Category = (sequelize) => {
  const Category = sequelize.define('Category', attributes,
  { 
    timestamps: false,
    tableName: 'Categories'
  });

  return Category;
}

module.exports = Category;