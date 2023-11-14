const {getAll} = require("./getAll");
const {getById} = require("./getById");
const {add} = require("./add");
const {updateById} = require("./updateById");
const {updateStatusPost} = require("./updateStatusPost");
const {deleteById} = require("./deleteById");

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    updateStatusPost,
    deleteById,
}