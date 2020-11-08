const InvalidValueError = require("../../../errors/invalid_value_error");

class Country {
  constructor(id, name, alphaCode, nationality) {
    this.id = id;
    this.name = name;
    this.alphaCode = alphaCode;
    this.nationality = nationality;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      alphaCode: this.alphaCode,
      nationality: this.nationality,
    };
  }
}

module.exports = Country;
