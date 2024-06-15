const express = require("express");
const router = express.Router();
const { passport } = require("../../jwt");
require("dotenv").config();

// Authentication APIs
router.use("/auth", require("./auth"));

// User Information APIs.
router.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  require("./user")
);

// Membership APIs.
router.use(
  "/membership",
  passport.authenticate("jwt", { session: false }),
  require("./membership")
);

// Task APIs
router.use("/tasks", require("./tasks"));

module.exports = router;
