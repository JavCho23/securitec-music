const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config.json");
const routes = require("./routes/index");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1", routes.index);
app.get("/", (_, res) => {
  res.status(200).json({
    message:
      "Welcome to securitec music API, to use the api please go to /api/v1",
  });
});

const port = process.env.PORT || config.server.port;
app.listen(port);
console.log("API securitec music is running on  http://localhost:" + port);

exports.app = app;
