const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator")

//@route 	Post api/users
//@desc		Register user
//@access 	Public
router.post('/', [
	check('name', 'Name is required')
	.not()
	.isEmpty(),
	check('email', "Input valid email").isEmail(),
	check('password', "Input password with 6 or more charactes").isLength({min: 6})
], (req, res) => {
	console.log(`req.body:`, req.body);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		 return res.status(400).json({errors: errors.array()})
	};
	res.send("users route")
});

module.exports = router