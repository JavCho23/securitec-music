const DiferentTypeError = require("../../../errors/diferent_type_error");
const SongRepository = require("../domain/song_repository");

class SongListerByArtist {
  constructor(repository) {
    if (!(repository instanceof SongRepository))
      throw new DiferentTypeError("ArtistRepository");
    this.repository = repository;
  }
  call(page, limit, artist) {
    return this.repository.listByArtist(page, limit, artist);
  }
}

module.exports = SongListerByArtist;
