// OS chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Run process and memory labs, then prepare',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'os-project-process',
      title: 'Lab: processes',
      blocks: [
        { type: 'text', value: 'Run a program that forks, observe the parent and child, then kill it and inspect the state. This makes process creation and signals concrete.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();

    if (pid == 0) {
        printf("child pid=%d\\n", getpid());
    } else {
        printf("parent pid=%d child=%d\\n", getpid(), pid);
        wait(NULL);
    }
    return 0;
}` },
        { type: 'code', lang: 'bash', tryIt: false, value: `gcc fork.c -o fork && ./fork
ps -o pid,ppid,stat,cmd -p $$
kill -TERM <pid>` },
        { type: 'note', value: 'A zombie is a child that exited but the parent has not waited. The fix is wait() in the parent, not killing the zombie.' },
      ],
    },
    {
      id: 'os-project-memory',
      title: 'Lab: memory and CPU',
      blocks: [
        { type: 'text', value: 'Watch a process use memory, then force swapping and observe the slowdown. Measure CPU with time and perf. Numbers make the theory real.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `time ./app
/usr/bin/time -v ./app

free -h
vmstat 1
pidstat -r -p <pid> 1

perf stat ./app` },
        { type: 'note', value: 'Wall time includes waiting; user and sys time show CPU work. A program with high sys time is spending time in the kernel.' },
      ],
    },
    {
      id: 'os-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'Process versus thread?',
          'What is a context switch?',
          'Virtual memory and page tables?',
          'What is a page fault?',
          'Mutex versus semaphore?',
          'What are the four deadlock conditions?',
          'Inode versus filename?',
          'Interrupt versus polling?',
          'VM versus container?',
          'How do you debug high CPU or memory?',
        ] },
        { type: 'text', value: 'Strong answers connect the mechanism to a cost. "A context switch saves registers and switches page tables, so it is not free" is better than "the OS switches processes".' },
        { type: 'note', value: 'Be ready to describe how you would find a process using port 3000 or why a machine is swapping.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'What does fork create?',
      options: ['A thread', 'A new process', 'A file', 'A socket'],
      answer: 1,
      explain: 'It duplicates the calling process.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What is a zombie process?',
      options: ['A running process', 'An exited child not yet waited on', 'A kernel thread', 'A container'],
      answer: 1,
      explain: 'The parent must call wait().',
    },
    {
      chapterId: 'projects-interview',
      q: 'Which command finds a process on port 3000?',
      options: ['ls', 'lsof -i :3000', 'cat', 'git'],
      answer: 1,
      explain: 'lsof lists the open socket and process.',
    },
  ],
};
