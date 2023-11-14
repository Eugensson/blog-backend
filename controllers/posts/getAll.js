const { Post } = require("../../models");

const {ctrlWrapper} = require("../../helpers");

const getAll = async (req, res) => {    
    const result = await Post.find({}, "-createdAt -updatedAt");
    res.json(result);    
}

module.exports = {
    getAll: ctrlWrapper(getAll),
}