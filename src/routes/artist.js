const express = require("express");
const artist = require("../controllers/artist");
const routes = express.Router();

routes.route("/").get(artist.list);
routes.route("/:name").get(artist.read);

exports.routes = routes;
