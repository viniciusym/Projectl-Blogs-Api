const { BlogPost, User, Category, sequelize } = require('../database/models');

const postService = {
  async add(newPost) {
    const { categoryIds, ...post } = newPost;
    let postResponse;
    await sequelize.transaction(async (newPostTransaction) => {
      const createResponse = await BlogPost.create(post, {
        transaction: newPostTransaction,
      });
      await createResponse.addCategories(categoryIds, {
        transaction: newPostTransaction,
      });

      postResponse = createResponse;
    });
    return postResponse;
  },
  async getAll() {
    const posts = BlogPost.findAll({
      include: [
        { 
          model: User,
          as: 'user',
          attributes: { exclude: 'password' },
        },
        { 
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });

    return posts;
  },
};

module.exports = postService;