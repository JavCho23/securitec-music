const Artist = require("../domain/artist");
const ArtistRepository = require("../domain/artist_repository");
const db = require("../../../db/mysql");
class InMemoryArtistRepository extends ArtistRepository {
  async list(page, limit) {
    const artists = await db.doQuery(
      `SELECT name,about,nationality_id FROM artist ORDER BY id LIMIT ? OFFSET ? `,
      [parseInt(limit), (page - 1) * limit]
    );
    return artists.map(
      (artist) => new Artist(artist.name, artist.about, artist.nationality_id)
    );
  }
  find(name) {}
}

module.exports = InMemoryArtistRepository;
