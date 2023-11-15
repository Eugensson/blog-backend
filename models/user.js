const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const emailRegexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    token: {
        type: String,
        default: "",
    },
}, {versionKey: false, timestamps: true})

userSchema.post("save", handleMongooseError);

const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const signinSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const schemas = {
    signupSchema,
    signinSchema,
}

const User = model("user", userSchema);

module.exports = { User, schemas };