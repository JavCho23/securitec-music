const Artist = require("../domain/artist");
const ArtistRepository = require("../domain/artist_repository");
const db = require("../../../db/in_memory.json");
class InMemoryArtistRepository extends ArtistRepository {
  list(page, limit) {
    const artist = db.artist.slice((page - 1) * limit, page * limit);
      return artist.map(
      (artist) => new Artist(artist.name, artist.about, artist.nationality)
    );
  }
  find(name) {}
}

module.exports = InMemoryArtistRepository;
