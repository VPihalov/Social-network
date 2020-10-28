const express = require("express");
const router = express.Router();
const auth = require('../../../middlware/auth');
const config = require('config');
const request = require('request');
const Profile = require('../../../models/Profile');
const User = require('../../../models/User');
const Post = require('../../../models/Post');
const { check, validationResult } = require('express-validator');

//@route 	GET api/profile/me
//@desc		Get current users profile
//@access 	Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({user: req.user.id})
			.populate('user', ['name', 'avatar']);
		if(!profile) {
			res.status(400).json({msg: "There is no profile  for this user"});
			return
		}
		res.json(profile)
	} catch (error) {
		console.log(error)
		res.status(404).send('Resourse not found')
	}
});

//@route 	POST api/profile
//@desc		create and update users profile
//@access 	Private
router.post('/', 
[auth, [
	check('status', 'Status is required').not().isEmpty(),
	check('skills', 'Skills is required').not().isEmpty()
]], 
    async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({errors: errors.array()})
		}
		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin
		} = req.body;

		//Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if(company) profileFields.company = company;
		if(website) profileFields.website = website;
		if(location) profileFields.location = location;
		if(bio) profileFields.bio = bio;
		if(status) profileFields.status = status;
		if(githubusername) profileFields.githubusername = githubusername;
		if(skills) profileFields.skills = skills.split(',').map(skill => skill.trim());

		//Build social object
		profileFields.social = {};
		if(youtube) profileFields.social.youtube = youtube;
		if(twitter) profileFields.social.twitter = twitter;
		if(facebook) profileFields.social.facebook = facebook;
		if(instagram) profileFields.social.instagram = instagram;
		if(linkedin) profileFields.social.linkedin = linkedin;

		try {
			let profile = await Profile.findOne({user: req.user.id});
			//Update profile
			if(profile) {
				profile = await Profile.findOneAndUpdate(
					{user: req.user.id},
					{$set: profileFields},
					{new: true,
					 useFindAndModify: false}
				)
				return res.json(profile)
			};
			//Create profile
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (error) {
			console.log(error);
			res.status(404).send('Resourse not found')
		}
});

//@route 	GET api/profiles
//@desc		Get all profiles
//@access 	Public
router.get("/", async(req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles)
	} catch (error) {
		console.log(error.message);
		res.status(404).send('Resourse not found')
	}
});

//@route 	GET api/profile/user/:user_id
//@desc		Get profile by user ID
//@access 	Public
router.get("/user/:user_id", async(req, res) => {
	// console.log(`req.params:`, req.params)
	try {
		const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
		if(!profile) {
			return res.status(400).json({msg: "Profile not found"})
		}
		res.json(profile)
	} catch (error) {
		console.log(error.message);
		if(error.kind == ObjectId) {
			return res.status(400).json({msg: "Profile not found"})
		}
		res.status(404).send('Resourse not found')
	}
});

//@route 	DELETE api/profile
//@desc		Delete profile, user & posts
//@access 	Private
router.delete("/", auth, async(req, res) => {
	try {
		//Remove profile
		await Profile.findOneAndRemove({user: req.user.id});
		//Remove user
		await User.findOneAndRemove({_id: req.user.id});
		//Remove posts
		await Post.deleteMany({user: req.user.id})
		res.json({msg: "User deleted"})
	} catch (error) {
		console.log(error.message);
		res.status(404).send('Resourse not found')
	}
});

//@route 	PUT api/profile/experience
//@desc		Add profile experience
//@access 	Private
router.put("/experience", [auth, [
	check('title', 'Title is required').not().isEmpty(),
	check('company', 'Company is required').not().isEmpty(),
	check('from', 'From date is required').not().isEmpty(),
]], async (req, res) => {
	const errors = validationResult(req);
	if(!errors) {
		return res.status(400).json({errors: errors.array()});
	}

	const {
		title,
		company,
		location,
		from,
		to,
		current,
		description 
	} = req.body;

	const newExp = {
		title,
		company,
		location,
		from,
		to,
		current,
		description 
	}

	try {
		const profile = await Profile.findOne({user: req.user.id});
		profile.experience.unshift(newExp);
		await profile.save();
		res.json(profile)
	} catch (error) {
		console.log(error);
		res.status(404).send('Resourse not found')
	}
});

//@route 	DELETE api/profile/experience/:exp_id
//@desc		Delete experience from profile
//@access 	Private
router.delete('/experience/:exp_id', auth, async(req, res) => {
	try {
		const profile = await Profile.findOne({user: req.user.id});
		const removeIndex = profile.experience
			.map(item => item.id)
			.indexOf(req.params.exp_id);
		profile.experience.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(404).send('Resourse not found')
	}
});

//@route 	PUT api/profile/education
//@desc		Add profile education
//@access 	Private
router.put("/education", [auth, [
	check('school', 'School is required').not().isEmpty(),
	check('degree', 'Degree is required').not().isEmpty(),
	check('fieldOfStudy', 'fieldOfStudy date is required').not().isEmpty(),
	check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
	const errors = validationResult(req);
	if(!errors) {
		return res.status(400).json({errors: errors.array()});
	}

	const {
		school,
		degree,
		fieldOfStudy,
		from,
		to,
		description 
	} = req.body;

	const newEdu = {
		school,
		degree,
		fieldOfStudy,
		from,
		to,
		description 
	}

	try {
		const profile = await Profile.findOne({user: req.user.id});
		profile.education.unshift(newEdu);
		await profile.save();
		res.json(profile)
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error")
	}
});

//@route 	DELETE api/profile/education/:edu_id
//@desc		DELETE education from profile
//@access 	Private
router.delete('/education/:edu_id', auth, async(req, res) => {
	try {
		const profile = await Profile.findOne({user: req.user.id});
		const removeIndex = profile.education
			.map(item => item.id)
			.indexOf(req.params.edu_id);
		profile.education.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error")
	}
});

//@route 	GET api/profile/git/:username
//@desc		GET user repos from Github
//@access 	Public
router.get('/github/:username', (req, res) => {
	try {
		const options =  {
			uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
			method: 'GET',
			headers: {'user-agent': 'node.js'}
		};
		request(options, (error, response, body) => {
			console.log(`options`, options)
			if(error) console.log(error);
			if(response.statusCode !== 200) {
				return res.status(404).json({msg: 'No Github profile found'})
			}
			res.json(JSON.parse(body))

		})
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error")
	}
})


module.exports = router