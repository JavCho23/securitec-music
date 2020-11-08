const express = require("express");
const song = require("../controllers/song");
const routes = express.Router();

routes.route("/").get(song.list);
routes.route("/:id").get(song.read).delete(song.delete);

exports.routes = routes;
