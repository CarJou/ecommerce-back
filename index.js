const express = require("express");
const conectDB = require("./config/db");
//create server
const app = express();

//database
conectDB();

app.use(express.json({ extended: true }));

//puerto app
const PORT = process.env.PORT || 4000;

//routes
app.use("/api/users", require("./routes/users"));

app.listen(PORT, () => {
  console.log(`The server is working in port ${PORT}`);
});
