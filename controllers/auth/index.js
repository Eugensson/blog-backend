const {googleAuth} = require("./googleAuth");
const {signUp} = require("./signUp");
const {signIn} = require("./signIn");
const {getCurrent} = require("./getCurrent");
const {signOut} = require("./signOut");
const {updateAvatar} = require("./updateAvatar");
const {refresh} = require("./refresh");

module.exports = {
    googleAuth,
    signUp,
    signIn,
    getCurrent,
    signOut,
    updateAvatar,
    refresh,
}