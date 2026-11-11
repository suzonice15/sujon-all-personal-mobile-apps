// MongoDB chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Documents, collections and MongoDB versus SQL',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'mongo-what-is',
      title: 'What is MongoDB?',
      blocks: [
        { type: 'text', value: 'MongoDB is a document database. Data is stored as BSON documents inside collections. A document is close to a JSON object, with nested fields and arrays.' },
        { type: 'list', items: [
          'Database contains collections',
          'Collection contains documents',
          'Document contains fields and values',
          '_id uniquely identifies a document',
          'No fixed schema: documents in a collection may differ',
        ] },
        { type: 'note', value: 'No fixed schema does not mean no design. A good schema still needs consistent fields and indexes.' },
      ],
    },
    {
      id: 'mongo-vs-sql',
      title: 'MongoDB versus SQL',
      blocks: [
        { type: 'list', items: [
          'Table -> collection',
          'Row -> document',
          'Column -> field',
          'JOIN -> embedding or $lookup',
          'Transaction -> multi-document transaction',
          'Schema migration -> schema versioning in documents',
        ] },
        { type: 'code', lang: 'text', tryIt: false, value: `SQL:  courses(id, title, price)
Mongo: { _id: ObjectId("..."), title: "SQL", price: 5000 }` },
        { type: 'note', value: 'MongoDB is not always faster than SQL. Choose it when the data is naturally document-shaped or the schema changes often.' },
      ],
    },
    {
      id: 'mongo-install',
      title: 'Install and connect',
      blocks: [
        { type: 'text', value: 'Use MongoDB Atlas for a free cloud cluster, or run a local server. mongosh is the shell; MongoDB Compass is the GUI.' },
        { type: 'code', lang: 'mongosh', tryIt: false, value: `mongosh "mongodb://localhost:27017"

show dbs
use codenest
db.courses.insertOne({ title: 'SQL', price: 5000 })
db.courses.find()
show collections` },
        { type: 'note', value: 'The connection string contains credentials. Keep it in an environment variable and never commit it.' },
      ],
    },
    {
      id: 'mongo-tools',
      title: 'Tools',
      blocks: [
        { type: 'list', items: [
          'mongosh - the shell',
          'MongoDB Compass - GUI for queries and schema',
          'Atlas - managed clusters and backups',
          'mongodump / mongorestore - backup and restore',
          'Mongoose - ODM for Node with schemas',
          'MongoDB Node driver - official low-level client',
        ] },
        { type: 'note', value: 'Learn the shell first. An ODM hides the query language, and you need the query language to debug performance.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is a collection?',
      options: ['A row', 'A group of documents', 'A database server', 'An index only'],
      answer: 1,
      explain: 'A collection holds documents, like a table holds rows.',
    },
    {
      chapterId: 'getting-started',
      q: 'What format does MongoDB store?',
      options: ['CSV', 'BSON', 'XML', 'YAML'],
      answer: 1,
      explain: 'BSON is a binary JSON-like format with extra types.',
    },
    {
      chapterId: 'getting-started',
      q: 'What identifies a document uniquely?',
      options: ['title', 'price', '_id', 'collection'],
      answer: 2,
      explain: 'Every document has an _id, generated if not supplied.',
    },
    {
      chapterId: 'getting-started',
      q: 'When is MongoDB a good fit?',
      options: ['For naturally document-shaped or fast-changing data', 'For every project', 'Only for images', 'Only for reports'],
      answer: 0,
      explain: 'The document model fits nested, varied data well.',
    },
  ],
};
