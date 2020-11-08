const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config.json");
const routes = require("./routes/index");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1", routes.index);

const port = process.env.PORT || config.server.port;
app.listen(port);
console.log("API securitec music is running on  http://localhost:" + port);

exports.app = app;
