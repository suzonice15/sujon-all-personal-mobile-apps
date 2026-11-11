// MongoDB chapter: CRUD.

export default {
  id: 'crud',
  title: 'CRUD',
  description: 'Insert, find, update and delete documents',
  icon: 'edit',
  lessons: [
    {
      id: 'mongo-insert',
      title: 'Insert',
      blocks: [
        { type: 'text', value: 'insertOne adds one document, insertMany adds several. MongoDB generates an _id if you do not supply one. insertMany is ordered by default; pass ordered: false to continue after a duplicate.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.insertOne({ title: 'SQL', price: 5000 })

db.courses.insertMany([
  { title: 'CSS', price: 3500 },
  { title: 'React', price: 7000 }
])` },
        { type: 'note', value: 'Use insertMany for seeds and imports. It reduces round trips and is much faster than a loop of insertOne calls.' },
      ],
    },
    {
      id: 'mongo-find',
      title: 'Find',
      blocks: [
        { type: 'text', value: 'find returns a cursor. findOne returns a single document or null. Use a projection to return only the fields you need.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.find()
db.courses.find({ price: { $gte: 5000 } })
db.courses.find({}, { title: 1, price: 1, _id: 0 })
db.courses.findOne({ title: 'SQL' })
db.courses.countDocuments({ price: { $gt: 3000 } })` },
        { type: 'note', value: 'A projection reduces network and memory cost. Select only the fields the screen needs, just like SELECT columns in SQL.' },
      ],
    },
    {
      id: 'mongo-update-delete',
      title: 'Update and delete',
      blocks: [
        { type: 'text', value: 'updateOne changes the first match, updateMany changes all matches. deleteOne and deleteMany remove documents. Check the matchedCount and modifiedCount in the result.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.updateOne(
  { title: 'SQL' },
  { $set: { price: 5500 } }
)

db.courses.updateMany(
  { price: { $lt: 4000 } },
  { $inc: { price: 500 } }
)

db.courses.deleteOne({ title: 'CSS' })
db.courses.deleteMany({ archived: true })` },
        { type: 'note', value: 'Never run deleteMany with an empty filter unless you truly mean to delete every document. Test the filter with find first.' },
      ],
    },
    {
      id: 'mongo-crud-result',
      title: 'Reading the result',
      blocks: [
        { type: 'text', value: 'Write operations return a result object. matchedCount tells you how many documents matched; modifiedCount tells you how many actually changed. A match with no change has modifiedCount 0.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const result = {
  acknowledged: true,
  matchedCount: 3,
  modifiedCount: 1,
  upsertedId: null,
};

console.log(result.matchedCount, result.modifiedCount);` },
        { type: 'note', value: 'Log the counts in critical writes. A filter that matches zero documents is usually a bug, not a success.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'crud',
      q: 'Which method inserts several documents?',
      options: ['insertOne', 'insertMany', 'addAll', 'bulkInsert'],
      answer: 1,
      explain: 'insertMany takes an array of documents.',
    },
    {
      chapterId: 'crud',
      q: 'What does find return?',
      options: ['An array only', 'A cursor', 'A string', 'A backup'],
      answer: 1,
      explain: 'The cursor can be iterated or converted to an array.',
    },
    {
      chapterId: 'crud',
      q: 'What does updateOne change?',
      options: ['All matching documents', 'The first matching document', 'No documents', 'The collection'],
      answer: 1,
      explain: 'Use updateMany for every match.',
    },
    {
      chapterId: 'crud',
      q: 'What does modifiedCount tell you?',
      options: ['How many documents matched', 'How many documents actually changed', 'The collection size', 'The index count'],
      answer: 1,
      explain: 'A match with the same values is not modified.',
    },
  ],
};
