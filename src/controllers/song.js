const request = require("../helpers/request");
const pagination = require("../helpers/pagination");
const SongLister = require("../core/song/aplication/song_lister");
const SongRepository = require("../core/song/infrastructure/mysql_song_repository");
const SongFinder = require("../core/song/aplication/song_finder");
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
