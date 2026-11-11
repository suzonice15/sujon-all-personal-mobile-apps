// Linux & Bash course. Commands are shown as read-only shell samples; the app
// has no real shell, so every block is `lang: 'bash'` with tryIt disabled.

import gettingStarted from './getting-started';
import filesDirectories from './files-directories';
import viewingFiles from './viewing-files';
import permissions from './permissions';
import pipesRedirection from './pipes-redirection';
import processes from './processes';
import networking from './networking';
import packageManagement from './package-management';
import bashScripting from './bash-scripting';
import cronSystemd from './cron-systemd';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  filesDirectories,
  viewingFiles,
  permissions,
  pipesRedirection,
  processes,
  networking,
  packageManagement,
  bashScripting,
  cronSystemd,
  projectsInterview,
];

export default {
  id: 'linux',
  title: 'Linux & Bash',
  short: 'Linux',
  tagline: 'Master the terminal, files, processes and shell scripts',
  color: '#FCC624',
  icon: 'terminal',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
