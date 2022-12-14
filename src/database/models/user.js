const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  displayName: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING(255),
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING(255),
  },
}
/** @param {import('sequelize').Sequelize} sequelize */
const User = (sequelize) => {
  const User = sequelize.define('User', attributes, { timestamps: false } );

  User.associate = (models) => {
    User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'posts'})
  }
  
  return User;
};

module.exports = User;