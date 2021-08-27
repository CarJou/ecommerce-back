const express = require("express");
const conectDB = require("./config/db");
//create server
const app = express();
//database
conectDB();
//puerto app
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`The server is working in port ${PORT}`);
});
