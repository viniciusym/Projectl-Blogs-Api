const { BlogPost, sequelize } = require('../database/models');

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
};

module.exports = postService;