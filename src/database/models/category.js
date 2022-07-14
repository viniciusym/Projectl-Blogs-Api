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
const category = (sequelize) => {
  const category = sequelize.define('Category', attributes,
  { 
    timestamps: false,
    tableName: 'Categories'
  });

  return category;
}

module.exports = category;