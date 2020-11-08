class AlbumRepository {
  async list(page, limit, search) {}
  async listByArtist(page, limit, artist) {}
  async find(criteria, value) {}
  async create(album) {}
  async update(album) {}
  async delete(id) {}
  async findDetails(id) {}
}

module.exports = AlbumRepository;
