const DiferentTypeError = require("../../../errors/diferent_type_error");
const AlbumRepository = require("../domain/album_repository");

class AlbumLister {
  constructor(repository) {
    if (!(repository instanceof AlbumRepository))
      throw new DiferentTypeError("AlbumRepository");
    this.repository = repository;
  }
  call(page, limit) {
    return this.repository.list(page, limit);
  }
}

module.exports = AlbumLister;
