const express = require("express");
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require("express-validator");
const User = require("../../models/User")

//@route 	Post api/users
//@desc		Register user
//@access 	Public
router.post('/', [
	check('name', 'Name is required')
	.not()
	.isEmpty(),
	check('email', "Input valid email").isEmail(),
	check('password', "Input password with 6 or more charactes").isLength({min: 6})
],  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
	chalk.red('User', User)

    const { name, email, password } = req.body;

    try {
	  let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;