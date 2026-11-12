// PostgreSQL chapter: Data Types.

export default {
  id: 'data-types',
  title: 'Data Types',
  description: 'JSONB, arrays, enums, ranges and UUID',
  icon: 'category',
  lessons: [
    {
      id: 'pg-jsonb',
      title: 'JSONB',
      blocks: [
        { type: 'text', value: 'JSONB stores JSON in a binary, indexed form. You can query inside it with the -> and ->> operators. It is useful for flexible, semi-structured data such as settings or event payloads.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    payload JSONB NOT NULL
);

INSERT INTO events (payload) VALUES
  ('{"user": "Ayesha", "action": "login", "meta": {"ip": "10.0.0.1"}}'),
  ('{"user": "Rahim", "action": "logout"}');

SELECT payload -> 'user' AS user,
       payload ->> 'action' AS action,
       payload -> 'meta' ->> 'ip' AS ip
FROM events;

SELECT * FROM events
WHERE payload @> '{"action": "login"}';` },
        { type: 'note', value: '-> returns JSON; ->> returns text. Use @> to test whether a JSONB value contains a given object.' },
      ],
    },
    {
      id: 'pg-arrays-enums',
      title: 'Arrays and enums',
      blocks: [
        { type: 'text', value: 'PostgreSQL arrays hold multiple values of one type in a column. Enums define a fixed set of allowed values. Both keep data close to the database instead of in application code.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE TYPE course_level AS ENUM ('beginner', 'intermediate', 'advanced');

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    level course_level NOT NULL DEFAULT 'beginner'
);

INSERT INTO courses (title, tags, level)
VALUES ('Postgres', ARRAY['sql', 'database'], 'intermediate');

SELECT title, tags, level FROM courses
WHERE 'sql' = ANY(tags);` },
        { type: 'note', value: 'Arrays are flexible but harder to query and index than a separate table. Use them for small, bounded lists such as tags.' },
      ],
    },
    {
      id: 'pg-ranges-uuid',
      title: 'Ranges and UUID',
      blocks: [
        { type: 'text', value: 'Range types represent intervals, such as a booking from Monday to Friday. UUID gives globally unique identifiers without a central counter, which is useful for distributed systems.' },
        { type: 'code', lang: 'sql', tryIt: true, value: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room TEXT NOT NULL,
    during DATERANGE NOT NULL,
    EXCLUDE USING gist (room WITH =, during WITH &&)
);

INSERT INTO bookings (room, during)
VALUES ('A', '[2025-01-06, 2025-01-10)');

-- Overlapping booking for the same room is rejected by the exclusion constraint` },
        { type: 'note', value: 'The exclusion constraint prevents overlapping bookings at the database level, so no application race can create a double booking.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'data-types',
      q: 'What does ->> return?',
      options: ['JSON', 'Text', 'A number', 'An array'],
      answer: 1,
      explain: '->> extracts a JSON value as text.',
    },
    {
      chapterId: 'data-types',
      q: 'What is an enum useful for?',
      options: ['Storing any text', 'A fixed set of allowed values', 'Indexing', 'Sorting'],
      answer: 1,
      explain: 'An enum restricts a column to a defined list of values.',
    },
    {
      chapterId: 'data-types',
      q: 'Why use UUID for primary keys?',
      options: ['They are shorter', 'They are globally unique without a central counter', 'They sort faster', 'They are required'],
      answer: 1,
      explain: 'UUIDs can be generated anywhere without coordination.',
    },
    {
      chapterId: 'data-types',
      q: 'What does an exclusion constraint prevent here?',
      options: ['Duplicate titles', 'Overlapping bookings for the same room', 'Null values', 'Slow queries'],
      answer: 1,
      explain: 'The exclusion constraint rejects overlapping ranges.',
    },
  ],
};
