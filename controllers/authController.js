const userModel = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");
const { hashPassword, comparePassword } = require("../utils/hashPassword");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;

    let findUser = await userModel.findOne({ email: email });

    if (findUser) {
      req.flash("error", "You already have an account, please login.");
      return res.redirect("/");
    }

    let hash = await hashPassword(password);

    console.log(hash);

    let user = await userModel.create({
      email,
      password: hash,
      fullname,
    });

    let token = generateToken(user);
    res.cookie("token", token);
    req.flash("success", "User created successfully");
    res.redirect("/shop");
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });

    if (!user) {
      req.flash("error", "Email or Password incorrect");
      return res.redirect("/");
    }

    let result = await comparePassword(password, user.password);

    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      req.flash("error", "Email or Password incorrect");
      return res.redirect("/");
    }
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("token", "");
  req.flash("success", "Logout Successful");
  res.redirect("/");
};
