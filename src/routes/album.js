const express = require("express");
const album = require("../controllers/album");
const routes = express.Router();

routes.route("/").get(album.list);
routes.route("/:id").get(album.read).delete(album.delete);

exports.routes = routes;
