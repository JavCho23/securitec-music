const AlbumFinder = require("../../src/core/album/aplication/album_finder");
const AlbumRepository = require("../../src/core/album/infrastructure/mysql_album_repository");
const db = require("../../src/db/mysql");
describe("Find a album ", () => {
  test("Should find", async () => {
    const albumFinder = new AlbumFinder(new AlbumRepository());
    const album = await albumFinder.call(3); //Album id must exist
    db.connection.destroy();
    expect(!album.id).toBe(false);
  });
});
