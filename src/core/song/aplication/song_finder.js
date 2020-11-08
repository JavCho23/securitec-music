const DiferentTypeError = require("../../../errors/diferent_type_error");
const SongRepository = require("../domain/song_repository");

class SongFinder {
  constructor(repository) {
    if (!(repository instanceof SongRepository))
      throw new DiferentTypeError("SongRepository");
    this.repository = repository;
  }
  call(id) {
    return this.repository.find("id", id);
  }
}

module.exports = SongFinder;
