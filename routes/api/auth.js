const express = require("express");

const {validateBody, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", validateBody(schemas.signupSchema), ctrl.signUp);

router.post("/signin", validateBody(schemas.signinSchema), ctrl.signIn);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/signout", authenticate, ctrl.signOut);

module.exports = router;