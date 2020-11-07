const DiferentTypeError = require("../../../errors/diferent_type_error");
const AlbumRepository = require("../domain/album_repository");

class AlbumLister {
  constructor(repository) {
    if (!(repository instanceof AlbumRepository))
      throw new DiferentTypeError("AlbumRepository");
    this.repository = repository;
  }
  call(page, limit, search) {
    return this.repository.list(page, limit, search);
  }
}

module.exports = AlbumLister;
