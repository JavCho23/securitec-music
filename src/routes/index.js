const express = require("express");
const response = require("../helpers/response");
const artist = require("./artist");
const song = require("./song");

const routes = express.Router();

routes.use(response.setHeadersForCORS);

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to securitec music API" });
});

routes.use("/artists", artist.routes);
routes.use("/songs", song.routes);

routes.use(function (req, res) {
  response.sendNotFound(res);
});

exports.index = routes;
