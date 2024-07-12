const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/ecommerce`)
  .then(function () {
    dbgr("Connected to Database");
  })
  .catch(function (err) {
    dbgr(`Error connecting to database : ${err}`);
  });

module.exports = mongoose.connection;
