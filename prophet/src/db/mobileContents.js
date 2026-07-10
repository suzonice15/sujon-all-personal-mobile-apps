import { getDB } from './db';

export const syncMobileContents = async (items) => {
  // console.log('mobile contents sync started')
  // console.log(items)

  const db = await getDB();
  for (const item of items) {
    await db.executeSql(
      `INSERT INTO mobile_contents (data_id,title, sub_title, serial, audio, image, audio_title, slug, content, parent_id)
       VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(slug) DO UPDATE SET
         data_id = excluded.data_id,
         title = excluded.title,
         sub_title = excluded.sub_title,
         serial = excluded.serial,
         audio = excluded.audio,
         image = excluded.image,
         audio_title = excluded.audio_title,
         content = excluded.content,
         parent_id = excluded.parent_id;`,
      [
        item.id,
        item.title,
        item.sub_title,
        item.serial ?? 999,
        item.audio,
        item.image,
        item.audio_title,
        item.slug,
        item.content,
        item.parent_id,
      ],
    );
  }
};

export const getMobileContents = async (parent_id = 0) => {
  const db = await getDB();
  const query =  parent_id === 0
      ? `SELECT * FROM mobile_contents WHERE parent_id=0  ORDER BY serial ASC;`
      : `SELECT * FROM mobile_contents WHERE parent_id = ? ORDER BY serial ASC;`;
  const params = parent_id === 0 ? [] : [parent_id];
  const [result] = await db.executeSql(query, params);
  return result.rows.raw();
};
export const getSingleContent = async (id) => {
  const db = await getDB();

  const query = `
    SELECT *
    FROM mobile_contents
    WHERE data_id = ?
    ORDER BY serial ASC
    LIMIT 1
  `;

  const [result] = await db.executeSql(query, [id]);

  return result.rows.length > 0 ? result.rows.item(0) : null;
};