const express = require('express');
const Joi = require("joi");

const posts = require("../../models/posts");

const {HttpError} = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await posts.getAllPosts();
    res.json(result);
  } catch (error) {
    next(error)
  }
})

router.get('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await posts.getPostById(postId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await posts.addPost(req.body);
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.put('/:postId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const {postId} = req.params;
    const result = await posts.updatePostById(postId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:postId', async (req, res, next) => {
  try {
    const {postId} = req.params;
    const result = await posts.deletePostById(postId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(204).send();
    // res.json({message: "Delete success"});
  } catch (error) {
    next(error);
  }
})

module.exports = router;