// Linux chapter: Processes.

export default {
  id: 'processes',
  title: 'Processes',
  description: 'Inspect, stop and keep processes running',
  icon: 'memory',
  lessons: [
    {
      id: 'linux-ps-top',
      title: 'ps and top',
      blocks: [
        { type: 'text', value: 'Every running program is a process with a PID. ps gives a snapshot; top or htop updates live. Look at CPU, memory and the command name.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ps aux
ps aux | grep node
top
htop` },
        { type: 'list', items: [
          'PID - process id',
          'USER - owner',
          '%CPU and %MEM - resource use',
          'STAT - state, such as sleeping or running',
          'COMMAND - the command line',
        ] },
      ],
    },
    {
      id: 'linux-kill',
      title: 'Signals and kill',
      blocks: [
        { type: 'text', value: 'kill sends a signal. SIGTERM (15) asks the process to stop gracefully. SIGKILL (9) forces it and cannot be caught. Try SIGTERM first.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `kill 1234          # SIGTERM
kill -15 1234      # same
kill -9 1234       # force, last resort
pkill -f "node server.js"` },
        { type: 'note', value: 'SIGKILL does not let the process clean up. It can leave temp files, locks or a half-written database.' },
      ],
    },
    {
      id: 'linux-jobs',
      title: 'Background jobs',
      blocks: [
        { type: 'text', value: 'A trailing & starts a job in the background. jobs lists them, fg brings one forward, and bg resumes a stopped one.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `sleep 60 &
jobs
fg %1
bg %1
kill %1` },
        { type: 'note', value: 'A background job still dies when the terminal closes unless you use nohup, disown, screen or tmux.' },
      ],
    },
    {
      id: 'linux-nohup-tmux',
      title: 'Long-running processes',
      blocks: [
        { type: 'text', value: 'On a server, use a process manager or a terminal multiplexer. nohup survives logout; tmux and screen let you reconnect to a session.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `nohup node server.js > app.log 2>&1 &

# tmux
tmux new -s api
# detach with Ctrl-b then d
tmux attach -t api` },
        { type: 'note', value: 'For production, use systemd or a container platform instead of nohup. They restart the process and capture logs properly.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'processes',
      q: 'What identifies a process?',
      options: ['UID', 'PID', 'GID', 'TTY'],
      answer: 1,
      explain: 'The process id (PID) is unique while the process runs.',
    },
    {
      chapterId: 'processes',
      q: 'Which signal asks a process to stop gracefully?',
      options: ['SIGKILL', 'SIGTERM', 'SIGSTOP', 'SIGHUP'],
      answer: 1,
      explain: 'SIGTERM can be caught for cleanup; SIGKILL cannot.',
    },
    {
      chapterId: 'processes',
      q: 'What does a trailing & do?',
      options: ['Runs the command in the background', 'Redirects output', 'Stops the process', 'Joins two commands'],
      answer: 0,
      explain: 'The shell starts the job in the background.',
    },
    {
      chapterId: 'processes',
      q: 'What does tmux let you do?',
      options: ['Compile code', 'Detach and reattach to a terminal session', 'Create users', 'Change permissions'],
      answer: 1,
      explain: 'The session keeps running after you disconnect.',
    },
  ],
};
