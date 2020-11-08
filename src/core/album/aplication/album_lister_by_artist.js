const DiferentTypeError = require("../../../errors/diferent_type_error");
const AlbumRepository = require("../domain/album_repository");

class AlbumListerByArtist {
  constructor(repository) {
    if (!(repository instanceof AlbumRepository))
      throw new DiferentTypeError("AlbumRepository");
    this.repository = repository;
  }

  call(page, limit, artist) {
    return this.repository.listByArtist(page, limit, artist);
  }
}

module.exports = AlbumListerByArtist;
