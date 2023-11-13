const posts = require("../models/posts");

const {HttpError, ctrlWrapper} = require("../helpers");

const getAll = async (req, res) => {    
    const result = await posts.getAllPosts();
    res.json(result);    
}

const getById = async (req, res) => {
    const { postId } = req.params;
    const result = await posts.getPostById(postId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);    
}

const add = async (req, res) => {
    const result = await posts.addPost(req.body);
    res.status(201).json(result);    
}

const updateById = async (req, res) => {
    const {postId} = req.params;
    const result = await posts.updatePostById(postId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);    
}

const deleteById = async (req, res) => {    
    const {postId} = req.params;
    const result = await posts.deletePostById(postId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(204).send();    
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}