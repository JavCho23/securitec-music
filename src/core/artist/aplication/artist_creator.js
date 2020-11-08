const DiferentTypeError = require("../../../errors/diferent_type_error");
const ArtistRepository = require("../domain/artist_repository");

class ArtistCreator {
  constructor(repository) {
    if (!(repository instanceof ArtistRepository))
      throw new DiferentTypeError("ArtistRepository");
    this.repository = repository;
  }

  call(artist) {
    return this.repository.create(artist);
  }
}

module.exports = ArtistCreator;
