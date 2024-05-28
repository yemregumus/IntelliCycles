const express = require("express");
const router = express.Router();
const { resMessage } = require("./responseFormat");
const info = require("../../package.json");
const pool = require("../db");

router.use("/api", require("./api"));

// Temp test route
router.get("/test", async (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS sample_table (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      age INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log("Table created successfully.");
    res.status(200).json(resMessage(true, "Table Created"));
  } catch (err) {
    res.status(500).json(resMessage(false, "Error while creating table."));
    console.error("Error creating table:", err);
  }
});

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
