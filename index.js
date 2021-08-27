const express = require("express");

//create server
const app = express();
//puerto app
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`The server is working in port ${PORT}`);
});
