const Album = require("../domain/album");
const AlbumRepository = require("../domain/album_repository");
const db = require("../../../db/mysql");
class InMemoryAlbumRepository extends AlbumRepository {
  async list(page, limit, search) {
    const albums = await db.doQuery(
      `SELECT id, name,description,cover_page,year,artist_id FROM album WHERE validity = true AND name LIKE ?  ORDER BY id LIMIT ? OFFSET ? `,
      [search + "%", parseInt(limit), (page - 1) * limit]
    );
    return albums.map(
      (album) =>
        new Album(
          album.id,
          album.name,
          album.description,
          album.cover_page,
          album.year,
          album.artist
        )
    );
  }
  find(name) {}
}

module.exports = InMemoryAlbumRepository;
