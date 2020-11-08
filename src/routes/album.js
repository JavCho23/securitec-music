const express = require("express");
const album = require("../controllers/album");
const song = require("../controllers/song");
const auth = require("../controllers/auth");

const routes = express.Router();

routes.route("/").get(album.list);
routes.route("/:id").get(album.read).delete(auth.middleware, album.delete);
routes
  .route("/:id/songs")
  .get(song.listByAlbum)
  .post(auth.middleware, song.create);
routes.route("/:id/songs/:idSong").put(auth.middleware, song.update);

exports.routes = routes;
