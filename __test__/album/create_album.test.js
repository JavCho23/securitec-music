const AlbumCreator = require("../../src/core/album/aplication/album_creator");
const Album = require("../../src/core/album/domain/album");
const AlbumRepository = require("../../src/core/album/infrastructure/mysql_album_repository");
const { randomString } = require("../shared/random_string");
const db = require("../../src/db/mysql");
describe("Create a album ", () => {
  test("Should register", async () => {
    const albumCreator = new AlbumCreator(new AlbumRepository());
    const album = await albumCreator.call(
      new Album(0, randomString(), randomString(), randomString(), 2020, 5)
    ); //Artist id must exist
    db.connection.destroy();
    expect(!album.id).toBe(false);
  });
});
