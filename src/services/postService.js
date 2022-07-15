const { BlogPost, Category } = require('../database/models');

const postService = {
  async add(newPost) {
    const { categoryIds, ...post } = newPost;
    const createResponse = await BlogPost.create(post);
    const i = await createResponse.setCategories(categoryIds);

    return createResponse;
  },
};

module.exports = postService;