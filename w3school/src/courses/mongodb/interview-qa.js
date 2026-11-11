// MongoDB interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'When would you choose MongoDB over PostgreSQL?',
      a: 'When the data is naturally document-shaped, the schema changes often, or nested data is always read together. PostgreSQL is stronger when you need complex joins, strict constraints and mature transactions.',
      level: 'intermediate',
    },
    {
      q: 'What is a document?',
      a: 'A BSON object with field-value pairs, nested documents and arrays. It is the unit of storage and query in MongoDB.',
      level: 'basic',
    },
    {
      q: 'Does MongoDB have a schema?',
      a: 'It has a flexible schema, not no schema. Documents can vary, but you still design fields, indexes and validators. Optional JSON schema validation enforces rules.',
      level: 'basic',
    },
    {
      q: 'What is the _id field?',
      a: 'A unique identifier for each document. If you do not provide one, the driver generates an ObjectId.',
      level: 'basic',
    },
  ],
  documents: [
    {
      q: 'What is BSON?',
      a: 'A binary document format that extends JSON with types such as Date, ObjectId, Decimal128 and binary data.',
      level: 'basic',
    },
    {
      q: 'What is the document size limit?',
      a: '16 MB. An unbounded embedded array will eventually hit it, so reference or bucket large data.',
      level: 'intermediate',
    },
    {
      q: 'When use Decimal128?',
      a: 'For money and exact decimals. Doubles cannot represent every decimal exactly and accumulate rounding errors.',
      level: 'intermediate',
    },
    {
      q: 'What does the positional $ operator do?',
      a: 'It updates the first array element that matched the query condition. arrayFilters handles multiple or more complex matches.',
      level: 'advanced',
    },
  ],
  crud: [
    {
      q: 'insertOne versus insertMany?',
      a: 'insertOne inserts a single document. insertMany inserts an array in one round trip and is much faster for seeds and imports.',
      level: 'basic',
    },
    {
      q: 'What does updateOne return?',
      a: 'An object with matchedCount, modifiedCount and upsertedId. matchedCount can be greater than modifiedCount when values did not change.',
      level: 'intermediate',
    },
    {
      q: 'How do you avoid deleting everything by accident?',
      a: 'Run the filter as a find first, check the count, and only then run deleteMany. Never run an empty filter unless you mean all documents.',
      level: 'basic',
    },
    {
      q: 'What does ordered: false do on insertMany?',
      a: 'It continues inserting after a duplicate or error instead of stopping at the first failure. The result reports the errors.',
      level: 'advanced',
    },
  ],
  queries: [
    {
      q: 'How do you query a range?',
      a: 'Use $gte and $lte on the same field, for example { price: { $gte: 3000, $lte: 7000 } }.',
      level: 'basic',
    },
    {
      q: 'What is the difference between $in and $or?',
      a: '$in matches one field against a list. $or combines separate conditions, possibly on different fields.',
      level: 'intermediate',
    },
    {
      q: 'Why is a leading-wildcard regex slow?',
      a: 'A normal index is sorted by prefix, so a pattern starting with .* cannot use it and the server scans documents. Use a text index for search.',
      level: 'intermediate',
    },
    {
      q: 'How do you paginate efficiently?',
      a: 'Use a range cursor such as _id > lastId with a sort and limit. A large skip still walks the skipped documents.',
      level: 'advanced',
    },
  ],
  updates: [
    {
      q: 'What is the difference between $set and $unset?',
      a: '$set creates or updates a field. $unset removes it.',
      level: 'basic',
    },
    {
      q: 'Why use $addToSet instead of $push?',
      a: '$addToSet only adds a value if it is not already present, so repeated requests do not create duplicates.',
      level: 'intermediate',
    },
    {
      q: 'What does upsert do?',
      a: 'It inserts a document when no existing document matches the filter, which makes sync jobs idempotent.',
      level: 'intermediate',
    },
    {
      q: 'Why is a unique index important with upsert?',
      a: 'Two concurrent upserts can both insert when there is no unique constraint. The index forces one to fail and retry.',
      level: 'advanced',
    },
  ],
  indexes: [
    {
      q: 'What does COLLSCAN mean in explain?',
      a: 'The query scanned every document instead of using an index. It is a performance warning on a large collection.',
      level: 'basic',
    },
    {
      q: 'What is a compound index?',
      a: 'An index over several fields. It supports queries that use a prefix of the indexed fields, so order matters.',
      level: 'intermediate',
    },
    {
      q: 'What is the ESR rule?',
      a: 'Equality, Sort, Range: order compound index fields with equality fields first, then the sort field, then range fields.',
      level: 'advanced',
    },
    {
      q: 'What is the cost of an index?',
      a: 'Every write updates the index, and the index uses memory and disk. Unused indexes are pure overhead.',
      level: 'intermediate',
    },
  ],
  aggregation: [
    {
      q: 'What is an aggregation pipeline?',
      a: 'A sequence of stages that transform documents. Each stage takes the output of the previous one.',
      level: 'basic',
    },
    {
      q: 'Which stages filter and group?',
      a: '$match filters documents. $group aggregates by a key, similar to SQL GROUP BY.',
      level: 'basic',
    },
    {
      q: 'What does $lookup do?',
      a: 'It performs a left outer join with another collection, optionally with a pipeline for complex conditions.',
      level: 'intermediate',
    },
    {
      q: 'Why put $match first?',
      a: 'It reduces the documents later stages process and can use an index only as the first stage.',
      level: 'advanced',
    },
  ],
  'schema-design': [
    {
      q: 'Embed or reference?',
      a: 'Embed data that is read together and bounded. Reference data that is large, shared, changes independently or is queried on its own.',
      level: 'intermediate',
    },
    {
      q: 'How do you model many-to-many?',
      a: 'With a junction collection that stores one document per pair, plus relationship fields. Index both sides and make the pair unique.',
      level: 'intermediate',
    },
    {
      q: 'What is the subset pattern?',
      a: 'Keep a small bounded subset of a large array in the parent document and the full data elsewhere. It keeps documents small and reads fast.',
      level: 'advanced',
    },
    {
      q: 'Why is duplicated data risky?',
      a: 'Copies can drift out of sync. Every duplicated field needs a defined update path.',
      level: 'basic',
    },
  ],
  'node-driver': [
    {
      q: 'How many MongoClient instances should an app create?',
      a: 'One per process. The client manages a connection pool and should be reused across requests.',
      level: 'basic',
    },
    {
      q: 'How do you run a multi-document transaction?',
      a: 'Start a session, run the operations with the session inside withTransaction, and let the driver commit or abort.',
      level: 'intermediate',
    },
    {
      q: 'What should every operation inside a transaction receive?',
      a: 'The session object. Without it the operation runs outside the transaction.',
      level: 'advanced',
    },
    {
      q: 'How do you translate a duplicate key error?',
      a: 'Check the error code for a unique index violation and return a 409 Conflict with a safe message.',
      level: 'intermediate',
    },
  ],
  atlas: [
    {
      q: 'What is Atlas?',
      a: 'A managed MongoDB cloud service that handles clusters, backups, monitoring and access control.',
      level: 'basic',
    },
    {
      q: 'What network access rule is safe?',
      a: 'Allow only the specific server or office IPs. 0.0.0.0/0 exposes the database to the whole internet.',
      level: 'intermediate',
    },
    {
      q: 'What role should the app database user have?',
      a: 'readWrite on its own database only. Admin and root roles are for operators, not application code.',
      level: 'intermediate',
    },
    {
      q: 'How do you prove a backup works?',
      a: 'Restore it to a test cluster and verify the data. A backup that has never been restored is unverified.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you design a course platform schema?',
      a: 'users, courses with embedded bounded lessons, and an enrollments junction collection with studentId, courseId, score and timestamps. Unique indexes on email, slug and the enrollment pair.',
      level: 'advanced',
    },
    {
      q: 'How do you get the average score per course?',
      a: 'Aggregate enrollments with $group by courseId and $avg on score, then $sort. Add $lookup to fetch the course title.',
      level: 'intermediate',
    },
    {
      q: 'How do you make enrollment idempotent?',
      a: 'Use an upsert keyed by studentId and courseId with a unique compound index.',
      level: 'intermediate',
    },
    {
      q: 'What would you check in a MongoDB production review?',
      a: 'Indexes matched to queries, unique constraints, validation, least-privilege users, IP allow-list, backups with restore tests and slow-query monitoring.',
      level: 'advanced',
    },
  ],
};
