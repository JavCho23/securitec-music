class Album {
  constructor(
    id,
    name,
    description,
    coverPage,
    year,
    artist,
    totalSongs,
    totalDuration
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.coverPage = coverPage;
    this.year = year;
    this.artist = artist;
    this.totalSongs = totalSongs;
    this.totalDuration = totalDuration;
  }
  calculateDetails(songs) {
    // TODO add sum of total duration
    this.totalDuration = "oe";
    this.totalSongs = songs.length;
  }
  toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      coverPage: this.coverPage,
      year: this.year,
      artist: this.artist,
      totalDuration: this.totalDuration,
      totalSongs: this.totalSongs,
    };
  }
}

module.exports = Album;
