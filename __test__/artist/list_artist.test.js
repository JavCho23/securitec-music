const ArtistList = require("../../src/core/artist/aplication/artist_lister");
const ArtistRepository = require("../../src/core/artist/infrastructure/mysql_artist_repository");
const db = require("../../src/db/mysql");
describe("Create a artist ", () => {
  test("Should register", async () => {
    const artistList = new ArtistList(new ArtistRepository());
    const artist = await artistList.call(1, 10, ""); 
    db.connection.destroy();
    expect(artist.length).toBeGreaterThanOrEqual(1);
  });
});
