const router = require('express').Router();
const { User, validateUser } = require('../models/user');
const { hashPassword } = require('../utils/hash')
const auth = require('../middleware/auth')

// Create new user
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const isUnique = (await User.count({ username: req.body.username })) === 0;
    if (!isUnique) {
        return res.status(400).json({ error: 'The username or password is not valid' });
    }

    try {
        const user = new User(req.body);
        user.password = await hashPassword(user.password);
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Get current user details
router.get('/', auth, async (req, res) => {
    res.send({currentUser: req.user});
});

module.exports = router;