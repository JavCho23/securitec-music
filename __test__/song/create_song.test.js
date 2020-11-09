const SongCreator = require("../../src/core/song/aplication/song_creator");
const Song = require("../../src/core/song/domain/song");
const SongRepository = require("../../src/core/song/infrastructure/mysql_song_repository");
const { randomString } = require("../shared/random_string");
const db = require("../../src/db/mysql");
describe("Create a song ", () => {
  test("Should register", async () => {
    const songCreator = new SongCreator(new SongRepository());
    const song = await songCreator.call(
      new Song(0, randomString(), "03:50", 15)
    ); //Album id must exist
    db.connection.destroy();
    expect(!song.id).toBe(false);
  });
});
