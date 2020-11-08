const AlbumLister = require("../../src/core/album/aplication/album_lister");
const AlbumRepository = require("../../src/core/album/infrastructure/mysql_album_repository");
const db = require("../../src/db/mysql");
describe("Find a album ", () => {
  test("Should find", async () => {
    const albumLister = new AlbumLister(new AlbumRepository());
    const album = await albumLister.call(1, 10, "");
    db.connection.destroy();
    expect(album.length).toBeGreaterThanOrEqual(1);
  });
});
