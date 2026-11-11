// MongoDB chapter: Documents.

export default {
  id: 'documents',
  title: 'Documents',
  description: 'BSON, nested fields, arrays and _id',
  icon: 'description',
  lessons: [
    {
      id: 'mongo-document-shape',
      title: 'Document shape',
      blocks: [
        { type: 'text', value: 'A document is an ordered set of field-value pairs. It can nest objects and contain arrays. That lets one document describe a whole entity without a join.' },
        { type: 'code', lang: 'text', tryIt: false, value: `{
  "_id": ObjectId("665f1a..."),
  "title": "SQL",
  "price": 5000,
  "tags": ["database", "sql"],
  "author": { "name": "Ayesha", "email": "ayesha@example.com" },
  "published": true,
  "createdAt": ISODate("2026-01-01T10:00:00Z")
}` },
        { type: 'note', value: 'Field order is preserved, but queries should not depend on it. Use field names, not positions.' },
      ],
    },
    {
      id: 'mongo-bson-types',
      title: 'BSON types',
      blocks: [
        { type: 'list', items: [
          'String, Number (int, long, double, decimal)',
          'Boolean, Date, Timestamp',
          'ObjectId, UUID',
          'Array, embedded document',
          'Null, Binary, Regex',
        ] },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.insertOne({
  title: 'MongoDB',
  price: NumberDecimal('4999.50'),
  createdAt: new Date(),
  tags: ['database', 'nosql'],
  meta: { level: 'beginner', hours: 6 }
})` },
        { type: 'note', value: 'Use Decimal128 for money. Doubles cannot represent every decimal exactly, the same problem as float in other languages.' },
      ],
    },
    {
      id: 'mongo-collections',
      title: 'Collections',
      blocks: [
        { type: 'text', value: 'A collection groups documents. Collections are created on first insert. You can create one explicitly with options such as a validator.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.createCollection('courses')
db.createCollection('users', {
  validator: { $jsonSchema: {
    bsonType: 'object',
    required: ['email'],
    properties: { email: { bsonType: 'string' } }
  } }
})

db.courses.drop()
show collections` },
        { type: 'note', value: 'A JSON schema validator gives you some of the safety of SQL without losing the flexible model. Use it for critical collections.' },
      ],
    },
    {
      id: 'mongo-embedded-arrays',
      title: 'Nested documents and arrays',
      blocks: [
        { type: 'text', value: 'Embed data that is read together. Arrays are first-class: you can query, index and update individual elements.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `db.courses.insertOne({
  title: 'JavaScript',
  lessons: [
    { id: 1, title: 'Variables', minutes: 12 },
    { id: 2, title: 'Functions', minutes: 18 }
  ]
})

db.courses.findOne({ 'lessons.id': 2 })
db.courses.updateOne(
  { title: 'JavaScript', 'lessons.id': 2 },
  { $set: { 'lessons.$.minutes': 20 } }
)` },
        { type: 'note', value: 'The positional $ operator updates the first matching array element. Use arrayFilters for more complex matches.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'documents',
      q: 'What is BSON?',
      options: ['A SQL dialect', 'A binary document format', 'A CSS framework', 'A backup tool'],
      answer: 1,
      explain: 'BSON extends JSON with binary and date types.',
    },
    {
      chapterId: 'documents',
      q: 'When is a collection created?',
      options: ['Only manually', 'On the first insert', 'At server start', 'On every query'],
      answer: 1,
      explain: 'MongoDB creates the collection automatically on insert.',
    },
    {
      chapterId: 'documents',
      q: 'Which type should store money?',
      options: ['double', 'int32 only', 'Decimal128', 'string'],
      answer: 2,
      explain: 'Decimal128 avoids floating-point rounding for currency.',
    },
    {
      chapterId: 'documents',
      q: 'What does the positional $ operator do?',
      options: ['Updates all documents', 'Updates the first matching array element', 'Deletes an array', 'Creates an index'],
      answer: 1,
      explain: 'It targets the array element that matched the query.',
    },
  ],
};
