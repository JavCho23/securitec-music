const DiferentTypeError = require("../../../errors/diferent_type_error");
const SongRepository = require("../domain/song_repository");

class SongListerByAlbum {
  constructor(repository) {
    if (!(repository instanceof SongRepository))
      throw new DiferentTypeError("ArtistRepository");
    this.repository = repository;
  }
  call(page, limit, album) {
    return this.repository.listByAlbum(page, limit, album);
  }
}

module.exports = SongListerByAlbum;
