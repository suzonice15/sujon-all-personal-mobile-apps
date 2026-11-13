// GraphQL chapter: Queries.

export default {
  id: 'queries',
  title: 'Queries',
  description: 'Fields, arguments, aliases, fragments and variables',
  icon: 'search',
  lessons: [
    {
      id: 'gql-fields-args',
      title: 'Fields and arguments',
      blocks: [
        { type: 'text', value: 'A query names the fields it wants. Arguments filter or shape the result. You can ask for nested fields, and the server resolves each one.' },
        { type: 'code', lang: 'text', tryIt: false, value: `query {
  course(id: "1") {
    title
    price
    lessons {
      title
      completed
    }
  }
}` },
        { type: 'note', value: 'Only the requested fields are returned. This is how GraphQL avoids over-fetching.' },
      ],
    },
    {
      id: 'gql-aliases-fragments',
      title: 'Aliases and fragments',
      blocks: [
        { type: 'text', value: 'An alias renames a field in the response, which is useful when you query the same field twice with different arguments. A fragment is a reusable set of fields.' },
        { type: 'code', lang: 'text', tryIt: false, value: `query {
  cheap: courses(priceLessThan: 5000) { title price }
  expensive: courses(priceGreaterThan: 10000) { title price }
}

fragment CourseFields on Course {
  id
  title
  price
}

query {
  courses { ...CourseFields }
}` },
        { type: 'note', value: 'Fragments keep queries DRY. Define them once and reuse them across queries.' },
      ],
    },
    {
      id: 'gql-variables',
      title: 'Variables',
      blocks: [
        { type: 'text', value: 'Variables move dynamic values out of the query string. The query becomes reusable, and the server can cache the parsed query. Variables are declared with a type and passed separately.' },
        { type: 'code', lang: 'text', tryIt: false, value: `query GetCourse($id: ID!) {
  course(id: $id) {
    title
    price
    lessons {
      title
    }
  }
}

# Variables (sent as JSON alongside the query)
{ "id": "1" }` },
        { type: 'list', items: [
          'Variables are typed and validated against the schema',
          'They keep queries cacheable and safe from injection',
          'Default values can be set in the schema or the query',
          'Required variables use !',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'queries',
      q: 'What does an alias do?',
      options: ['Renames a field in the response', 'Filters results', 'Creates an index', 'Deletes a field'],
      answer: 0,
      explain: 'An alias renames the field in the returned JSON.',
    },
    {
      chapterId: 'queries',
      q: 'Why use variables instead of inline values?',
      options: ['They are slower', 'They make queries reusable and cacheable', 'They skip validation', 'They remove types'],
      answer: 1,
      explain: 'Variables keep queries safe and cacheable.',
    },
    {
      chapterId: 'queries',
      q: 'What is a fragment?',
      options: ['A deleted field', 'A reusable set of fields', 'A mutation', 'An index'],
      answer: 1,
      explain: 'Fragments reduce repetition in queries.',
    },
    {
      chapterId: 'queries',
      q: 'What problem does GraphQL solve compared with REST?',
      options: ['It removes the need for a server', 'It lets the client ask for exactly the fields it needs', 'It replaces databases', 'It is always faster'],
      answer: 1,
      explain: 'The client controls the response shape.',
    },
  ],
};
