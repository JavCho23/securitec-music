const ArtistFinder = require("../../src/core/artist/aplication/artist_finder");
const Artist = require("../../src/core/artist/domain/artist");
const ArtistRepository = require("../../src/core/artist/infrastructure/mysql_artist_repository");
const { randomString } = require("../shared/random_string");
const db = require("../../src/db/mysql");
describe("Create a artist ", () => {
  test("Should register", async () => {
    const artistFinder = new ArtistFinder(new ArtistRepository());
    const artist = await artistFinder.call(5); //Artist id must exist
    db.connection.destroy();
    expect(!artist.id).toBe(false);
  });
});
