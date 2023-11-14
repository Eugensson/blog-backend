const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: true }
)

postSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

const Post = model("post", postSchema);

module.exports = { Post, schemas };