const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const FollowerModel = require("../models/FollowerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
    // console.log(req.userId)
	const userId  = req.userId;
	try {
        const user = await UserModel.findById(userId);
        // console.log(userId,"om")
        
		const userFollowStates = await FollowerModel.findOne({ user: userId });
		return res.status(200).json({ user, userFollowStates });
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error ");
	}
});

router.post("/", async (req, res) => {
	console.log(req.body.user);

	const { email, password } = req.body.user;

	if (!isEmail(email)) return res.status(401).send("Invalid Email");

	// if (password.length < 6) {
	// 	return res.status(401).send("Password must be atleast 6 characters");
	// }

	try {
		console.log("req.body ll");
		console.log(email, password); 
		const user = await UserModel.findOne({ email: email }).select("+password");
		console.log(user);
		if (!user) {
			return res.status(401).send("Invalid Credentials");
		}

		const isPassword = await bcrypt.compare(password, user.password);
		if (!isPassword) {
			return res.status(401).send("Invalid Credentials");
		}

		const payload = { userId: user._id };
		jwt.sign(
			payload,
			process.env.jwtSecret,
			{ expiresIn: "2d" },
			(err, token) => {
				if (err) throw err;
				res.status(200).json(token);
			}
		);
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
});

module.exports = router;
