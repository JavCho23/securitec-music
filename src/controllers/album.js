const request = require("../helpers/request");
const pagination = require("../helpers/pagination");
const AlbumLister = require("../core/album/aplication/album_lister");
const AlbumRepository = require("../core/album/infrastructure/mysql_album_repository");
const AlbumListerByArtist = require("../core/album/aplication/album_lister_by_artist");
const AlbumFinder = require("../core/album/aplication/album_finder");
const AlbumCreator = require("../core/album/aplication/album_creator");
const Album = require("../core/album/domain/album");
exports.list = async function (req, res) {
  try {
    const albumLister = new AlbumLister(new AlbumRepository());
    const params = request.getFilteringOptions(req, ["search"]);
    const options = pagination.getPaginationOptions(req);
    const albums = await albumLister.call(
      options.page,
      options.limit,
      params.search ? params.search : ""
    );
    pagination.setPaginationHeaders(res, {
      page: options.page,
      limit: options.limit,
    });
    res.json(albums.map((album) => album.toJson()));
  } catch (error) {
    res.status(error.responseCode).json({ message: error.message });
  }
};
exports.listByArtist = async function (req, res) {
  try {
    const albumLister = new AlbumListerByArtist(new AlbumRepository());
    const options = pagination.getPaginationOptions(req);
    const albums = await albumLister.call(
      options.page,
      options.limit,
      req.params.id
    );
    pagination.setPaginationHeaders(res, {
      page: options.page,
      limit: options.limit,
    });
    res.json(albums.map((album) => album.toJson()));
  } catch (error) {
    res.status(error.responseCode).json({ message: error.message });
  }
};

exports.read = async function (req, res) {
  try {
    const albumFinder = new AlbumFinder(new AlbumRepository());
    const album = await albumFinder.call(req.params.id);
    res.json(album.toJson());
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};

exports.create = async function (req, res) {
  try {
    const albumCreator = new AlbumCreator(new AlbumRepository());
    const album = await albumCreator.call(
      new Album(
        0,
        req.body.name,
        req.body.description,
        req.body.coverPage,
        req.body.year,
        req.params.id
      )
    );
    res.status(201).json(album.toJson());
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};
