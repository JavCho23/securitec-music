const express = require("express");
const album = require("../controllers/album");
const routes = express.Router();

routes.route("/").get(album.list);

exports.routes = routes;
