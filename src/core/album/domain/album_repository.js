class AlbumRepository {
  async list(page, limit, search) {}
  async listByArtist(page, limit, artist) {}
  async find(criteria, value) {}
  async create(album) {}
  async findDetails(id) {}
}

module.exports = AlbumRepository;
