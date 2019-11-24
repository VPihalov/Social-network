const express = require("express");
const router = express.Router();
const auth = require('../../middlware/auth');
const User = require('../../models/User');

//@route 	Get api/auth
//@desc		Test route
//@access 	Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		res.status(500).send('Server error')
	}
});

module.exports = router