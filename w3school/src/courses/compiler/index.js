// Compiler Design course. Small JavaScript examples run in the Try-it preview;
// larger compiler stages are shown as read-only code.

import gettingStarted from './getting-started';
import lexing from './lexing';
import parsing from './parsing';
import semantics from './semantics';
import ir from './ir';
import optimization from './optimization';
import codegen from './codegen';
import interpreters from './interpreters';
import tools from './tools';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  lexing,
  parsing,
  semantics,
  ir,
  optimization,
  codegen,
  interpreters,
  tools,
  projectsInterview,
];

export default {
  id: 'compiler',
  title: 'Compiler Design',
  short: 'Compiler',
  tagline: 'Turn source code into a tree, an IR and a running program',
  color: '#B45309',
  icon: 'build',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
