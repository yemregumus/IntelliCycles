const express = require("express");
const router = express.Router();
const resMessage = require("../responseFormat");
const { getUserInfo, deleteUser } = require("../../db");

router.get("/:id", async (req, res) => {
  // Get the user id.
  const { id } = req.params;

  console.log(`Requesting information for user ${id}.`);

  try {
    // Get user information.
    const { firstName, lastName, username, dateOfBirth, avatar } =
      await getUserInfo(id);

    res.status(200).json(
      resMessage(true, `User ${id} information sent.`, {
        firstname,
        lastname,
        username,
        dateOfBirth,
        avatar,
      })
    );
  } catch (error) {
    res.status(500).json(resMessage(false, error));
  }
});

router.delete("/:id", async (req, res) => {
  // Get the user id.
  const { id } = req.params;
  console.log(`Request to delete the user ${id}.`);
  try {
    const result = await deleteUser(id);
    res.status(200).json(resMessage(true, result));
  } catch (error) {
    res.status(500).json(resMessage(false, error));
  }
});

module.exports = router;
