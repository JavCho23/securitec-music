class Album {
  constructor(id, name, description, coverPage, year, artist) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.coverPage = coverPage;
    this.year = year;
    this.artist = artist;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      coverPage: this.coverPage,
      year: this.year,
      artist: this.artist,
    };
  }
}

module.exports = Album;
