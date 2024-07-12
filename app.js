const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");
const adminsRouter = require("./routes/adminsRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/indexRouter");

require("dotenv").config();

const db = require("./config/mongoose-connection");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

app.use(flash());

app.use("/", indexRouter);
app.use("/admins", adminsRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000, (err, res) => {
  console.log("Listening on PORT 3000");
});
