import { getDB } from './db';

export const syncQuizes = async (items) => {
    const db = await getDB();
    for (const item of items) {
        await db.executeSql(
            `INSERT INTO mobile_quizzes 
      (
        category,
        data_id,
        sub_category,
        name,
        option_a,
        option_b,
        option_c,
        option_d,
        answer
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

      ON CONFLICT(data_id) DO UPDATE SET
        category = excluded.category,
        sub_category = excluded.sub_category,
        name = excluded.name,
        option_a = excluded.option_a,
        option_b = excluded.option_b,
        option_c = excluded.option_c,
        option_d = excluded.option_d,
        answer = excluded.answer;
      `,
            [
                item.category,
                item.id,
                item.sub_category,
                item.name,
                item.option_a,
                item.option_b,
                item.option_c,
                item.option_d,
                item.answer,
            ],
        );
    }
};

export const getCategoryWiseQuize = async () => {
    const db = await getDB();
    const query = `
    SELECT 
      category,
      COUNT(DISTINCT sub_category) as sub_total,
      COUNT(*) as quiz_total
    FROM mobile_quizzes
    GROUP BY category
    ORDER BY data_id ASC;
  `;
    const [result] = await db.executeSql(query);
    return result.rows.raw();
};

export const getQuizeSubCategory = async (category) => {
    const db = await getDB();

    const query = `
    SELECT 
      sub_category,
      COUNT(*) as quiz_total
    FROM mobile_quizzes
    WHERE category = ?
    GROUP BY sub_category
    ORDER BY data_id ASC;
  `;

    const [result] = await db.executeSql(query, [category]);

    return result.rows.raw();
};




export const getQuizeData = async (type, data) => {
    const db = await getDB();
let query='';
    if (type == 'category') {

          query = `
    SELECT *
    FROM mobile_quizzes
    WHERE category = ?  ORDER BY data_id ASC;
  `;
    } else {
          query = `
    SELECT *
    FROM mobile_quizzes
    WHERE sub_category = ?  ORDER BY data_id ASC;
  `;

    }


    const [result] = await db.executeSql(query, [data]);

    return result.rows.raw();
};

