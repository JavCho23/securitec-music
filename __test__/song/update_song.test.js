const SongUpdater = require("../../src/core/song/aplication/song_updater");
const Song = require("../../src/core/song/domain/song");
const SongRepository = require("../../src/core/song/infrastructure/mysql_song_repository");
const { randomString } = require("../shared/random_string");
const db = require("../../src/db/mysql");
describe("Create a song ", () => {
  test("Should register", async () => {
    const songUpdater = new SongUpdater(new SongRepository());
    const song = await songUpdater.call(
      new Song(9, randomString(), "03:50", 15)
    ); //Album id must exist
    db.connection.destroy();
    expect(!song.id).toBe(false);
  });
});
