const express = require("express");
const song = require("../controllers/song");
const routes = express.Router();

routes.route("/").get(song.list);

exports.routes = routes;
