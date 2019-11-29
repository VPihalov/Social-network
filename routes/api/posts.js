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

//@route 	Get api/posts
//@desc		Get all posts
//@access 	Private
router.get("/", auth, async(req, res) => {
	try {
		const posts = await Post.find().populate('user', ['name', 'avatar']);
		res.json(posts)
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server Error")
	}
});

//@route 	Get api/posts/user/:user_id
//@desc		Get posts by user ID
//@access 	Private
router.get("/:post_id", auth, async(req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		chalk.red(`req.params`, post)
		if(!post) {
			return res.status(404).json({msg: "Post not found"})
		}
		res.json(post)
	} catch (error) {
		console.log(error.message);
		if(error.kind == ObjectId) {
			return res.status(400).json({msg: "Post not found"})
		}
		res.status(500).send("Server Error")
	}
});

//@route 	Delete api/posts/post_id	
//@desc		Delete post by id
//@access 	Private
router.delete("/:post_id", auth, async(req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if(post.user.toString() !== req.user.id) {
			return res.status(401).json({msg: 'User is not authorized'})
		} else {
			await post.remove();
			res.json({msg: "Post deleted"})
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server Error")
	}
});

module.exports = router