const express = require("express");
const artist = require("../controllers/artist");
const album = require("../controllers/album");
const song = require("../controllers/song");
const routes = express.Router();
const auth = require("../controllers/auth");

routes.route("/").get(artist.list).post(auth.middleware, artist.create);
routes
  .route("/:id")
  .get(artist.read)
  .put(auth.middleware, artist.update)
  .delete(auth.middleware, artist.delete);
routes
  .route("/:id/albums")
  .get(album.listByArtist)
  .post(auth.middleware, album.create);
routes.route("/:id/songs").get(song.listByArtist);
routes.route("/:id/albums/:idAlbum").put(auth.middleware, album.update);

exports.routes = routes;
