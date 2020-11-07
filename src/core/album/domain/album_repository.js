class AlbumRepository {
  async list(page, limit, search) {}
  async listByArtist(page, limit, artist) {}
  async find(name) {}
}

module.exports = AlbumRepository;
