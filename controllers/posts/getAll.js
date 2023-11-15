const { Post } = require("../../models/post");

const {ctrlWrapper} = require("../../helpers");

const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;

    const skip = (page - 1) * limit;
    const result = await Post.find(
        {owner},
        "-createdAt -updatedAt",
        {skip, limit}
    ).populate("owner", "name email");
    res.json(result);    
}

module.exports = {
    getAll: ctrlWrapper(getAll),
}