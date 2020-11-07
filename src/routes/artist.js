const express = require("express");
const artist = require("../controllers/artist");
const album = require("../controllers/album");
const routes = express.Router();

routes.route("/").get(artist.list).post(artist.create);
routes.route("/:id").get(artist.read).put(artist.update).delete(artist.delete);
routes.route("/:id/albums").get(album.listByArtist);

exports.routes = routes;
