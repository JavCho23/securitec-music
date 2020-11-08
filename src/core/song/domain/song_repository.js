class SongRepository {
  async list(page, limit, search) {}
  async listByArtist(page, limit, artist) {}
  async listByAlbum(page, limit, album) {}
  async create(song) {}
  async update(song) {}
  async find(criteria, id) {}
}

module.exports = SongRepository;
