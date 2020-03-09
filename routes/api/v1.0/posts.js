const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../../middlware/auth');
const User = require('../../../models/User');
const Post = require('../../../models/Post');

//@route 	POST api/posts
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

//@route 	GET api/posts
//@desc		GET all posts
//@access 	Private
router.get("/", auth, async(req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts)
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server Error")
	}
});

//@route 	GET api/posts/user/:user_id
//@desc		GET posts by user ID
//@access 	Private
router.get("/:post_id", auth, async(req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
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

//@route 	DELETE api/posts/post_id	
//@desc		DELETE post by id
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

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });
	 await post.save();
	 res.json(post.likes);
	 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Like a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route 	POST api/posts/comments/:post_id
//@desc		Comment post route
//@access 	Private
router.post('/comments/:post_id', [auth, [
	check('text', 'Text is required').not().isEmpty(),
]], async (req, res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {	
		res.status(400).json({errors: errors.array()})
	}
	try {
		const post = await Post.findById(req.params.post_id);
		const user = await User.findById(req.user.id);
		const newComment = {
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: req.user.id
		};
		post.comments.unshift(newComment);
		await post.save();
		res.send(post)
	} catch (error) {
		console.log(error);
		res.status(500).send({msg: "Server error"})
	}
});

//@route 	DELETE api/posts/comments/:post_id/:comment_id
//@desc		Delete post route
//@access 	Private
router.delete('/comments/:post_id/:comment_id', auth, async(req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		const comment = post.comments.find(item => item.id === req.params.comment_id);
		
		if(!comment) {
			return res.status(404).send({msg: "Comment does not exist"})
		}
		if(comment.user.toString() !== req.user.id) {
			return res.status(401).send({msg: "This comment does not belong to the current user"})
		}
		const removeIndex = post.comments.findIndex(item => item.id === req.params.comment_id);
		post.comments.splice(removeIndex, 1);
		await post.save();
		res.send(post.comments)

	} catch (error) {
		console.log(error);
		res.status(500).send({msg: "Server error"})
	}
})

module.exports = router