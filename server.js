require("dotenv").config();

const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// src folder as root
app.use(express.static('src'));

// access to node_modules folder
app.use("/scripts", express.static(`${__dirname}/node_modules/`));

app.listen(port, () => {
  console.log("listening on %d", port);
});
