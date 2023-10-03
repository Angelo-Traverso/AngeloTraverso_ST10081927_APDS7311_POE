const Joi = require('joi')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: { type: String, unique: true },
        firstname: String,
        lastname: String,
        email: String,
        contactNumber: String,
        password: String
    }
)

const User = mongoose.model('User', userSchema)

function validateUser(user){
    const schema = Joi.object({
        username:Joi.string().min(3).max(50).required(),
        firstname:Joi.string().max(50).required(),
        lastname:Joi.string().max(50).required(),
        email:Joi.string().min(5).max(50).required(),           // Email added
        contactNumber:Joi.string().max(10).min(10).required(),  // Contact Number added
        password:Joi.string().min(3).max(50).required(),

    });
        return schema.validate(user);

}

module.exports = {User, validateUser}