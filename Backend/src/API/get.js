const response = require("./responseFormat");
const info = require("../../package.json");

const healthCheck = (req, res) =>
  res.status(200).json(response(true, "Healthy", info.version));

module.exports = { healthCheck };
