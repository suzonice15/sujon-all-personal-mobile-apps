import { getDB } from './db';

export const getFolders = async () => {
  const db = await getDB();
  const [result] = await db.executeSql(
    `SELECT f.*, COUNT(i.id) as item_count
     FROM bookmark_folders f
     LEFT JOIN bookmark_items i ON i.folder_id = f.id
     GROUP BY f.id
     ORDER BY f.created_at DESC;`,
  );
  return result.rows.raw();
};

export const createFolder = async (name) => {
  const db = await getDB();
  const [result] = await db.executeSql(
    `INSERT OR IGNORE INTO bookmark_folders (name) VALUES (?);`,
    [name],
  );
  return result.insertId;
};

export const addToFolder = async (folder_id, content_id, title) => {
  const db = await getDB();
  await db.executeSql(
    `INSERT OR IGNORE INTO bookmark_items (folder_id, content_id, title) VALUES (?, ?, ?);`,
    [folder_id, content_id, title],
  );
};

export const removeFromFolder = async (folder_id, content_id) => {
  const db = await getDB();
  await db.executeSql(
    `DELETE FROM bookmark_items WHERE folder_id = ? AND content_id = ?;`,
    [folder_id, content_id],
  );
};

export const deleteFolder = async (folder_id) => {
  const db = await getDB();
  await db.executeSql(`DELETE FROM bookmark_folders WHERE id = ?;`, [folder_id]);
  await db.executeSql(`DELETE FROM bookmark_items WHERE folder_id = ?;`, [folder_id]);
};

export const getFolderItems = async (folder_id) => {
  const db = await getDB();
  const [result] = await db.executeSql(
    `SELECT mc.* FROM bookmark_items bi
     JOIN mobile_contents mc ON mc.id = bi.content_id
     WHERE bi.folder_id = ?
     ORDER BY bi.id DESC;`,
    [folder_id],
  );
  return result.rows.raw();
};

export const getContentFolderIds = async (content_id) => {
  const db = await getDB();
  const [result] = await db.executeSql(
    `SELECT folder_id FROM bookmark_items WHERE content_id = ?;`,
    [content_id],
  );
  return result.rows.raw().map(r => r.folder_id);
};
