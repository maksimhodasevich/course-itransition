const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const reg = require("./routes/api/reg");
const auth = require("./routes/api/auth");
const users = require("./routes/api/users");
const fanfiks = require("./routes/api/fanfiks");

const app = express();

app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/reg", reg);
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/fanfiks", fanfiks);
app.use("/api/fanfiks", fanfiks);

const port = 5000;

app.listen(port, () => console.log(`Server started on ${port}`));