const categoryService = require('../services/categoryService');
const postService = require('../services/postService');
const validations = require('../services/validations');

const postController = {
  async add(req, res) {
    const { categoryIds } = req.body;
    const { userId } = req.token.data;
    Promise.all([
      await validations.newPost(req.body),
      await validations.newPostCategories({ categoryIds }),
      await categoryService.categoriesExists(categoryIds),
    ]);
    const newPost = await postService.add({ ...req.body, userId });

    res.status(201).json(newPost);
  },
  async getAll(_req, res) {
    const posts = await postService.getAll();

    res.status(200).json(posts);
  },
  async getById(req, res) {
    const { id } = req.params;
    const post = await postService.getById(id);

    res.status(200).json(post);
  },
  async update(req, res) {
    const { id } = req.params;
    await validations.newPost(req.body);
    await postService.update(req.body, id);
    const updatedPost = await postService.getById(id);

    res.status(200).json(updatedPost);
  },
  async delete(req, res) {
    const { id } = req.params;
    await postService.delete(id);

    res.sendStatus(204);
  },
  async getBySearchTerm(req, res) {
    const { q } = req.query;
    const posts = await postService.getBySearchTerm(q);

    res.status(200).json(posts);
  },
};

module.exports = postController;