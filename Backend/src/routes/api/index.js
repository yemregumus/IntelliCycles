const express = require("express");
const router = express.Router();
require("dotenv").config();

// Authentication APIs
router.use("/auth", require("./auth"));

// User Information APIs.

module.exports = router;
