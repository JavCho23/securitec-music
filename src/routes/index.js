const express = require("express");
const response = require("../helpers/response");
const artist = require("./artist");
const song = require("./song");
const album = require("./album");
const country = require("../controllers/country");
const auth = require("../controllers/auth");

const routes = express.Router();

routes.use(response.setHeadersForCORS);

routes.get("/", (_, res) => {
  res.status(200).json({ message: "Welcome to securitec music API" });
});

routes.post("/session", auth.login);
routes.get("/countries", country.list);
routes.use("/artists", artist.routes);
routes.use("/songs", song.routes);
routes.use("/albums", album.routes);

routes.use(function (_, res) {
  response.sendNotFound(res);
});

exports.index = routes;
