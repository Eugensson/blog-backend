const { Post } = require("../../models/post");

const {HttpError, ctrlWrapper} = require("../../helpers");

const getById = async (req, res) => {
    const { postId } = req.params;    
    const result = await Post.findById(postId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);    
}

module.exports = {    
    getById: ctrlWrapper(getById),    
}