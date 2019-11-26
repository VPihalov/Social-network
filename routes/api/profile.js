const express = require("express");
const router = express.Router();
const auth = require('../../middlware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

//@route 	Get api/profile/me
//@desc		Get current users profile
//@access 	Private
router.get('/me', auth, async (req, res) => {
	console.log(`req.body: `, req.body)
	try {
		const profile = await Profile.findOne({user: req.user.id})
			.populate('user', ['name', 'avatar']);
		if(!profile) {
			res.status(400).json({msg: "There is no profile  for this user"})
		}
		res.json(profile)

	} catch (error) {
		chalk.error(error)
		res.status(500).send('Server error')
	}
});

//@route 	Post api/profile
//@desc		create and update users profile
//@access 	Private
router.post('/', [auth, [
	check('status', 'Status is required').not().isEmpty(),
	check('skills', 'Status is required').not().isEmpty(),
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
			githubsurname,
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
		if(githubsurname) profileFields.githubsurname = githubsurname;
		if(skills) profileFields.skills = skills.split(',').map(skill => skill.trim());
		console.log(`profileFields: `, profileFields);
		res.send("Hello")
})

module.exports = router