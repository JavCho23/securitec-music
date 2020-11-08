const request = require("../helpers/request");
const pagination = require("../helpers/pagination");
const ArtistLister = require("../core/artist/aplication/artist_lister");
const ArtistRepository = require("../core/artist/infrastructure/mysql_artist_repository");
const ArtistFinder = require("../core/artist/aplication/artist_finder");
const ArtistCreator = require("../core/artist/aplication/artist_creator");
const Artist = require("../core/artist/domain/artist");
const ArtistUpdater = require("../core/artist/aplication/artist_updater");
const ArtistDeleter = require("../core/artist/aplication/artist_deleter");

exports.list = async function (req, res) {
  try {
    const artistLister = new ArtistLister(new ArtistRepository());
    const params = request.getFilteringOptions(req, ["search"]);
    const options = pagination.getPaginationOptions(req);
    const artists = await artistLister.call(
      options.page,
      options.limit,
      params.search ? params.search : ""
    );
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
    const artist = await artistFinder.call(req.params.id);
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
      new Artist(0, req.body.name, req.body.about, req.body.nationality)
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
      new Artist(
        req.params.id,
        req.body.name,
        req.body.about,
        req.body.nationality
      )
    );
    res.json(artist.toJson());
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};

exports.delete = async function (req, res) {
  try {
    const artistDeleter = new ArtistDeleter(new ArtistRepository());
    const artist = await artistDeleter.call(req.params.id);
    res.status(204).json({});
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};
