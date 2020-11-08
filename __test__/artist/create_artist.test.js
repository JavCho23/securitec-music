const ArtistCreator = require("../../src/core/artist/aplication/artist_creator");
const Artist = require("../../src/core/artist/domain/artist");
const ArtistRepository = require("../../src/core/artist/infrastructure/mysql_artist_repository");
const { randomString } = require("../shared/random_string");
const db = require("../../src/db/mysql");
describe("Create a artist ", () => {
  test("Should register", async () => {
    const artistCreator = new ArtistCreator(new ArtistRepository());
    const artist = await artistCreator.call(
      new Artist(0, randomString(), randomString(), 4)
    ); //Nationality id must exist
    db.connection.destroy();
    expect(!artist.id).toBe(false);
  });
});
