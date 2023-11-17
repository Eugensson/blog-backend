const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {ACCESS_SECRET_KEY, REFRESH_SECRET_KEY} = process.env;

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

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {expiresIn: "2m"});
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {expiresIn: "7d"});

    await User.findByIdAndUpdate(user._id, {accessToken, refreshToken})
    res.json({
        accessToken,
        refreshToken,
    })
}

module.exports = {
    signIn: ctrlWrapper(signIn),    
}