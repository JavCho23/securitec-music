const Album = require("../domain/album");
const AlbumRepository = require("../domain/album_repository");
const db = require("../../../db/in_memory.json");

class InMemoryAlbumRepository extends AlbumRepository {
  list(page, limit) {
    const albums = db.album.slice((page - 1) * limit, page * limit);
    return albums.map(
      (album) =>
        new Album(
          album.name,
          album.description,
          album.coverPage,
          album.year,
          album.artist
        )
    );
  }

  find(name) {}
}

module.exports = InMemoryAlbumRepository;
