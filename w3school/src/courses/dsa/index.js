// Data Structures & Algorithms course. Every chapter lives in its own file;
// add a chapter by creating the file and listing it below.
//
// All examples are JavaScript so they run in the Try-it preview. The focus is
// on the idea (Big O, the data structure, the pattern), not on a language.

import gettingStarted from './getting-started';
import arraysStrings from './arrays-strings';
import linkedLists from './linked-lists';
import stacksQueues from './stacks-queues';
import hashMaps from './hash-maps';
import recursion from './recursion';
import sorting from './sorting';
import searching from './searching';
import trees from './trees';
import heaps from './heaps';
import graphs from './graphs';
import dynamicProgramming from './dynamic-programming';
import patternsInterview from './patterns-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  arraysStrings,
  linkedLists,
  stacksQueues,
  hashMaps,
  recursion,
  sorting,
  searching,
  trees,
  heaps,
  graphs,
  dynamicProgramming,
  patternsInterview,
];

export default {
  id: 'dsa',
  title: 'Data Structures & Algorithms',
  short: 'DSA',
  tagline: 'Think in Big O and solve problems that scale',
  color: '#7C3AED',
  icon: 'account-tree',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
