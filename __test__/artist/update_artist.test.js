const ArtistUpdater = require("../../src/core/artist/aplication/artist_updater");
const Artist = require("../../src/core/artist/domain/artist");
const ArtistRepository = require("../../src/core/artist/infrastructure/mysql_artist_repository");
const { randomString } = require("../shared/random_string");
const db = require("../../src/db/mysql");
describe("Create a artist ", () => {
  test("Should register", async () => {
    const artistUpdater = new ArtistUpdater(new ArtistRepository());
    const artist = await artistUpdater.call(
      new Artist(14, randomString(), randomString(), 4)
    ); //Nationality id must exist
    db.connection.destroy();
    expect(typeof artist == Artist).toBe(false);
  });
});
