// C chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Your first C program, compilation and the memory model',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'c-what-is',
      title: 'What is C?',
      blocks: [
        { type: 'text', value: 'C is a small, fast, compiled language created in the 1970s. It gives direct access to memory, which makes it the language of operating systems, embedded devices and language runtimes.' },
        { type: 'list', items: [
          'Compiles to native machine code',
          'Manual memory management with malloc and free',
          'Pointers expose addresses and arrays',
          'A small standard library, so you build more yourself',
        ] },
        { type: 'note', value: 'C does not protect you. An out-of-bounds write can crash the program or corrupt data silently. That is the point: you learn what memory actually is.' },
      ],
    },
    {
      id: 'c-first-program',
      title: 'Your first program',
      blocks: [
        { type: 'text', value: 'Every C program starts at main. printf is declared in stdio.h. The return value tells the operating system whether the program succeeded.' },
        { type: 'code', lang: 'c', tryIt: false, value: `#include <stdio.h>

int main(void) {
    printf("Hello, C!\\n");
    return 0;
}` },
        { type: 'list', items: [
          '#include brings in a header',
          'int main(void) takes no arguments',
          'printf writes formatted text to stdout',
          'return 0 means success',
        ] },
        { type: 'note', value: 'The \\n is a real newline. Without it the next output starts on the same line.' },
      ],
    },
    {
      id: 'c-compile-run',
      title: 'Compile and run',
      blocks: [
        { type: 'text', value: 'A C compiler turns source into an executable. Use warnings from the start; they catch many bugs before the program runs.' },
        { type: 'code', lang: 'text', tryIt: false, value: `gcc -Wall -Wextra -std=c17 main.c -o main
./main

# With sanitizers during development
gcc -Wall -Wextra -fsanitize=address,undefined main.c -o main` },
        { type: 'text', value: '-Wall -Wextra enable warnings. The address sanitizer catches out-of-bounds access and use-after-free at runtime. Both are essential while learning.' },
        { type: 'note', value: 'A warning is not harmless. Treat warnings as errors in a real project with -Werror, or you will ship undefined behaviour.' },
      ],
    },
    {
      id: 'c-memory-model',
      title: 'The memory model',
      blocks: [
        { type: 'text', value: 'A running C program uses several memory regions. Knowing which one a variable lives in explains lifetime and the classic bugs.' },
        { type: 'list', items: [
          'Code - the compiled instructions',
          'Static / global - variables that live for the whole program',
          'Stack - local variables and function frames, grows and shrinks automatically',
          'Heap - memory you request with malloc and release with free',
        ] },
        { type: 'text', value: 'Every variable lives in one of those regions. Pointers hold an address in that memory, which is why C can be both powerful and dangerous.' },
        { type: 'note', value: 'A local array lives on the stack and disappears when the function returns. Returning a pointer to it is a classic bug.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'Which function is the entry point of a C program?',
      options: ['start', 'main', 'run', 'init'],
      answer: 1,
      explain: 'Execution begins at main.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does #include <stdio.h> do?',
      options: ['Runs a program', 'Includes declarations for input and output', 'Creates a variable', 'Compiles the file'],
      answer: 1,
      explain: 'It brings in printf, scanf and related declarations.',
    },
    {
      chapterId: 'getting-started',
      q: 'Where do local variables live?',
      options: ['The heap', 'The stack', 'The code segment', 'The disk'],
      answer: 1,
      explain: 'Locals are stored in the function frame on the stack.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why use -Wall -Wextra?',
      options: ['To make the program faster', 'To enable compiler warnings', 'To link a library', 'To create a header'],
      answer: 1,
      explain: 'Warnings reveal suspicious code before it becomes a runtime bug.',
    },
  ],
};
