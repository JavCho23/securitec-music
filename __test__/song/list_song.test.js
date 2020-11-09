const SongLister = require("../../src/core/song/aplication/song_lister");
const SongRepository = require("../../src/core/song/infrastructure/mysql_song_repository");
const db = require("../../src/db/mysql");
describe("Create a artist ", () => {
  test("Should register", async () => {
    const songLister = new SongLister(new SongRepository());
    const song = await songLister.call(1, 10, ""); //Song id must exist
    db.connection.destroy();
    expect(song.length).toBeGreaterThanOrEqual(1);
  });
});
