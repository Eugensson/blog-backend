const { Post } = require("../../models");

const {HttpError, ctrlWrapper} = require("../../helpers");

const deleteById = async (req, res) => {    
    const {postId} = req.params;
    const result = await Post.findByIdAndDelete(postId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(204).send();    
}

module.exports = {
    deleteById: ctrlWrapper(deleteById),
}