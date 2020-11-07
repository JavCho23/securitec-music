const DiferentTypeError = require("../../../errors/diferent_type_error");
const ArtistRepository = require("../domain/artist_repository");

class ArtistLister {
  constructor(repository) {
    if (!(repository instanceof ArtistRepository))
      throw new DiferentTypeError("ArtistRepository");
    this.repository = repository;
  }
  call(page,limit) {
    return this.repository.list(page,limit);
  }
}

module.exports = ArtistLister;
