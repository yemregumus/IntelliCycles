const express = require("express");
const router = express.Router();
const resMessage = require("../responseFormat");
const { getUserInfo } = require("../../db");

router.get("/:id", async (req, res) => {
  // Get the user id.
  const { id } = req.params;

  try {
    // Get user information.
    const { firstname, lastname, username } = await getUserInfo(id);

    res.status(200).json(
      resMessage(true, `User ${id} information sent.`, {
        firstname,
        lastname,
        username,
      })
    );
  } catch (error) {
    res.status(500).json(resMessage(false, error));
  }
});

module.exports = router;
