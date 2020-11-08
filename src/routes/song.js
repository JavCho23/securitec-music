const express = require("express");
const song = require("../controllers/song");
const auth = require("../controllers/auth");

const routes = express.Router();

routes.route("/").get(song.list);
routes.route("/:id").get(song.read).delete(auth.middleware, song.delete);

exports.routes = routes;
