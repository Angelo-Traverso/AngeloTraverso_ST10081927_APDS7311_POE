const Joi = require('joi')
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    departmentcode: String,

});

const Post = mongoose.model('Post', postSchema);

function validatePost(post){
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required,
        description:Joi.string().min(3).max(50).required(),
        departmentCode:Joi.string().min(3).max(50).required(),
    });

    return schema.validate(post);

}

module.exports = {Post, validatePost}