const express = require('express');

const ctrl = require("../../controllers/posts");

const {validateBody, isValidId, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/post");

const router = express.Router();

router.get('/', authenticate, ctrl.getAll);

router.get('/:postId', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put(
  '/:postId',
  isValidId,
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  '/:postId/favorite',
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusPost
);

router.delete('/:postId', authenticate, isValidId, ctrl.deleteById);

module.exports = router;