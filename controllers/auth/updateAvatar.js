const cloudinary = require("cloudinary").v2;

const {User} = require("../../models/user");
const {ctrlWrapper} = require("../../helpers");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path} = req.file;
    const result = await cloudinary.uploader.upload(path);
    await User.findByIdAndUpdate(_id, { avatarURL: result.secure_url });
    res.json({avatarURL: `${result.secure_url}`})
}

module.exports = {
    updateAvatar: ctrlWrapper(updateAvatar),
};