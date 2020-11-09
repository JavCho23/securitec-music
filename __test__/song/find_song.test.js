const SongFinder = require("../../src/core/song/aplication/song_finder");
const SongRepository = require("../../src/core/song/infrastructure/mysql_song_repository");
const db = require("../../src/db/mysql");
describe("Create a song ", () => {
  test("Should register", async () => {
    const songFinder = new SongFinder(new SongRepository());
    const song = await songFinder.call(9); //Song id must exist
    db.connection.destroy();
    expect(!song.id).toBe(false);
  });
});
