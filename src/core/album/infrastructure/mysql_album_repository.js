const Album = require("../domain/album");
const AlbumRepository = require("../domain/album_repository");
const db = require("../../../db/mysql");
class InMemoryAlbumRepository extends AlbumRepository {
  async list(page, limit) {
    const albums = await db.doQuery(
      `SELECT name,description,cover_page,year,artist_id FROM album ORDER BY id LIMIT ? OFFSET ? `,
      [parseInt(limit), (page - 1) * limit]
    );
    return albums.map(
      (album) =>
        new Album(
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
