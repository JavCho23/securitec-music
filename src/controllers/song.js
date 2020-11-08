const request = require("../helpers/request");
const pagination = require("../helpers/pagination");
const SongLister = require("../core/song/aplication/song_lister");
const SongRepository = require("../core/song/infrastructure/mysql_song_repository");
const SongFinder = require("../core/song/aplication/song_finder");
const SongCreator = require("../core/song/aplication/song_creator");
const Song = require("../core/song/domain/song");
const SongListerByArtist = require("../core/song/aplication/song_lister_by_artist");
const SongListerByAlbum = require("../core/song/aplication/song_lister_by_album");
exports.list = async function (req, res) {
  try {
    const songLister = new SongLister(new SongRepository());
    const options = pagination.getPaginationOptions(req);
    const params = request.getFilteringOptions(req, ["search"]);
    const songs = await songLister.call(
      options.page,
      options.limit,
      params.search ? params.search : ""
    );
    pagination.setPaginationHeaders(res, {
      page: options.page,
      limit: options.limit,
    });
    res.json(songs.map((song) => song.toJson()));
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};
exports.listByArtist = async function (req, res) {
  try {
    const songLister = new SongListerByArtist(new SongRepository());
    const options = pagination.getPaginationOptions(req);
    const songs = await songLister.call(
      options.page,
      options.limit,
      req.params.id
    );
    pagination.setPaginationHeaders(res, {
      page: options.page,
      limit: options.limit,
    });
    res.json(songs.map((song) => song.toJson()));
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};
exports.listByAlbum = async function (req, res) {
  try {
    const songLister = new SongListerByAlbum(new SongRepository());
    const options = pagination.getPaginationOptions(req);
    const songs = await songLister.call(
      options.page,
      options.limit,
      req.params.id
    );
    pagination.setPaginationHeaders(res, {
      page: options.page,
      limit: options.limit,
    });
    res.json(songs.map((song) => song.toJson()));
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};

exports.read = async function (req, res) {
  try {
    const songFinder = new SongFinder(new SongRepository());
    const song = await songFinder.call(req.params.id);
    res.json(song.toJson());
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};
exports.create = async function (req, res) {
  try {
    const songCreator = new SongCreator(new SongRepository());
    const song = await songCreator.call(
      new Song(0, req.body.name, req.body.duration, req.params.id)
    );
    res.status(201).json(song.toJson());
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};
