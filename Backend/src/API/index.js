const express = require("express");
const router = express.Router();
const { healthCheck } = require("./get");

router.get("/", healthCheck);

module.exports = router;
