const express = require("express");
const router = express.Router();
const resMessage = require("./responseFormat");
const info = require("../../package.json");
const { pool, dbHealthCheck } = require("../db");

router.use("/api", require("./api"));

// GET Routes.
router.get("/", async (req, res) => {
  try {
    console.log("Backend Health Check", info.version);
    const _dbHealthCheck = await dbHealthCheck();
    console.log("Healthy DB", _dbHealthCheck);
    res.setHeader("Cache-Control", "no-cache");
    res
      .status(200)
      .json(
        resMessage(true, "Healthy", {
          Version: info.version,
          DB: _dbHealthCheck,
        })
      );
  } catch (error) {
    res.status(500).json(resMessage(false, "Error while health check."));
    console.error("Error while health check.", err);
  }
});

// POST Routes.
router.use((req, res) =>
  res.status(404).json(resMessage(false, "Route does not exist.", null))
);

module.exports = router;
