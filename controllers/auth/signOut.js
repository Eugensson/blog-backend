const {User} = require("../../models/user");
const {ctrlWrapper} = require("../../helpers");

const signOut = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {accessToken: "", refreshToken: ""});
    res.json({message: "Logout success"})
}

module.exports = {    
    signOut: ctrlWrapper(signOut),
}