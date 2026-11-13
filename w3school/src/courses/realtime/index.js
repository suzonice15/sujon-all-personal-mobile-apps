// WebSockets & Realtime course. Protocol, server, client, scaling,
// presence, patterns and reliability.

import gettingStarted from './getting-started';
import protocol from './protocol';
import server from './server';
import client from './client';
import scaling from './scaling';
import presenceRooms from './presence-rooms';
import patterns from './patterns';
import securityReliability from './security-reliability';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  protocol,
  server,
  client,
  scaling,
  presenceRooms,
  patterns,
  securityReliability,
  projectsInterview,
];

export default {
  id: 'realtime',
  title: 'WebSockets & Realtime',
  short: 'Realtime',
  tagline: 'Live updates, presence and scaling real-time apps',
  color: '#F59E0B',
  icon: 'bolt',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
