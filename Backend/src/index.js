const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT;

if (!PORT) throw err("PORT not provided");

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
