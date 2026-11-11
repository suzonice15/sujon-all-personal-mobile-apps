// MongoDB chapter: Updates.

export default {
  id: 'updates',
  title: 'Updating Documents',
  description: 'Field, array and upsert operators',
  icon: 'build',
  lessons: [
    {
      id: 'mongo-field-updates',
      title: 'Field operators',
      blocks: [
        { type: 'text', value: 'Update operators change fields atomically. Use only operators in the update document, never a replacement object mixed with them.' },
        { type: 'list', items: [
          '$set - set a field',
          '$unset - remove a field',
          '$inc - increment a number',
          '$mul - multiply a number',
          '$rename - rename a field',
          '$min / $max - keep the lower or higher value',
        ] },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.updateOne(
  { title: 'SQL' },
  {
    $set: { level: 'beginner' },
    $inc: { price: 500 },
    $unset: { legacyId: '' }
  }
)` },
        { type: 'note', value: 'An update document must contain only update operators. Mixing plain fields and operators is an error.' },
      ],
    },
    {
      id: 'mongo-array-updates',
      title: 'Array operators',
      blocks: [
        { type: 'text', value: 'Arrays are common in documents. Use $push to add, $pull to remove, $addToSet to add only if missing, and $pop to remove the first or last element.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.updateOne(
  { title: 'SQL' },
  { $push: { tags: { $each: ['database', 'beginner'] } } }
)

db.courses.updateOne(
  { title: 'SQL' },
  { $pull: { tags: 'legacy' } }
)

db.courses.updateOne(
  { title: 'SQL' },
  { $addToSet: { tags: 'database' } }
)` },
        { type: 'note', value: '$addToSet prevents duplicates. $push does not, so repeated requests can grow the array forever.' },
      ],
    },
    {
      id: 'mongo-upsert',
      title: 'Upserts',
      blocks: [
        { type: 'text', value: 'An upsert inserts a document when nothing matches. This is how sync jobs stay idempotent: run the same request twice and the state is the same.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.updateOne(
  { slug: 'sql' },
  { $set: { title: 'SQL', price: 5000 } },
  { upsert: true }
)` },
        { type: 'note', value: 'A unique index on the lookup field is essential. Without it, two concurrent upserts can both insert.' },
      ],
    },
    {
      id: 'mongo-array-filters',
      title: 'arrayFilters',
      blocks: [
        { type: 'text', value: 'The positional $ updates the first match. arrayFilters updates every element that matches a condition inside an array.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.updateOne(
  { title: 'JavaScript' },
  { $inc: { 'lessons.$[lesson].minutes': 5 } },
  { arrayFilters: [{ 'lesson.minutes': { $lt: 15 } }] }
)` },
        { type: 'note', value: 'Test the filter with a find first. An array filter that matches nothing silently changes nothing.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'updates',
      q: 'Which operator increments a number?',
      options: ['$set', '$inc', '$push', '$unset'],
      answer: 1,
      explain: '$inc adds to the current value atomically.',
    },
    {
      chapterId: 'updates',
      q: 'Which operator adds only when missing?',
      options: ['$push', '$addToSet', '$pull', '$pop'],
      answer: 1,
      explain: '$addToSet avoids duplicate values.',
    },
    {
      chapterId: 'updates',
      q: 'What does upsert do?',
      options: ['Deletes then inserts', 'Inserts when no document matches', 'Updates every document', 'Creates an index'],
      answer: 1,
      explain: 'It combines update and insert.',
    },
    {
      chapterId: 'updates',
      q: 'What is arrayFilters for?',
      options: ['Sorting arrays', 'Updating multiple matching array elements', 'Creating an index', 'Removing a field'],
      answer: 1,
      explain: 'It selects array elements by a condition.',
    },
  ],
};
