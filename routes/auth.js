const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");





router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, message: "Login successful", token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;