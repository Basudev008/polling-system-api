const express = require("express");
const app = express();
const port = 10000;
const bodyParser = require("body-parser");
const db = require("./config/mongoose");

app.use(bodyParser.json());
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
    return;
  }

  console.log(`Server is running on port:${port}`);
});
