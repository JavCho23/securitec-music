const express = require("express");
const song = require("../controllers/song");
const routes = express.Router();

routes.route("/").get(song.list);
routes.route("/:id").get(song.read);

exports.routes = routes;
