const express = require("express");
const router = express.Router();
const auth = require('../../middlware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route 	Get api/profile/me
//@desc		Get current users profile
//@access 	Private
router.get('/me', /*auth,*/ async (req, res) => {
	console.log(`req.body: `, req.body)
	try {
		const profile = await Profile.findOne({user: req.user.id})
			.populate('user', ['name', 'avatar']);
		if(!profile) {
			res.status(400).json({msg: "There is no profile  for this user"})
		}
		let a;

	} catch (error) {
		chalk.error(error)
		res.status(500).send('Server error')
	}
});

module.exports = router