const InvalidValueError = require("../../../errors/invalid_value_error");

class Artist {
  constructor(id, name, about, nationality) {
    if (!name || !about || !nationality) throw new InvalidValueError();
    this.id = id;
    this.name = name;
    this.about = about;
    this.nationality = nationality;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      about: this.about,
      nationality: this.nationality,
    };
  }
}

module.exports = Artist;
