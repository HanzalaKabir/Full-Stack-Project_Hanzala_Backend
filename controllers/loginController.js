const User = require("../model/user.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const loginHandler = async (req, res) => {
  try {
    const user = await User.findOne({ number: req.body.number });
    if (!user) {
      return res.status(401).json({ message: "Incorrect Number" });
    }

    const decodedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decodedPassword !== req.body.password) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const { password, ...rest } = user._doc;
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN
    );

    res.json({ ...rest, accessToken });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = loginHandler;
// This code handles user login by verifying the user's phone number and password.
