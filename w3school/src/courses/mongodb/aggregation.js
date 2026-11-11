// MongoDB chapter: Aggregation.

export default {
  id: 'aggregation',
  title: 'Aggregation',
  description: 'Pipelines, grouping and lookups',
  icon: 'filter-alt',
  lessons: [
    {
      id: 'mongo-pipeline',
      title: 'The pipeline',
      blocks: [
        { type: 'text', value: 'An aggregation pipeline passes documents through stages. Each stage transforms the stream: filter, group, sort, reshape. It is the MongoDB equivalent of SQL GROUP BY and joins.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.enrollments.aggregate([
  { $match: { score: { $gte: 60 } } },
  { $group: { _id: '$courseId', average: { $avg: '$score' }, count: { $sum: 1 } } },
  { $sort: { average: -1 } }
])` },
        { type: 'note', value: 'Put $match first so later stages process fewer documents. It can use an index only when it is the first stage.' },
      ],
    },
    {
      id: 'mongo-group-project',
      title: 'Group and project',
      blocks: [
        { type: 'text', value: '$group builds one document per key. $project reshapes the output: include, exclude, compute and rename fields.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.enrollments.aggregate([
  { $group: {
      _id: '$studentId',
      totalScore: { $sum: '$score' },
      courses: { $sum: 1 }
  } },
  { $project: {
      _id: 0,
      studentId: '$_id',
      totalScore: 1,
      courses: 1
  } },
  { $sort: { totalScore: -1 } },
  { $limit: 10 }
])` },
      ],
    },
    {
      id: 'mongo-lookup',
      title: '$lookup and $unwind',
      blocks: [
        { type: 'text', value: '$lookup joins another collection. $unwind turns an array into one document per element. Together they model a join and a one-to-many expansion.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.aggregate([
  { $lookup: {
      from: 'teachers',
      localField: 'teacherId',
      foreignField: '_id',
      as: 'teacher'
  } },
  { $unwind: '$teacher' },
  { $project: { title: 1, 'teacher.name': 1 } }
])` },
        { type: 'note', value: '$lookup is convenient but can be slow on large collections. Embed data that is always read together; reference data that changes independently.' },
      ],
    },
    {
      id: 'mongo-facet',
      title: '$facet',
      blocks: [
        { type: 'text', value: '$facet runs several pipelines over the same input and returns one document with each result. It is useful for a page that needs data, counts and filters in one round trip.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.aggregate([
  { $facet: {
      data: [{ $sort: { price: -1 } }, { $limit: 10 }],
      total: [{ $count: 'count' }],
      levels: [{ $group: { _id: '$level', count: { $sum: 1 } } }]
  } }
])` },
        { type: 'note', value: 'Facets still scan the same input multiple times. Measure before putting every dashboard widget into one pipeline.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'aggregation',
      q: 'Which stage filters documents?',
      options: ['$group', '$match', '$project', '$sort'],
      answer: 1,
      explain: '$match filters, similar to WHERE.',
    },
    {
      chapterId: 'aggregation',
      q: 'Which stage groups by a key and aggregates?',
      options: ['$group', '$lookup', '$unwind', '$limit'],
      answer: 0,
      explain: '$group builds one document per key.',
    },
    {
      chapterId: 'aggregation',
      q: 'What does $lookup do?',
      options: ['Sorts documents', 'Joins another collection', 'Deletes documents', 'Creates an index'],
      answer: 1,
      explain: 'It performs a left outer join.',
    },
    {
      chapterId: 'aggregation',
      q: 'Why put $match first?',
      options: ['It looks nicer', 'It reduces the documents later stages process and can use an index', 'It sorts the result', 'It creates a collection'],
      answer: 1,
      explain: 'Filtering early is cheaper and index-friendly.',
    },
  ],
};
