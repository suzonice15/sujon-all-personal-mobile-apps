// C interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is the difference between compilation and linking?',
      a: 'The compiler turns each .c file into an object file with machine code and unresolved symbols. The linker combines object files and libraries and resolves those symbols into one executable.',
      level: 'basic',
    },
    {
      q: 'What are the main memory regions of a C program?',
      a: 'Code, static/global data, the stack for locals and call frames, and the heap for malloc. Each has a different lifetime and failure mode.',
      level: 'intermediate',
    },
    {
      q: 'Why does C not check array bounds?',
      a: 'An array is just an address and a size known at compile time. Bounds checks would cost performance, so the language leaves safety to the programmer.',
      level: 'intermediate',
    },
    {
      q: 'What does undefined behaviour mean?',
      a: 'The standard imposes no requirements on what the program does. It may crash, produce garbage or appear to work. The compiler may also optimise based on the assumption that it never happens.',
      level: 'advanced',
    },
  ],
  'variables-types': [
    {
      q: 'What is the difference between float and double?',
      a: 'float is usually 4 bytes with about 7 significant digits. double is usually 8 bytes with about 15. double is the default for decimal literals and is preferred unless memory is tight.',
      level: 'basic',
    },
    {
      q: 'Why is sizeof important?',
      a: 'Type sizes vary by platform. sizeof gives the size in bytes on the current machine, so allocations and loops stay correct when types change.',
      level: 'basic',
    },
    {
      q: 'What is the difference between const and #define?',
      a: 'const is a typed variable checked by the compiler. #define is a textual replacement handled before compilation, with no type checking.',
      level: 'intermediate',
    },
    {
      q: 'What is integer overflow?',
      a: 'Arithmetic that exceeds the range of a signed type is undefined behaviour. Unsigned overflow wraps modulo 2^n. Check limits before doing arithmetic on untrusted values.',
      level: 'advanced',
    },
  ],
  'operators-control': [
    {
      q: 'What is the difference between = and ==?',
      a: '= assigns. == compares. Using = in an if condition is a common bug; enable -Wall to get a warning.',
      level: 'basic',
    },
    {
      q: 'What does break do in a switch?',
      a: 'It exits the switch. Without it, execution falls through into the next case.',
      level: 'basic',
    },
    {
      q: 'What is short-circuit evaluation?',
      a: 'In a && b, if a is false, b is not evaluated. In a || b, if a is true, b is not evaluated. This matters when b has side effects.',
      level: 'intermediate',
    },
    {
      q: 'Why is do/while useful?',
      a: 'It checks the condition after the body, so the body runs at least once. It fits input loops that must try once before deciding to repeat.',
      level: 'basic',
    },
  ],
  functions: [
    {
      q: 'What is a function prototype?',
      a: 'A declaration of the function signature before its definition. It lets the compiler check calls and lets main call a function defined later.',
      level: 'basic',
    },
    {
      q: 'How does C pass arguments?',
      a: 'By value. Primitives are copied. Arrays decay to a pointer, so the function can change the elements. Pass a pointer to modify a caller variable.',
      level: 'intermediate',
    },
    {
      q: 'What does static mean for a function?',
      a: 'The function has internal linkage: it is visible only inside its translation unit. It cannot be called from another .c file.',
      level: 'intermediate',
    },
    {
      q: 'Why can deep recursion crash a C program?',
      a: 'Each call uses stack space and C does not guarantee tail-call optimisation. Enough depth exhausts the stack and the process crashes.',
      level: 'advanced',
    },
  ],
  'arrays-strings': [
    {
      q: 'What is a C string?',
      a: 'A char array ending with a null terminator \\0. The terminator is not counted by strlen but must fit in the array.',
      level: 'basic',
    },
    {
      q: 'Why is strcpy dangerous?',
      a: 'It does not know the destination size, so a long source overflows it. Use snprintf or a bounded copy with an explicit terminator.',
      level: 'intermediate',
    },
    {
      q: 'What does strcmp return?',
      a: 'Zero if the strings are equal, a negative value if the first is less, and a positive value if it is greater.',
      level: 'basic',
    },
    {
      q: 'Why does sizeof(array) fail inside a function?',
      a: 'The array parameter decays to a pointer, so sizeof returns the pointer size. Pass the length as a separate argument.',
      level: 'advanced',
    },
  ],
  pointers: [
    {
      q: 'What is a pointer?',
      a: 'A variable that stores a memory address. The type says how to interpret the data and how far one step of pointer arithmetic moves.',
      level: 'basic',
    },
    {
      q: 'What is a NULL pointer?',
      a: 'A pointer that points to nothing. Check for NULL before dereferencing. Functions such as malloc return NULL on failure.',
      level: 'basic',
    },
    {
      q: 'What is pointer arithmetic?',
      a: 'Adding n to a pointer moves by n * sizeof(*pointer) bytes. It is defined only inside the same array or one past the end.',
      level: 'intermediate',
    },
    {
      q: 'What is a function pointer used for?',
      a: 'Passing behaviour as a value: callbacks, sorting comparators, dispatch tables. The syntax is returnType (*name)(parameterTypes).',
      level: 'advanced',
    },
  ],
  memory: [
    {
      q: 'What is the difference between malloc and calloc?',
      a: 'malloc allocates uninitialised bytes. calloc allocates and zeroes them. calloc is safer when you need a clean buffer.',
      level: 'basic',
    },
    {
      q: 'What is a memory leak?',
      a: 'Heap memory that is no longer reachable and never freed. The program keeps running but its memory use grows.',
      level: 'basic',
    },
    {
      q: 'Why assign realloc to a temporary?',
      a: 'If realloc fails it returns NULL and the original block is still valid. Assigning directly loses the pointer and leaks the block.',
      level: 'intermediate',
    },
    {
      q: 'What is a double free?',
      a: 'Calling free twice on the same pointer. It corrupts the allocator and can crash or be exploited. Set the pointer to NULL after free.',
      level: 'advanced',
    },
  ],
  structs: [
    {
      q: 'What is a struct?',
      a: 'A value that groups fields of different types. Members are accessed with a dot, or an arrow through a pointer.',
      level: 'basic',
    },
    {
      q: 'What does typedef do?',
      a: 'Creates an alias for a type. It does not create a new type; it is another name for the same type.',
      level: 'basic',
    },
    {
      q: 'What is the difference between struct and union?',
      a: 'A struct stores every member at once. A union stores one member at a time in the same memory, so its size is the largest member.',
      level: 'intermediate',
    },
    {
      q: 'Why does struct size differ from the sum of its fields?',
      a: 'The compiler adds padding to align members for efficient access. Use sizeof(struct) and avoid assuming a layout for binary files.',
      level: 'advanced',
    },
  ],
  files: [
    {
      q: 'What does fopen return?',
      a: 'A FILE pointer, or NULL on failure. Always check it before reading or writing.',
      level: 'basic',
    },
    {
      q: 'Why is fgets safer than gets?',
      a: 'fgets takes the buffer size and stops at the limit. gets has no size and can overflow any buffer.',
      level: 'basic',
    },
    {
      q: 'What are the file modes?',
      a: 'r reads, w writes and truncates, a appends, r+ reads and writes, and adding b makes it binary. The exact set is standard C.',
      level: 'intermediate',
    },
    {
      q: 'Why can fwrite of a struct be non-portable?',
      a: 'Padding, endianness and type sizes depend on the platform. For portable files, write text or a documented binary format.',
      level: 'advanced',
    },
  ],
  preprocessor: [
    {
      q: 'When does the preprocessor run?',
      a: 'Before compilation. It handles includes, macros and conditional compilation as text transformations.',
      level: 'basic',
    },
    {
      q: 'Why are macros dangerous?',
      a: 'Arguments are substituted as text without type checking. Parenthesise parameters and the whole expression, or prefer inline functions.',
      level: 'intermediate',
    },
    {
      q: 'What is a header guard?',
      a: 'An #ifndef / #define / #endif pattern that prevents a header from being included more than once in one translation unit.',
      level: 'basic',
    },
    {
      q: 'What is the difference between #include <> and #include ""?',
      a: 'Angle brackets search system include paths. Quotes search the current directory first, then the system paths. Use quotes for project headers.',
      level: 'intermediate',
    },
  ],
  'common-bugs': [
    {
      q: 'What is a buffer overflow?',
      a: 'Writing past the end of an array or buffer. It corrupts adjacent memory and can crash or create a security vulnerability.',
      level: 'basic',
    },
    {
      q: 'What is an off-by-one error?',
      a: 'A loop or index that goes one step past the valid range, such as i <= length on an array of length elements.',
      level: 'basic',
    },
    {
      q: 'Why is using an uninitialised variable dangerous?',
      a: 'It reads indeterminate stack memory. The value is unpredictable and reading it is undefined behaviour.',
      level: 'intermediate',
    },
    {
      q: 'How do you find memory bugs quickly?',
      a: 'Compile with -Wall -Wextra -Werror and run with AddressSanitizer and UndefinedBehaviorSanitizer. On Linux, valgrind finds leaks and invalid reads.',
      level: 'advanced',
    },
  ],
  'project-interview': [
    {
      q: 'How do you free a linked list?',
      a: 'Walk the list, keep the next pointer before freeing the current node, then free the current node. Freeing first and reading next afterwards is use-after-free.',
      level: 'intermediate',
    },
    {
      q: 'How do you return dynamic memory from a function safely?',
      a: 'Allocate on the heap and return the pointer. Document that the caller owns it and must free it. Never return a pointer to a local stack variable.',
      level: 'intermediate',
    },
    {
      q: 'How would you store records in C?',
      a: 'A struct per record, an array or linked list for the collection, and explicit functions to add, find, update and free. Pass the length with the array.',
      level: 'basic',
    },
    {
      q: 'What makes C code easy to review?',
      a: 'Small functions, explicit ownership, checked return values, no magic numbers, bounded buffers and a clear separation between allocation and use.',
      level: 'advanced',
    },
  ],
};
