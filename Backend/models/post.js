const Joi = require('joi')
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority: String,
    status: String,
    departmentcode: String,
    createdAt: {type: Date, default: Date.now}, // If a creation date is not provided. Use todays' date

});

const Post = mongoose.model('Post', postSchema);

function validatePost(post){
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required,
        description:Joi.string().min(3).max(50).required(),
        priority:Joi.string().min(3).max(6).required(),         // Min: low - max: medium
        status:Joi.string().min(4).max(11).required(),          // open, in progress, closed
        departmentCode:Joi.string().min(3).max(50).required(),
    });

    return schema.validate(post);

}

module.exports = {Post, validatePost}