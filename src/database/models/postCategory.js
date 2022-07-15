const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  postId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'BlogPost',
      key: 'id'
    }
  },
  categoryId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'Category',
      key: 'id'
    }
  },
};
/** @param {import('sequelize').Sequelize} sequelize */
const PostCategory = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory', attributes,
  { 
    timestamps: false,
    tableName: 'PostCategories'
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory, 
      foreignKey: 'categoryId',
      as: 'categories',
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'postId',
      as: 'posts'
    });
  }

  return PostCategory;
}

module.exports = PostCategory;