// MongoDB chapter: Queries.

export default {
  id: 'queries',
  title: 'Queries',
  description: 'Operators, projections, sorting and regex',
  icon: 'search',
  lessons: [
    {
      id: 'mongo-comparison',
      title: 'Comparison operators',
      blocks: [
        { type: 'list', items: [
          '$eq - equal (or just the value)',
          '$ne - not equal',
          '$gt, $gte - greater than',
          '$lt, $lte - less than',
          '$in, $nin - in a list or not',
        ] },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.find({ price: { $gte: 3000, $lte: 7000 } })
db.courses.find({ title: { $in: ['SQL', 'CSS'] } })
db.courses.find({ level: { $ne: 'advanced' } })` },
        { type: 'note', value: 'Multiple operators on one field live in the same object. That is an AND. Use $or at the top level for alternatives.' },
      ],
    },
    {
      id: 'mongo-logical',
      title: 'Logical and existence',
      blocks: [
        { type: 'text', value: '$and and $or combine conditions. $exists checks whether a field is present. $regex matches text patterns.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.find({
  $or: [{ price: { $lt: 3000 } }, { level: 'beginner' }]
})

db.courses.find({ certificate: { $exists: true } })
db.courses.find({ title: { $regex: '^java', $options: 'i' } })` },
        { type: 'note', value: 'A regex with a leading wildcard cannot use a normal index. For text search, use a text index instead.' },
      ],
    },
    {
      id: 'mongo-projection-sort',
      title: 'Projection, sort and pagination',
      blocks: [
        { type: 'text', value: 'The second argument to find is the projection. sort orders the cursor; skip and limit paginate. Sort before limit.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.find(
  { price: { $gte: 3000 } },
  { title: 1, price: 1, _id: 0 }
).sort({ price: -1 }).skip(0).limit(10)` },
        { type: 'note', value: 'A large skip is slow because the server still walks the skipped documents. Use a range cursor such as _id > lastId for deep pagination.' },
      ],
    },
    {
      id: 'mongo-text-search',
      title: 'Text search',
      blocks: [
        { type: 'text', value: 'A text index supports word search with relevance. It is not a regex replacement for every case, but it is the right tool for search boxes.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.createIndex({ title: 'text', description: 'text' })
db.courses.find(
  { $text: { $search: 'javascript async' } },
  { score: { $meta: 'textScore' } }
).sort({ score: { $meta: 'textScore' } })` },
        { type: 'note', value: 'A collection can have only one text index. Plan the fields before creating it.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'queries',
      q: 'Which operator checks a range?',
      options: ['$eq', '$gte', '$in', '$exists'],
      answer: 1,
      explain: '$gte and $lte define a range.',
    },
    {
      chapterId: 'queries',
      q: 'What does $exists check?',
      options: ['Whether a field is present', 'Whether a value is null', 'Whether an index exists', 'Whether a collection exists'],
      answer: 0,
      explain: 'It tests field presence.',
    },
    {
      chapterId: 'queries',
      q: 'What does the projection { title: 1, _id: 0 } do?',
      options: ['Returns only title', 'Returns every field', 'Deletes title', 'Sorts by title'],
      answer: 0,
      explain: '1 includes, 0 excludes. _id is included by default.',
    },
    {
      chapterId: 'queries',
      q: 'Why is a large skip slow?',
      options: ['It uses no index', 'The server walks the skipped documents', 'It sorts the collection', 'It locks the database'],
      answer: 1,
      explain: 'A range cursor avoids scanning the skipped rows.',
    },
  ],
};
