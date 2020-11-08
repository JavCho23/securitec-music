const InvalidValueError = require("../../../errors/invalid_value_error");

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
    if (!name || !description || !coverPage || !year || !artist)
      throw new InvalidValueError();

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
    this.totalDuration = songs.reduce((acumulator, current) => {
      return this.addDurations(acumulator.duration, current.duration);
    });
    this.totalSongs = songs.length;
  }
  addDurations(duration, anotherDuration) {
    if (!duration) return anotherDuration;
    let resultado = [];
    duration = duration.split(":").reverse();
    anotherDuration = anotherDuration.split(":").reverse();
    let acumulado = 0;
    let sumaAcumulado;
    let suma = parseInt(duration[0]) + parseInt(anotherDuration[0]);
    sumaAcumulado = this.acumulate(suma, acumulado);
    resultado.push(sumaAcumulado[0]);
    suma =
      parseInt(duration[1]) + parseInt(anotherDuration[1]) + sumaAcumulado[1];
    acumulado = 0;
    sumaAcumulado = this.acumulate(suma, acumulado);
    resultado.push(sumaAcumulado[0]);
    resultado.reverse();
    return resultado.join(":");
  }
  acumulate(suma, acumulado) {
    if (suma > 60) {
      suma = suma - 60;
      acumulado += 1;
      this.acumulate(suma, acumulado);
    }

    if (suma == 60) {
      suma = 0;
      acumulado += 1;
      this.acumulate(suma, acumulado);
    }
    return [suma, acumulado];
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
