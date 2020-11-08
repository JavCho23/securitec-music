class Song {
  constructor(id, name, duration, album, artist) {
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
