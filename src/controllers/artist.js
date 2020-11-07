const request = require("../helpers/request");
const pagination = require("../helpers/pagination");
const ArtistLister = require("../core/artist/aplication/artist_lister");
const ArtistRepository = require("../core/artist/infrastructure/mysql_artist_repository");
const ArtistFinder = require("../core/artist/aplication/artist_finder");
const ArtistCreator = require("../core/artist/aplication/artist_creator");
const Artist = require("../core/artist/domain/artist");
const ArtistUpdater = require("../core/artist/aplication/artist_updater");
exports.list = async function (req, res) {
  try {
    const artistLister = new ArtistLister(new ArtistRepository());
    const options = pagination.getPaginationOptions(req);
    const artists = await artistLister.call(options.page, options.limit);
    pagination.setPaginationHeaders(res, {
      page: options.page,
      limit: options.limit,
    });
    res.json(artists.map((artist) => artist.toJson()));
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};

exports.read = async function (req, res) {
  try {
    const artistFinder = new ArtistFinder(new ArtistRepository());
    const artist = await artistFinder.call(req.params.name);
    res.json(artist.toJson());
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};

exports.create = async function (req, res) {
  try {
    const artistCreator = new ArtistCreator(new ArtistRepository());
    const artist = await artistCreator.call(
      new Artist(req.body.name, req.body.about, req.body.nationality)
    );
    res.status(201).json(artist.toJson());
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};
exports.update = async function (req, res) {
  try {
    const artistUpdater = new ArtistUpdater(new ArtistRepository());
    const artist = await artistUpdater.call(
      new Artist(req.params.name, req.body.about, req.body.nationality)
    );
    res.json(artist.toJson());
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};
