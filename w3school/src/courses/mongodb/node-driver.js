// MongoDB chapter: Node Driver.

export default {
  id: 'node-driver',
  title: 'MongoDB with Node',
  description: 'Connect, query and handle errors from an app',
  icon: 'code',
  lessons: [
    {
      id: 'mongo-node-connect',
      title: 'Connecting',
      blocks: [
        { type: 'text', value: 'Use the official mongodb driver. Create one client for the process, connect once, and reuse the database object across requests.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();

const db = client.db('codenest');
export const courses = db.collection('courses');` },
        { type: 'note', value: 'Do not open a new client per request. The driver maintains a pool; one client is the correct pattern.' },
      ],
    },
    {
      id: 'mongo-node-crud',
      title: 'CRUD from Node',
      blocks: [
        { type: 'text', value: 'The driver methods mirror the shell: insertOne, find, updateOne, deleteOne. find returns a cursor; call toArray or iterate it.' },
        { type: 'code', lang: 'js', tryIt: false, value: `await courses.insertOne({ title: 'SQL', price: 5000 });

const list = await courses.find({ price: { $gte: 3000 } }).toArray();
const one = await courses.findOne({ title: 'SQL' });

await courses.updateOne({ title: 'SQL' }, { $set: { price: 5500 } });
await courses.deleteOne({ title: 'SQL' });` },
        { type: 'note', value: 'Await every driver call and handle rejection. An unhandled promise rejection can crash the process on modern Node.' },
      ],
    },
    {
      id: 'mongo-node-transactions',
      title: 'Transactions',
      blocks: [
        { type: 'text', value: 'Multi-document transactions require a replica set (Atlas provides one). Use a session, commit on success and abort on failure.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const session = client.startSession();

try {
  await session.withTransaction(async () => {
    await accounts.updateOne({ _id: 1 }, { $inc: { balance: -100 } }, { session });
    await accounts.updateOne({ _id: 2 }, { $inc: { balance: 100 } }, { session });
  });
} finally {
  await session.endSession();
}` },
        { type: 'note', value: 'Pass the session to every operation in the transaction. Forgetting it moves the write outside the transaction.' },
      ],
    },
    {
      id: 'mongo-node-errors',
      title: 'Errors and validation',
      blocks: [
        { type: 'list', items: [
          'Duplicate key - unique index violation, usually a 409',
          'Validation failed - schema validator rejected the write',
          'Network timeout - retry with backoff for safe operations',
          'Write concern error - the write was not acknowledged as required',
          'Cast error - a value has the wrong BSON type',
        ] },
        { type: 'text', value: 'Translate driver errors into API errors. Do not leak collection names or query details to the client.' },
        { type: 'note', value: 'Check the error code rather than the message text. Messages change between versions; codes are stable.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'node-driver',
      q: 'How many MongoClient instances should an app create?',
      options: ['One per request', 'One per process', 'One per collection', 'One per query'],
      answer: 1,
      explain: 'The client manages a connection pool; reuse it.',
    },
    {
      chapterId: 'node-driver',
      q: 'What does a MongoDB cursor let you do?',
      options: ['Iterate results lazily', 'Create an index', 'Open a transaction', 'Delete a collection'],
      answer: 0,
      explain: 'Call toArray or iterate the cursor to read results.',
    },
    {
      chapterId: 'node-driver',
      q: 'What is required for multi-document transactions?',
      options: ['A replica set', 'A single server', 'No index', 'A text index'],
      answer: 0,
      explain: 'Transactions require a replica set or sharded cluster.',
    },
    {
      chapterId: 'node-driver',
      q: 'What should every operation inside a transaction receive?',
      options: ['A new client', 'The session', 'A new database', 'A backup'],
      answer: 1,
      explain: 'The session ties the operations to the transaction.',
    },
  ],
};
