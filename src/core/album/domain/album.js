class Album {
  constructor(name, description, coverPage, year, artist) {
    this.name = name;
    this.description = description;
    this.coverPage = coverPage;
    this.year = year;
    this.artist = artist;
  }

  toJson() {
    return {
      name: this.name,
      description: this.description,
      coverPage: this.coverPage,
      year: this.year,
      artist: this.artist,
    };
  }
}

module.exports = Album;
