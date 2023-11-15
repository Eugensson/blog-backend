const { Post } = require("../../models/post");

const {HttpError, ctrlWrapper} = require("../../helpers");

const updateById = async (req, res) => {
    const {postId} = req.params;    
    const result = await Post.findByIdAndUpdate(postId, req.body, {new: true});
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);    
}

module.exports = {    
    updateById: ctrlWrapper(updateById),
}