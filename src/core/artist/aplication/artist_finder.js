const DiferentTypeError = require("../../../errors/diferent_type_error");
const ArtistRepository = require("../domain/artist_repository");

class ArtistFinder {
  constructor(repository) {
    if (!(repository instanceof ArtistRepository))
      throw new DiferentTypeError("ArtistRepository");
    this.repository = repository;
  }
  call(name) {
    return this.repository.find(name);
  }
}

module.exports = ArtistFinder;
