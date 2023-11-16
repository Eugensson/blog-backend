const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const {User} = require("../../models/user");
const {ctrlWrapper} = require("../../helpers");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    Jimp.read(tempUpload, (err, avatar) => {
        if (err) throw err;
        avatar.resize(100, 100).write(tempUpload, () => {
          fs.rename(tempUpload, resultUpload);
          const avatarURL = path.join("avatars", filename);
    
          User.findByIdAndUpdate(_id, { avatarURL }).then(() => {
            res.json({ avatarURL });
          });
        });
    });
}

module.exports = {
    updateAvatar: ctrlWrapper(updateAvatar),
};