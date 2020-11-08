const DiferentTypeError = require("../../../errors/diferent_type_error");
const SongRepository = require("../domain/song_repository");

class SongLister {
  constructor(repository) {
    if (!(repository instanceof SongRepository))
      throw new DiferentTypeError("ArtistRepository");
    this.repository = repository;
  }

  call(page, limit, search) {
    return this.repository.list(page, limit, search);
  }
}

module.exports = SongLister;
