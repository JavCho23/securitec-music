const AlbumUpdater = require("../../src/core/album/aplication/album_updater");
const Album = require("../../src/core/album/domain/album");
const AlbumRepository = require("../../src/core/album/infrastructure/mysql_album_repository");
const { randomString } = require("../shared/random_string");
const db = require("../../src/db/mysql");
describe("Create a album ", () => {
  test("Should register", async () => {
    const albumUpdater = new AlbumUpdater(new AlbumRepository());
    const album = await albumUpdater.call(
      new Album(15, randomString(), randomString(), randomString(), 2020, 5)
    ); //Artist id must exist and album id must exist
    db.connection.destroy();
    expect(typeof album == Album).toBe(false);
  });
});
