const categoryService = require('../services/categoryService');
const postService = require('../services/postService');
const userService = require('../services/userService');
const validations = require('../services/validations');

const postController = {
  async add(req, res) {
    const { categoryIds } = req.body;
    await validations.newPost(req.body);
    await validations.newPostCategories({ categoryIds });
    await categoryService.categoriesExists(categoryIds);
    const { id: userId } = await userService.getUserByEmail(req.token.data.userEmail);
    console.log(1);
    const newPost = await postService.add({ ...req.body, userId });

    res.status(201).json(newPost);
  },
};

module.exports = postController;