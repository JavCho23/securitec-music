const express = require("express");
const album = require("../controllers/album");
const song = require("../controllers/song");
const routes = express.Router();

routes.route("/").get(album.list);
routes.route("/:id").get(album.read).delete(album.delete);
routes.route("/:id/songs").get(song.listByAlbum).post(song.create);
routes.route("/:id/songs/:idSong").put(song.update);

exports.routes = routes;
