// C++ interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is the difference between C and C++?',
      a: 'C++ adds classes, references, templates, exceptions, namespaces and the STL on top of C. It keeps C performance and low-level control but encourages higher-level abstractions.',
      level: 'basic',
    },
    {
      q: 'What is the compilation model of C++?',
      a: 'Each translation unit is compiled to an object file, then the linker combines object files and libraries. Templates and inline functions are usually defined in headers so every unit can instantiate them.',
      level: 'intermediate',
    },
    {
      q: 'Why is C++ still used for games and browsers?',
      a: 'It offers deterministic performance, direct memory control and zero-cost abstractions. Those matter for engines, real-time systems and large codebases that cannot afford a garbage collector.',
      level: 'intermediate',
    },
    {
      q: 'What is undefined behaviour?',
      a: 'The standard imposes no requirements on the program. It may crash, produce garbage or appear to work. The compiler may also optimise based on the assumption that it never happens.',
      level: 'advanced',
    },
  ],
  'variables-types': [
    {
      q: 'What does auto do?',
      a: 'It deduces the type from the initialiser at compile time. It is not dynamic typing; the type is fixed and checked.',
      level: 'basic',
    },
    {
      q: 'What is a reference?',
      a: 'An alias for an existing object. It must be initialised, cannot be null and cannot be reseated. Use const T& to read without copying.',
      level: 'basic',
    },
    {
      q: 'Why prefer static_cast over a C-style cast?',
      a: 'It states the intent, is searchable and is checked where possible. C-style casts silently fall back to reinterpretation.',
      level: 'intermediate',
    },
    {
      q: 'Why is std::string preferred over char arrays?',
      a: 'It manages memory and length, supports value semantics, and avoids buffer overflow. Use c_str() only at a C API boundary.',
      level: 'basic',
    },
  ],
  'operators-control': [
    {
      q: 'What is short-circuit evaluation?',
      a: 'In a && b, b is not evaluated when a is false. In a || b, b is not evaluated when a is true. This matters for side effects and null checks.',
      level: 'basic',
    },
    {
      q: 'What is a range-based for loop?',
      a: 'It iterates over a range using begin() and end(). Use const auto& to read without copying and auto& to modify.',
      level: 'basic',
    },
    {
      q: 'When is an object destroyed?',
      a: 'When it goes out of scope, for automatic storage. Its destructor runs, which is the basis of RAII.',
      level: 'intermediate',
    },
    {
      q: 'What is the conditional operator?',
      a: 'condition ? a : b returns a when the condition is true and b otherwise. It is an expression, not a statement.',
      level: 'basic',
    },
  ],
  functions: [
    {
      q: 'What is function overloading?',
      a: 'Several functions share a name but differ in parameter types or count. The compiler chooses at compile time.',
      level: 'basic',
    },
    {
      q: 'Where should default arguments be declared?',
      a: 'In the declaration visible to callers, usually the header. A default in the definition is invisible to other translation units.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between pass by value, reference and const reference?',
      a: 'By value copies. By reference lets the function modify the caller. By const reference reads without copying or modifying.',
      level: 'intermediate',
    },
    {
      q: 'What is a function pointer and when use one?',
      a: 'A pointer to a function, useful for callbacks and dispatch tables. Modern C++ often uses std::function or lambdas instead.',
      level: 'advanced',
    },
  ],
  'arrays-vectors': [
    {
      q: 'Why prefer std::vector over a raw array?',
      a: 'It knows its size, grows automatically, manages memory and works with algorithms. A raw array decays to a pointer and has no bounds checking.',
      level: 'basic',
    },
    {
      q: 'What does reserve() do?',
      a: 'It allocates capacity ahead of time so push_back does not reallocate repeatedly. It changes capacity, not size.',
      level: 'intermediate',
    },
    {
      q: 'What is the difference between size and capacity?',
      a: 'size is the number of elements. capacity is how many it can hold before reallocating. They are not the same.',
      level: 'intermediate',
    },
    {
      q: 'When is std::array better?',
      a: 'When the size is fixed and known at compile time. It avoids heap allocation and keeps value semantics.',
      level: 'basic',
    },
  ],
  'pointers-references': [
    {
      q: 'Pointer versus reference?',
      a: 'A pointer can be null, reseated and used for arithmetic. A reference must be initialised, cannot be null and cannot be reseated. Prefer references unless null or reseating is required.',
      level: 'basic',
    },
    {
      q: 'What is a dangling pointer?',
      a: 'A pointer to memory that has been freed or to a local variable that went out of scope. Dereferencing it is undefined behaviour.',
      level: 'intermediate',
    },
    {
      q: 'Why use const T& for parameters?',
      a: 'It avoids copying large objects and guarantees the function will not modify them.',
      level: 'basic',
    },
    {
      q: 'What is pointer arithmetic?',
      a: 'Adding n moves by n * sizeof(*pointer) bytes. It is defined only inside an array or one past the end.',
      level: 'advanced',
    },
  ],
  'classes-objects': [
    {
      q: 'What is the default access of a class?',
      a: 'Private. In a struct it is public. That is the only language difference between class and struct.',
      level: 'basic',
    },
    {
      q: 'What is a member initialiser list?',
      a: 'The part after the constructor colon that initialises members before the body runs. It is required for references and const members.',
      level: 'intermediate',
    },
    {
      q: 'What is the rule of three?',
      a: 'If a class needs a destructor, copy constructor or copy assignment, it usually needs all three. The rule of zero says: use RAII types and write none.',
      level: 'advanced',
    },
    {
      q: 'Why mark a getter const?',
      a: 'It promises not to modify the object and allows the method to be called on const objects and references.',
      level: 'basic',
    },
  ],
  'inheritance-polymorphism': [
    {
      q: 'What does virtual do?',
      a: 'It enables runtime dispatch. The function called depends on the actual object type, not the static pointer or reference type.',
      level: 'basic',
    },
    {
      q: 'Why does a polymorphic base need a virtual destructor?',
      a: 'Deleting a derived object through a base pointer must run the derived destructor. Without virtual, the behaviour is undefined and cleanup is skipped.',
      level: 'intermediate',
    },
    {
      q: 'What is a pure virtual function?',
      a: 'A virtual function declared with = 0. It makes the class abstract and derived classes must implement it.',
      level: 'intermediate',
    },
    {
      q: 'When prefer composition over inheritance?',
      a: 'When the relationship is "has a" or the base is not designed for extension. Composition is more flexible and avoids fragile base classes.',
      level: 'advanced',
    },
  ],
  templates: [
    {
      q: 'What is a template?',
      a: 'A compile-time blueprint for a function or class. The compiler generates a concrete version for each type used.',
      level: 'basic',
    },
    {
      q: 'Do templates have runtime cost?',
      a: 'Usually no. The code is generated at compile time and inlined when possible. The cost is compile time and binary size.',
      level: 'intermediate',
    },
    {
      q: 'Why do template definitions live in headers?',
      a: 'The compiler needs the full definition to instantiate the template at the call site.',
      level: 'intermediate',
    },
    {
      q: 'What is SFINAE?',
      a: 'Substitution Failure Is Not An Error: a template is removed from overload resolution when a substitution fails. Concepts in C++20 express constraints more clearly.',
      level: 'advanced',
    },
  ],
  stl: [
    {
      q: 'vector versus list?',
      a: 'vector is contiguous, fast to index and cache friendly. list is a doubly linked list with fast insert at a known position but poor locality. vector is usually faster.',
      level: 'intermediate',
    },
    {
      q: 'map versus unordered_map?',
      a: 'map keeps keys sorted with O(log n) operations. unordered_map uses a hash and is average O(1) but unordered.',
      level: 'intermediate',
    },
    {
      q: 'What is an iterator?',
      a: 'A generalised pointer into a container. Algorithms use iterators, so they work across containers.',
      level: 'basic',
    },
    {
      q: 'Why prefer algorithms over hand-written loops?',
      a: 'They are tested, expressive and less likely to contain an off-by-one or invalidation bug.',
      level: 'basic',
    },
  ],
  'memory-smart-pointers': [
    {
      q: 'What is RAII?',
      a: 'Resource Acquisition Is Initialisation: the constructor acquires a resource and the destructor releases it, so scope guarantees cleanup.',
      level: 'basic',
    },
    {
      q: 'unique_ptr versus shared_ptr?',
      a: 'unique_ptr has exclusive ownership and no counting overhead. shared_ptr shares ownership with reference counting and is used only when ownership is genuinely shared.',
      level: 'intermediate',
    },
    {
      q: 'What is a weak_ptr for?',
      a: 'It observes a shared_ptr without owning it. It breaks reference cycles and lets you check whether the object still exists.',
      level: 'advanced',
    },
    {
      q: 'What is move semantics?',
      a: 'Transferring resources from a temporary instead of copying them. std::move casts to an rvalue so the move constructor or assignment can run.',
      level: 'advanced',
    },
  ],
  'project-interview': [
    {
      q: 'How do you avoid leaks in a class that owns memory?',
      a: 'Use a smart pointer or a standard container. If you must use new, write a destructor and follow the rule of three, or better, the rule of zero.',
      level: 'intermediate',
    },
    {
      q: 'How do you pass a callback in modern C++?',
      a: 'Use a lambda with std::function for type erasure, or a template parameter for zero-cost dispatch. Prefer a template when the callback type is known.',
      level: 'advanced',
    },
    {
      q: 'What build setup would you use for a new C++ project?',
      a: 'CMake, a compiler with warnings enabled, sanitizers in debug, clang-tidy, and a package manager such as vcpkg or Conan for dependencies.',
      level: 'basic',
    },
    {
      q: 'How do you review C++ for safety?',
      a: 'Check ownership, lifetime, bounds, null checks, exception safety and const correctness. Run sanitizers and static analysis before merging.',
      level: 'advanced',
    },
  ],
};
