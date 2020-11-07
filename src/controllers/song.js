const request = require("../helpers/request");
const pagination = require("../helpers/pagination");
const SongLister = require("../core/song/aplication/song_lister");
const InMemorySongRepository = require("../core/song/infrastructure/in_memory_song_repository");
exports.list = async function (req, res) {
  try {
    const songLister = new SongLister(new InMemorySongRepository());
    const options = pagination.getPaginationOptions(req);
    const songs = await songLister.call(options.page, options.limit);
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
