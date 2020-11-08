const Song = require("../domain/song");
const SongRepository = require("../domain/song_repository");
const db = require("../../../db/mysql");
class MySqlSongRepository extends SongRepository {
  async list(page, limit, search) {
    const songs = await db.doQuery(
      `SELECT name,duration,album_id FROM song WHERE validity = true AND name LIKE ?   ORDER BY id LIMIT ? OFFSET ? `,
      [search + "%", parseInt(limit), (page - 1) * limit]
    );
    return songs.map(
      (song) => new Song(song.name, song.duration, song.album_id)
    );
  }
  find(name) {}
}

module.exports = MySqlSongRepository;
