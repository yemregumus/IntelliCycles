const express = require("express");
const router = express.Router();
const resMessage = require("../responseFormat");
const {
  getMembershipInfo,
  updateMembership,
  getUserInfo,
} = require("../../db");

router.get("/:id", async (req, res) => {
  // Get the user id.
  const { id } = req.params;

  console.log(`Requesting the membership information for user ${id}.`);

  if (!id)
    return res
      .status(400)
      .json(
        resMessage(
          false,
          `Insufficient information received. Please check the requirements of this api.`
        )
      );

  try {
    // Make sure the user id is valid.
    await getUserInfo(id);
  } catch (error) {
    return res
      .status(400)
      .json(resMessage(false, `Invalid user id. No user found with id ${id}.`));
  }

  try {
    // Get user information.
    const membershipType = await getMembershipInfo(id);
    res.status(200).json(
      resMessage(true, `User ${id} membership information sent.`, {
        membershipType,
      })
    );
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

router.post("/:id", async (req, res) => {
  // Get the user data.
  const { membershipType } = req.body;
  // Get the user id.
  const { id } = req.params;

  if (!id || !membershipType)
    return res
      .status(400)
      .json(
        resMessage(
          false,
          `Insufficient information received. Please check the requirements of this api.`
        )
      );

  try {
    // Make sure the user id is valid.
    await getUserInfo(id);
  } catch (error) {
    return res
      .status(400)
      .json(resMessage(false, `Invalid user id. No user found with id ${id}.`));
  }

  console.log(
    `Request to update an existing user ${id}'s membership information.`
  );

  try {
    const result = await updateMembership(id, membershipType);
    res.status(200).json(resMessage(true, result));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

router.delete("/:id", async (req, res) => {
  // Get the user id.
  const { id } = req.params;

  if (!id)
    return res
      .status(400)
      .json(
        resMessage(
          false,
          `Insufficient information received. Please check the requirements of this api.`
        )
      );

  try {
    // Make sure the user id is valid.
    await getUserInfo(id);
  } catch (error) {
    return res
      .status(400)
      .json(resMessage(false, `Invalid user id. No user found with id ${id}.`));
  }

  console.log(
    `Request to delete an existing user ${id}'s membership information.`
  );

  try {
    await updateMembership(id, "free");
    res.status(200).json(resMessage(true, `${id}'s membership is deleted.`));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

module.exports = router;
