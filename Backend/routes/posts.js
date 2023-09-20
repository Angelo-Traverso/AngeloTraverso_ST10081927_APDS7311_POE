const router = require('express').Router();
const auth = require('../middleware/auth');
const { Post, validatePost } = require('../models/post')

// Get all posts
router.get('/', auth, async (req, res) => {
    const posts = await Post.find()
    res.send(posts);
});

// Create new post
router.post('/', auth, async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const post = new Post(req.body);
    post.save();
    res.send(post);
});

// Get a single post
router.get('/:id', auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) return res.send(post)
    res.sendStatus(404);
})

// Delete a single post
router.delete('/:id', auth, async (req, res) => {
    const result = await Post.deleteOne({ _id: req.params.id });
    res.send(result);
});

module.exports = router;