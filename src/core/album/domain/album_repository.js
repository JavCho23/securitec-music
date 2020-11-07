class AlbumRepository {
  async list(page, limit, search) {}
  async listByArtist(page, limit, artist) {}
  async find(criteria, value) {}
  async findDetails(id) {}
}

module.exports = AlbumRepository;
