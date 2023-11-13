const express = require('express');

const ctrl = require("../../controllers/posts");

const {validateBody} = require("../../middlewares");

const schemas = require("../../schemas/posts");

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:postId', ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.add);

router.put('/:postId', validateBody(schemas.addSchema), ctrl.updateById);

router.delete('/:postId', ctrl.deleteById);

module.exports = router;