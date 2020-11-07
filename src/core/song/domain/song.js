class Artist {
  constructor(name, duration, album) {
    this.name = name;
    this.duration = duration;
    this.album = album;
  }

  toJson() {
    return {
      name: this.name,
      duration: this.duration,
      album: this.album,
    };
  }
}

module.exports = Artist;
