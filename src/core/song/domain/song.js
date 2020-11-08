const InvalidValueError = require("../../../errors/invalid_value_error");

class Song {
  constructor(id, name, duration, album, artist) {
    if (!name || !name || !duration) throw new InvalidValueError();
    this.name = name;
    this.id = id;
    this.duration = duration;
    this.album = album;
    this.artist = artist;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      duration: this.duration,
      album: this.album,
      artist: this.artist,
    };
  }
}

module.exports = Song;
