const Album = require("../domain/album");
const AlbumRepository = require("../domain/album_repository");
const db = require("../../../db/mysql");
const RejectedError = require("../../../errors/rejected_error");
const NoFoundError = require("../../../errors/no_found_error");

class MySqlAlbumRepository extends AlbumRepository {
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
          album.artist_id
        )
    );
  }

  async listByArtist(page, limit, artist) {
    const albums = await db.doQuery(
      `SELECT id, name,description,cover_page,year,artist_id FROM album WHERE validity = true AND artist_id = ?  ORDER BY id LIMIT ? OFFSET ? `,
      [artist, parseInt(limit), (page - 1) * limit]
    );
    return albums.map(
      (album) =>
        new Album(
          album.id,
          album.name,
          album.description,
          album.cover_page,
          album.year,
          album.artist_id
        )
    );
  }

  async find(criteria, value) {
    const album = await db.doQuery(
      `SELECT id,name,cover_page,description,year,artist_id FROM album WHERE ${criteria} = ?  AND validity = true`,
      value
    );
    if (album.length == 0) throw new NoFoundError();
    return new Album(
      album[0].id,
      album[0].name,
      album[0].description,
      album[0].cover_page,
      album[0].year,
      album[0].artist_id
    );
  }

  async findDetails(id) {
    const album = await this.find("id", id);
    const songs = await db.doQuery(
      `SELECT duration FROM song WHERE validity = true AND album_id = ?`,
      id
    );
    album.calculateDetails(songs);
    return album;
  }

  async create(album) {
    let exists = true;
    try {
      await this.find("name", album.name);
    } catch (error) {
      exists = false;
    }
    if (exists) throw new RejectedError("This album already exists");
    const response = await db.doQuery(`INSERT INTO album SET ? `, {
      name: album.name,
      description: album.description,
      cover_page: album.coverPage,
      year: album.year,
      artist_id: album.artist,
    });
    album.id = response.insertId;
    return album;
  }

  async update(album) {
    await this.find("id", album.id);
    let exists = true;
    let anotheAlbum;
    try {
      anotheAlbum = await this.find("name", album.name);
    } catch (error) {
      exists = false;
    }
    if (exists && anotheAlbum.id != album.id)
      throw new RejectedError("This album already exists");
    await db.doQuery(`UPDATE album SET ? WHERE id = ? `, [
      {
        name: album.name,
        description: album.description,
        cover_page: album.coverPage,
        year: album.year,
        artist_id: album.artist,
      },
      album.id,
    ]);
    return album;
  }

  async delete(id) {
    const exists = await this.find("id", id);
    if (exists == null) throw new NoFoundError();
    const artist = await db.doQuery(
      `SELECT album.id FROM album 
      INNER JOIN song ON  song.album_id = album.id 
      WHERE album.validity = true  AND song.validity = true AND album.id = ?`,
      id
    );
    if (artist.length > 0)
      throw new InvalidValueError(
        "You cant delete this album, it still has songs registered"
      );
    await db.doQuery(`UPDATE album SET validity = false WHERE id = ? `, id);
  }
}

module.exports = MySqlAlbumRepository;
