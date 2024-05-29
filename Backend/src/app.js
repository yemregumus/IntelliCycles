const express = require("express");
const cors = require("cors");
const { passport } = require("./jwt");

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/", require("./routes"));

module.exports = app;
