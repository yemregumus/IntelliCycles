const express = require("express");
const router = express.Router();
const resMessage = require("../responseFormat");
const { addNewUser, isUniqueUser, validateUser } = require("../../db");

router.post("/:id", async (req, res) => {
  // Get the user data.
  const { id } = req.params;

  try {
    // Validate the credentials.
    const { firstname, lastname, username } = await getUserInfo(id);

    res.status(200).json(resMessage(true, `User information sent.`, { firstname, lastname, username }));
  } catch (error) {
    res.status(500).json(resMessage(false, error));
  }
});

module.exports = router;
