const express = require("express");
const router = express.Router();
const response = require("../responseFormat");
require("dotenv").config();

router.post("/register-user", (req, res) => {
  res.status(200).json(response(true, "Healthy", info.version));
});

router.post("/validate-user", (req, res) => {
  res.status(200).json(response(true, "Healthy", info.version));
});

module.exports = router;
