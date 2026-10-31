import { getDB } from './db';

// Level progress for the kids' games: best star count per (game, track, level).
// "track" separates variants of one game, e.g. 'bn' / 'en'.

let tableReady = null;

const getProgressDB = async () => {
  const db = await getDB();
  if (!tableReady) {
    tableReady = db
      .executeSql(`
        CREATE TABLE IF NOT EXISTS game_progress (
          game_id TEXT NOT NULL,
          track TEXT NOT NULL,
          level_id TEXT NOT NULL,
          stars INTEGER DEFAULT 0,
          updated_at TEXT DEFAULT (datetime('now', 'localtime')),
          PRIMARY KEY (game_id, track, level_id)
        );
      `)
      .catch((e) => {
        tableReady = null;
        throw e;
      });
  }
  await tableReady;
  return db;
};

// Returns { [levelId]: stars }
export const getGameProgress = async (gameId, track) => {
  const db = await getProgressDB();
  const [res] = await db.executeSql(
    'SELECT level_id, stars FROM game_progress WHERE game_id = ? AND track = ?',
    [gameId, track],
  );
  const progress = {};
  for (let i = 0; i < res.rows.length; i++) {
    const row = res.rows.item(i);
    progress[row.level_id] = row.stars;
  }
  return progress;
};

// Keeps the best result; replaying a level never lowers its stars.
export const saveLevelStars = async (gameId, track, levelId, stars) => {
  const db = await getProgressDB();
  await db.executeSql(
    'INSERT OR IGNORE INTO game_progress (game_id, track, level_id, stars) VALUES (?, ?, ?, 0)',
    [gameId, track, levelId],
  );
  await db.executeSql(
    `UPDATE game_progress
     SET stars = MAX(stars, ?), updated_at = datetime('now', 'localtime')
     WHERE game_id = ? AND track = ? AND level_id = ?`,
    [stars, gameId, track, levelId],
  );
};
