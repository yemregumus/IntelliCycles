const pool = require("./db");

const getMembershipInfo = (id) => {
  return new Promise((resolve, reject) => {
    const getMembershipInfoQuery = `
      SELECT membershiptype
      FROM membership 
      WHERE userid=${id};
      `;
    pool
      .query(getMembershipInfoQuery)
      .then((result) => {
        if (!result.rowCount) reject(new Error(`No user found with id ${id}.`));
        const { membershiptype } = result.rows[0];
        resolve(membershiptype);
      })
      .catch((error) =>
        reject(new Error(`Database error while getting user info. ${error}`))
      );
  });
};

const addNewMembership = (id) => {
  return new Promise((resolve, reject) => {
    const addMembershipQuery = `
          INSERT INTO membership (userid, membershiptype)
          VALUES ($1, $2);
          `;
    pool
      .query(addMembershipQuery, [id, "free"])
      .then((result) => {
        if (!result.rowCount)
          reject(new Error(`User ${id} already has a membership.`));
        resolve(`${id}'s membership is added.`);
      })
      .catch((error) => {
        reject(
          new Error(`Database error while adding ${id}'s membership. ${error}`)
        );
      });
  });
};

const updateMembership = (id, membershipType) => {
  return new Promise((resolve, reject) => {
    const updateMembershipQuery = `
          UPDATE membership
          SET membershiptype = $1
          WHERE userid = $2;
          `;
    pool
      .query(updateMembershipQuery, [membershipType, id])
      .then((result) => {
        if (!result.rowCount) reject(new Error(`No user found with id ${id}.`));
        resolve(`${id}'s membership is updated.`);
      })
      .catch((error) => {
        reject(
          new Error(
            `Database error while updathing ${id}'s membership. ${error}`
          )
        );
      });
  });
};

module.exports = { getMembershipInfo, updateMembership, addNewMembership };
