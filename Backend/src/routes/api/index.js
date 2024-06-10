const express = require("express");
const router = express.Router();
require("dotenv").config();

// Authentication APIs
router.use("/auth", require("./auth"));

// User Information APIs.
router.use("/user", require("./user"));

// Membership APIs.
router.use("/membership", require("./membership"));

module.exports = router;
