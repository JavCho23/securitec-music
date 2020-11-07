const express = require("express");
const artist = require("../controllers/artist");
const routes = express.Router();

routes.route("/").get(artist.list).post(artist.create);
routes.route("/:name").get(artist.read).put(artist.update);

exports.routes = routes;
