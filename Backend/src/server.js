const app = require("./app");
require("dotenv").config();
const { createTables } = require("./db");

const PORT = process.env.PORT;

if (!PORT) throw err("PORT not provided.");

app.listen(PORT, async () => {
  // Create all the required tables.
  try {
    await createTables();
    console.log(`Server started on PORT: ${PORT}`);
  } catch (error) {
    console.log(`Could not start the server. ${error}`);
  }
});
