// OS chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What an OS does, kernel mode and system calls',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'os-what-is',
      title: 'What is an operating system?',
      blocks: [
        { type: 'text', value: 'An operating system manages the hardware and gives programs a safe, convenient interface. It decides which process runs, which memory it sees and how it talks to devices.' },
        { type: 'list', items: [
          'Process and CPU scheduling',
          'Memory allocation and protection',
          'Filesystems and storage',
          'Device drivers and I/O',
          'Users, permissions and isolation',
          'Networking and security',
        ] },
        { type: 'note', value: 'Applications do not touch hardware directly. They ask the kernel through system calls, and the kernel enforces the rules.' },
      ],
    },
    {
      id: 'os-kernel-user',
      title: 'Kernel mode and user mode',
      blocks: [
        { type: 'text', value: 'The CPU has privilege levels. User code runs in user mode with limited instructions. The kernel runs in kernel mode and can access devices and page tables.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <unistd.h>
#include <stdio.h>

int main(void) {
    // ask the kernel to write to stdout
    write(1, "hello from user mode\\n", 21);
    return 0;
}` },
        { type: 'note', value: 'A system call switches to kernel mode, does the work and returns. It is the controlled doorway between an app and the hardware.' },
      ],
    },
    {
      id: 'os-syscalls-boot',
      title: 'System calls and boot',
      blocks: [
        { type: 'text', value: 'Common system calls are open, read, write, fork, exec and wait. Booting loads the kernel, initialises devices, mounts the root filesystem and starts the first process.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `strace -c ./app
# syscall summary: openat, read, write, mmap, ...

dmesg | head
systemctl list-units --type=service --state=running` },
        { type: 'note', value: 'strace is the fastest way to see what a program actually asks the kernel for, including files, sockets and permissions.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What is the kernel?',
      options: ['A user app', 'The privileged core that manages hardware', 'A file', 'A compiler'],
      answer: 1,
      explain: 'It runs in kernel mode and enforces rules.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is a system call?',
      options: ['A function in user space', 'A controlled request to the kernel', 'A network protocol', 'A database'],
      answer: 1,
      explain: 'It switches into kernel mode to perform the operation.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which tool shows syscalls?',
      options: ['strace', 'ls', 'git', 'npm'],
      answer: 0,
      explain: 'strace traces system calls.',
    },
  ],
};
