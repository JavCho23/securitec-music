class Artist {
  constructor(name, about, nationality) {
    this.name = name;
    this.about = about;
    this.nationality = nationality;
  }

  toJson() {
    return {
      name: this.name,
      about: this.about,
      nationality: this.nationality,
    };
  }
}

module.exports = Artist;
