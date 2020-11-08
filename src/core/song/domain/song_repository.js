class SongRepository {
  async list(page, limit, search) {}
  async listByArtist(page, limit, artist) {}
  async listByAlbum(page, limit, album) {}
  async find(criteria, id) {}
}

module.exports = SongRepository;
