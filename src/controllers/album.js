const request = require("../helpers/request");
const pagination = require("../helpers/pagination");
const AlbumLister = require("../core/album/aplication/album_lister");
const AlbumRepository = require("../core/album/infrastructure/mysql_album_repository");
exports.list = async function (req, res) {
  try {
    const albumLister = new AlbumLister(new AlbumRepository());
    const options = pagination.getPaginationOptions(req);
    const albums = await albumLister.call(options.page, options.limit);
    pagination.setPaginationHeaders(res, {
      page: options.page,
      limit: options.limit,
    });
    res.json(albums.map((album) => album.toJson()));
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};
