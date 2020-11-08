const Song = require("../domain/song");
const SongRepository = require("../domain/song_repository");
const db = require("../../../db/mysql");
const InvalidValueError = require("../../../errors/invalid_value_error");
const NoFoundError = require("../../../errors/no_found_error");
const RejectedError = require("../../../errors/rejected_error");
class MySqlSongRepository extends SongRepository {
  async list(page, limit, search) {
    const songs = await db.doQuery(
      `SELECT id,name,duration,album_id FROM song WHERE validity = true AND name LIKE ?   ORDER BY id LIMIT ? OFFSET ? `,
      [search + "%", parseInt(limit), (page - 1) * limit]
    );
    return songs.map(
      (song) => new Song(song.id, song.name, song.duration, song.album_id)
    );
  }
  // TODO Refactor repeat code in lists

  async listByAlbum(page, limit, album) {
    const songs = await db.doQuery(
      `SELECT song.id,song.name,song.duration,song.album_id FROM song WHERE song.validity = true AND album_id = ?   ORDER BY id LIMIT ? OFFSET ? `,
      [album, parseInt(limit), (page - 1) * limit]
    );
    return songs.map(
      (song) => new Song(song.id, song.name, song.duration, song.album_id)
    );
  }
  async listByArtist(page, limit, artist) {
    const songs = await db.doQuery(
      `SELECT song.id,song.name,song.duration,song.album_id FROM song
      INNER JOIN album  ON album.id = song.album_id
      INNER JOIN artist ON artist.id = album.artist_id 
      WHERE song.validity = true AND artist.id = ?   ORDER BY id LIMIT ? OFFSET ? `,
      [artist, parseInt(limit), (page - 1) * limit]
    );
    return songs.map(
      (song) => new Song(song.id, song.name, song.duration, song.album_id)
    );
  }
  async find(criteria, value) {
    const song = await db.doQuery(
      `SELECT id,name,duration,album_id FROM song WHERE ${criteria} = ?  AND validity = true`,
      value
    );
    if (song.length == 0) throw new NoFoundError();
    return new Song(
      song[0].id,
      song[0].name,
      song[0].duration,
      song[0].album_id
    );
  }
  async create(song) {
    const artistId = await db.doQuery(
      `SELECT artist.id as value FROM artist
    INNER JOIN album ON album.artist_id = artist.id 
    WHERE album.id = ? AND album.validity = true`,
      song.album
    );
    if (artistId.length == 0)
      throw new InvalidValueError("This album no exists");

    const exists = await db.doQuery(
      `SELECT song.id FROM song 
    INNER JOIN album ON album.id = song.album_id 
    WHERE song.name = ? AND album.artist_id = ?`,
      [song.name, artistId[0].value]
    );
    if (exists.length != 0) throw new RejectedError("This song already exists");
    const response = await db.doQuery(`INSERT INTO song SET ? `, {
      name: song.name,
      duration: song.duration,
      album_id: song.album,
    });
    song.id = response.insertId;
    return song;
  }
  async update(song) {
    await this.find("id", song.id);
    const artistId = await db.doQuery(
      `SELECT artist.id as value FROM artist
    INNER JOIN album ON album.artist_id = artist.id 
    WHERE album.id = ? AND album.validity = true`,
      song.album
    );
    if (artistId.length == 0)
      throw new InvalidValueError("This album no exists");
    const exists = await db.doQuery(
      `SELECT song.id FROM song 
    INNER JOIN album ON album.id = song.album_id 
    WHERE song.name = ? AND album.artist_id = ? AND song.id != ?`,
      [song.name, artistId[0].value, song.id]
    );
    if (exists.length != 0) throw new RejectedError("This song already exists");

    await db.doQuery(`UPDATE song SET ? WHERE id = ? `, [
      {
        name: song.name,
        duration: song.duration,
        album_id: song.album,
      },
      song.id,
    ]);
    return song;
  }
  async delete(id) {
    const exists = await this.find("id", id);
    if (exists == null) throw new NoFoundError();
    await db.doQuery(`UPDATE song SET validity = false WHERE id = ? `, id);
  }
}

module.exports = MySqlSongRepository;
