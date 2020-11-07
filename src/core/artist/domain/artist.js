const InvalidValueError = require("../../../errors/invalid_value_error");

class Artist {
  constructor(name, about, nationality) {
    
    if (!name || !about || !nationality) throw new InvalidValueError();
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
