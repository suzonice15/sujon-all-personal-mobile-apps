// Computer Networks course. Diagrams and protocol examples are read-only;
// command samples use the bash highlighter.

import gettingStarted from './getting-started';
import models from './models';
import ipAddressing from './ip-addressing';
import dns from './dns';
import http from './http';
import tcpUdp from './tcp-udp';
import tls from './tls';
import routing from './routing';
import tools from './tools';
import security from './security';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  models,
  ipAddressing,
  dns,
  http,
  tcpUdp,
  tls,
  routing,
  tools,
  security,
  projectsInterview,
];

export default {
  id: 'networks',
  title: 'Computer Networks',
  short: 'Networks',
  tagline: 'How data moves from a tap to a server and back',
  color: '#0EA5E9',
  icon: 'lan',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
