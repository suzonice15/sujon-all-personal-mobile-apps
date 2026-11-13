// GraphQL course. A query language for APIs: schema, queries, mutations,
// subscriptions, resolvers and Apollo.
//
// GraphQL samples use lang: 'text' for schema and 'js' for resolver code.

import gettingStarted from './getting-started';
import schemaTypes from './schema-types';
import queries from './queries';
import mutations from './mutations';
import subscriptions from './subscriptions';
import resolvers from './resolvers';
import apolloServer from './apollo-server';
import apolloClient from './apollo-client';
import authSecurity from './auth-security';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  schemaTypes,
  queries,
  mutations,
  subscriptions,
  resolvers,
  apolloServer,
  apolloClient,
  authSecurity,
  projectsInterview,
];

export default {
  id: 'graphql',
  title: 'GraphQL',
  short: 'GraphQL',
  tagline: 'Query exactly what you need from your API',
  color: '#E10098',
  icon: 'api',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
