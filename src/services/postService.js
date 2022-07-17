const { Op } = require('sequelize');
const { BlogPost, User, Category, sequelize } = require('../database/models');
const PostNotFoundError = require('../errors/PostNotFoundError');

const UserAndCategoriesInclude = [
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
];

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
      include: UserAndCategoriesInclude,
    });

    return posts;
  },
  async getById(id) {
    const post = BlogPost.findByPk(id, {
      include: UserAndCategoriesInclude,
    });

    return post;
  },
  async exists(id) {
    const post = await BlogPost.findByPk(id);
    if (!post) {
      throw new PostNotFoundError('Post does not exist');
    }
    return true;
  },
  async update(changes, id) {
    await BlogPost.update(changes, { where: { id } });
  },
  async getUserId(postId) {
    const { userId } = await BlogPost.findByPk(postId, { attributes: ['userId'] });

    return userId;
  },
  async delete(postId) {
    await BlogPost.destroy({ where: { id: postId } });
  },
  async getBySearchTerm(searchTerm) {
    const titleCondition = {
      title: 
        { [Op.substring]: searchTerm },
    };

    const contentCondition = {
      content:
        { [Op.substring]: searchTerm },
    };

    const posts = await BlogPost.findAll({
      where: { [Op.or]: [titleCondition, contentCondition] },
      include: UserAndCategoriesInclude,
    });

    return posts;
  },
};

module.exports = postService;