const express = require("express");
const router = express.Router();
const resMessage = require("../responseFormat");
const {
  getUserInfo,
  updateUser,
  deleteUser,
  getUserPassword,
  updateUserPassword,
} = require("../../db");
const { checkPassword, hashPassword } = require("./password");

router.get("/:id", async (req, res) => {
  // Get the user id.
  const { id } = req.params;

  console.log(`Requesting information for user ${id}.`);

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
    const { firstName, lastName, username, email, dateOfBirth, avatar } =
      await getUserInfo(id);
    res.status(200).json(
      resMessage(true, `User ${id} information sent.`, {
        firstName,
        lastName,
        username,
        email,
        dateOfBirth,
        avatar,
      })
    );
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

router.patch("/:id", async (req, res) => {
  // Get the user data.
  const { firstName, lastName, email, avatar } = req.body;
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

  console.log(`Request to update an existing user ${firstName}'s information.`);

  try {
    // Make sure all the required data exists.
    if (!firstName || !lastName || !email || !avatar)
      return res
        .status(400)
        .json(
          resMessage(
            false,
            `Insufficient information received. Please check the requirements of this api.`
          )
        );

    const result = await updateUser(id, firstName, lastName, email, avatar);
    res.status(200).json(resMessage(true, result));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

router.patch("/password/:id", async (req, res) => {
  // Get the user data.
  const { oldPassword, newPassword } = req.body;
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

  console.log(`Request to update an existing user ${id}'s password.`);

  try {
    // Make sure all the required data exists.
    if (!oldPassword || !newPassword)
      return res
        .status(400)
        .json(
          resMessage(
            false,
            `Insufficient information received. Please check the requirements of this api.`
          )
        );

    // Make sure the old password is valid.
    const storedPassword = await getUserPassword(id);
    const isSamePassword = await checkPassword(oldPassword, storedPassword);

    if (!isSamePassword)
      return res
        .status(403)
        .json(resMessage(false, `The old password passed is incorrect.`));

    // Hash the new password.
    const hashedPassword = await hashPassword(newPassword);

    const result = await updateUserPassword(id, hashedPassword);
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

  console.log(`Request to delete the user ${id}.`);
  try {
    const result = await deleteUser(id);
    res.status(200).json(resMessage(true, result));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

module.exports = router;
