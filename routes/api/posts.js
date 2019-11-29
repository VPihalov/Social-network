const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middlware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');

//@route 	Post api/posts
//@desc		Create post route
//@access 	Private
router.post('/', [auth, [
	check('text', 'Text is required').not().isEmpty(),
]], async (req, res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {	
		res.status(400).json({errors: errors.array()})
	}
	try {
		const user = await User.findById(req.user.id);
		chalk.red('user:',  user)
		const newPost = new Post({
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: req.user.id
		});
		const post = await newPost.save();
		res.send(post)
	} catch (error) {
		console.log(error);
		res.status(500).send({msg: "Server error"})
	}
});

module.exports = router