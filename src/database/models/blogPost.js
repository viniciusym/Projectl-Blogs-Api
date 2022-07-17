const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: true,
    type: DataTypes.STRING(255),
  },
  content: {
    allowNull: true,
    type: DataTypes.STRING(255),
  },
  published: {
    allowNull: true,
    type: DataTypes.DATE(),
    defaultValue: new Date(),
  },
  updated: {
    allowNull: true,
    type: DataTypes.DATE(),
    defaultValue: new Date(),
  },
  userId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  }
};
/** @param {import('sequelize').Sequelize} sequelize */
const BlogPost = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost', attributes,
  { 
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user'});
  }
  
  return BlogPost;
}


module.exports = BlogPost;