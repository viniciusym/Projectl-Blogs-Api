const postService = require('../services/postService');

const postController = {
  async add(req, res) {
    const newPost = await postService.add(req.body);

    res.status(201).json(newPost);
  },
};

module.exports = postController;