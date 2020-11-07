const request = require("../helpers/request");
const pagination = require("../helpers/pagination");
const ArtistLister = require("../core/artist/aplication/artist_lister");
const InMemoryArtistRepository = require("../core/artist/infrastructure/in_memory_artist_repository");
exports.list = async function (req, res) {
  try {
    const artistLister = new ArtistLister({});
    const options = pagination.getPaginationOptions(req);
    const artist = await artistLister.call(options.page, options.limit);
    pagination.setPaginationHeaders(res, {
      page: options.page,
      limit: options.limit,
    });
    res.json(artist);
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};
