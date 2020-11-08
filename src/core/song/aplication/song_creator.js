const DiferentTypeError = require("../../../errors/diferent_type_error");
const SongRepository = require("../domain/song_repository");

class SongCreator {
  constructor(repository) {
    if (!(repository instanceof SongRepository))
      throw new DiferentTypeError("SongRepository");
    this.repository = repository;
  }
  call(song) {
    return this.repository.create(song);
  }
}

module.exports = SongCreator;
