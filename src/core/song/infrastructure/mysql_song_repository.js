const Song = require("../domain/song");
const SongRepository = require("../domain/song_repository");
const db = require("../../../db/mysql");
class InMemorySongRepository extends SongRepository {
  async list(page, limit) {
    const songs = await db.doQuery(
      `SELECT name,duration,album_id FROM song ORDER BY id LIMIT ? OFFSET ? `,
      [parseInt(limit), (page - 1) * limit]
    );
    return songs.map(
      (song) => new Song(song.name, song.duration, song.album_id)
    );
  }
  find(name) {}
}

module.exports = InMemorySongRepository;
