const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;

  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw HttpError(404, 'Not Found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({
    message: "Verification successful",
  });
};

module.exports = {
    verifyEmail: ctrlWrapper(verifyEmail),
}