const express = require("express");
const router = express.Router();
const { resMessage } = require("./responseFormat");
const info = require("../../package.json");

router.use("/api", require("./api"));

// GET Routes.
router.get("/", (req, res) => {
  console.log("Health Check", info.version);
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).json(resMessage(true, "Healthy", info.version));
});

// POST Routes.
router.use((req, res) =>
  res.status(404).json(resMessage(false, "Route does not exist.", null))
);

module.exports = router;
