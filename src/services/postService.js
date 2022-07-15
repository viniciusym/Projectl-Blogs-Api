const { BlogPost, User, Category, sequelize } = require('../database/models');
const PostNotFoundError = require('../errors/PostNotFoundError');

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
  async getById(id) {
    const post = BlogPost.findByPk(id, {
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
};

module.exports = postService;