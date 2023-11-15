const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {SECRET_KEY} = process.env;

const {User} = require("../../models/user");
const {HttpError, ctrlWrapper} = require("../../helpers");

const signIn = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpError(401, "Email or password invalid")
    }
    const passwordCompare = bcrypt.compare(password, user.password);
    if(!passwordCompare){
        throw HttpError(401, "Email or password invalid")
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
    })
}

module.exports = {
    signIn: ctrlWrapper(signIn),    
}