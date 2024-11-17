const db = require("../db/dbConfig");

const getAllSongs = async () => {
  console.log("hit getAll songs");
  try {
    const allSongs = await db.any("SELECT * FROM songs");
    return allSongs;
  } catch (error) {
    console.log("db error", error);
    return error;
  }
};

const createSong = async (song) => {
  try {
    const newSong = await db.one(
      "INSERT INTO songs (title, artist, genre) VALUES($1, $2, $3) RETURNING *",
        [song.title, song.artist, song.genre]
    );
    return newSong;
  } catch (error) {
    return error;
  }
};

const deleteSong = async (id) => {  
  try {
    const deletedSong = await db.one("DELETE FROM songs WHERE id = $1 RETURNING *", id);
    return deletedSong;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllSongs, createSong, deleteSong };
