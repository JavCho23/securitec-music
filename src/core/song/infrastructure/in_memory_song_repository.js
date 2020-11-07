const Song = require("../domain/song");
const SongRepository = require("../domain/song_repository");
const db = require("../../../db/in_memory.json");
class InMemorySongRepository extends SongRepository {
  list(page, limit) {
    const song = db.songs.slice((page - 1) * limit, page * limit);
    return song.map(
      (song) => new Song(song.name, song.duration, song.album)
    );
  }
  find(name) {}
}

module.exports = InMemorySongRepository;
