const express = require("express");
const router = express.Router();
const resMessage = require("../responseFormat");
const { getMembershipInfo, updateMembership } = require("../../db");

router.get("/:id", async (req, res) => {
  // Get the user id.
  const { id } = req.params;

  console.log(`Requesting the membership information for user ${id}.`);

  try {
    if (!id)
      return res
        .status(400)
        .json(
          resMessage(
            false,
            `Insufficient information received. Please check the requirements of this api.`
          )
        );

    // Get user information.
    const membershiptype = await getMembershipInfo(id);
    res.status(200).json(
      resMessage(true, `User ${id} membership information sent.`, {
        membershiptype,
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

  console.log(
    `Request to delete an existing user ${id}'s membership information.`
  );

  try {
    await updateMembership(id, "Free");
    res.status(200).json(resMessage(true, `${id}'s membership is deleted.`));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

module.exports = router;
