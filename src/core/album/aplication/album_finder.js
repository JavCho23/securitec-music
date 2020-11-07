const DiferentTypeError = require("../../../errors/diferent_type_error");
const AlbumRepository = require("../domain/album_repository");

class AlbumFinder {
  constructor(repository) {
    if (!(repository instanceof AlbumRepository))
      throw new DiferentTypeError("AlbumRepository");
    this.repository = repository;
  }
  call(id) {
    return this.repository.findDetails(id);
  }
}

module.exports = AlbumFinder;
