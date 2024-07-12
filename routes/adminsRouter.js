const express = require("express");
const router = express.Router();
const adminModel = require("../models/admin-model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", (req, res) => {
    adminModel.create;
  });
}

router.get("/", (req, res) => {
  res.send("hey it's working owners");
});

router.get("/owner", function (req, res) {
  let success = req.flash("success");
  res.render("createProducts", { success });
});

module.exports = router;
