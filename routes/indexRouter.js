const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedIn: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let success = req.flash("success");
  let products = await productModel.find();
  res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
  res.render("cart", { user, bill });
});

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.id);
  await user.save();

  req.flash("success", "Added to cart");
  res.redirect("/shop");
});

module.exports = router;
