const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require('nanoid');

const {User} = require("../../models/user");
const {HttpError, ctrlWrapper, transport} = require("../../helpers");

const { BASE_URL } = process.env;

const signUp = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationCode = nanoid();

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationCode});

    const verifyEmail = {
        to: email,
        from: "eco2024@meta.ua",
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click virify email</a>`,
    };

    await transport.sendMail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    })
}

module.exports = {
    signUp: ctrlWrapper(signUp),    
}