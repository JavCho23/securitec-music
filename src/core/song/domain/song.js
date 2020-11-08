const InvalidValueError = require("../../../errors/invalid_value_error");

class Song {
  constructor(id, name, duration, album, artist) {
    if (!name || !duration || !duration) throw new InvalidValueError();
    if (!duration.match(/^\d+:[0-5]\d$/))
      throw new InvalidValueError("Your duration has a invalid format");
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
