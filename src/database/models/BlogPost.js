const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },
  published: {
    allowNull: false,
    type: DataTypes.DATE(),
  },
  updated: {
    allowNull: false,
    type: DataTypes.DATE(),
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
  }
};
/** @param {import('sequelize').Sequelize} sequelize */
const BlogPost = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost', attributes,
  { 
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'id', as: 'user'});
  }
  
  return BlogPost;
}


module.exports = BlogPost;