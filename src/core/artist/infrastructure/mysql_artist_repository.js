const Artist = require("../domain/artist");
const ArtistRepository = require("../domain/artist_repository");
const db = require("../../../db/mysql");
const RejectedError = require("../../../errors/rejected_error");
const NoFoundError = require("../../../errors/no_found_error");
const InvalidValueError = require("../../../errors/invalid_value_error");

class MySqlArtistRepository extends ArtistRepository {
  async list(page, limit, search) {
    const artists = await db.doQuery(
      `SELECT id, name,about,nationality_id FROM artist WHERE validity = true AND name LIKE ? ORDER BY id LIMIT ? OFFSET ? `,
      [search + "%", parseInt(limit), (page - 1) * limit]
    );
    return artists.map(
      (artist) =>
        new Artist(artist.id, artist.name, artist.about, artist.nationality_id)
    );
  }

  async find(criteria, value) {
    const artist = await db.doQuery(
      `SELECT id,name,about,nationality_id FROM artist WHERE ${criteria} = ?  AND validity = true`,
      value
    );
    if (artist.length == 0) throw new NoFoundError();
    return new Artist(
      artist[0].id,
      artist[0].name,
      artist[0].about,
      artist[0].nationality_id
    );
  }

  async create(artist) {
    let exists = true;
    try {
      await this.find("name", artist.name);
    } catch (error) {
      exists = false;
    }
    if (exists) throw new RejectedError("This artists already exists");
    const response = await db.doQuery(`INSERT INTO artist SET ? `, {
      name: artist.name,
      nationality_id: artist.nationality,
      about: artist.about,
    });
    artist.id = response.insertId;
    return artist;
  }

  async update(artist) {
    await this.find("id", artist.id);
    let exists = true;
    let anotherArtist;
    try {
      anotherArtist = await this.find("name", artist.name);
    } catch (error) {
      exists = false;
    }
    if (exists && anotherArtist.id != artist.id)
      throw new RejectedError("This artists already exists");
    await db.doQuery(`UPDATE artist SET ? WHERE id = ? `, [
      {
        name: artist.name,
        nationality_id: artist.nationality,
        about: artist.about,
      },
      artist.id,
    ]);
    return artist;
  }

  async delete(id) {
    const exists = await this.find("id", id);
    if (exists == null) throw new NoFoundError();
    const artist = await db.doQuery(
      `SELECT artist.id FROM artist 
      INNER JOIN album ON  album.artist_id = artist.id 
      WHERE artist.validity = true  AND album.validity = true AND artist.id = ?`,
      id
    );
    if (artist.length > 0)
      throw new InvalidValueError(
        "You cant delete this artist, he still has albums registered"
      );
    await db.doQuery(`UPDATE artist SET validity = false WHERE id = ? `, id);
  }
}

module.exports = MySqlArtistRepository;
