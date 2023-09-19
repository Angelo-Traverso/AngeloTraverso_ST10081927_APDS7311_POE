const router = require('express').Router();
const { User, validateUser } = require('../models/user');
const { hashPassword } = require('../utils/hash')
const auth = require('../middleware/auth')

// Create new user
router.post('/', async (req, res) => {

    const { error } = validateUser(req.body);

    if (error) return res.status(400).json(error.details[0].message)

    const isUnique = (await User.count({ username: req.body.username })) === 0;

    if (!isUnique)
        return res
            .status(400)
            .json({ error: 'The username or password is not valid' });

    try {
        const user = new User(req.body)
        user.password = await hashPassword(user.password)
        await user.save();
    } catch (err) {
        return res.status(500).json(err);
    }
    res.sendStatus(201);
})


// const express = require('express')
// const router = express.Router()
// const User = require('../models/user')

// router.post('/signup', (req, res) =>{
//     const user = new User(
//         {
//             username: req.body.username,
//             password: req.body.password
//         }
//     )

//     user.save()
//     res.status(201).json({
//         message: 'User created',
//         user:user
//     })

// })

// module.exports = router