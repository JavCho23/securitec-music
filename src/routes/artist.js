const express = require("express");
const artist = require("../controllers/artist");
const routes = express.Router();

routes.route("/").get(artist.list).post(artist.create);
routes.route("/:id").get(artist.read).put(artist.update).delete(artist.delete);

exports.routes = routes;
