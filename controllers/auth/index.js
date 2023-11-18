const {googleAuth} = require("./googleAuth");
const {signUp} = require("./signUp");
const {verifyEmail} = require("./verifyEmail");
const {resendVerifyEmail} = require("./resendVerifyEmail");
const {signIn} = require("./signIn");
const {getCurrent} = require("./getCurrent");
const {signOut} = require("./signOut");
const {updateAvatar} = require("./updateAvatar");
const {refresh} = require("./refresh");

module.exports = {
    googleAuth,
    signUp,
    verifyEmail,
    resendVerifyEmail,
    signIn,
    getCurrent,
    signOut,
    updateAvatar,
    refresh,
}