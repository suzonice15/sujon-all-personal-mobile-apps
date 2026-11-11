// C++ chapter: Arrays and Vectors.

export default {
  id: 'arrays-vectors',
  title: 'Arrays & Vectors',
  description: 'Raw arrays, std::vector and range-based loops',
  icon: 'view-column',
  lessons: [
    {
      id: 'cpp-arrays',
      title: 'Raw arrays',
      blocks: [
        { type: 'text', value: 'A raw array has a fixed size and no bounds checking. It is still useful for small fixed data and for understanding pointers, but std::vector is safer for almost everything else.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>

int main() {
    int scores[3] = {85, 92, 78};
    int total = 0;

    for (int i = 0; i < 3; i++) {
        total += scores[i];
    }

    std::cout << "total=" << total << " avg=" << total / 3.0 << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Raw arrays decay to pointers when passed to a function, and the length is lost. Pass the size separately or use std::array / std::vector.' },
      ],
    },
    {
      id: 'cpp-vector',
      title: 'std::vector',
      blocks: [
        { type: 'text', value: 'std::vector is a resizable array. It manages its own memory, knows its size, and works with range-based for. push_back appends in amortized O(1).' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> scores = {85, 92, 78};
    scores.push_back(90);

    int total = 0;
    for (int score : scores) {
        total += score;
    }

    std::cout << scores.size() << " " << total << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Use reserve() when you know the final size. It avoids repeated reallocations while the vector grows.' },
      ],
    },
    {
      id: 'cpp-2d-vector',
      title: '2D vectors',
      blocks: [
        { type: 'text', value: 'A 2D vector is a vector of vectors. Each row can have a different length, or you can create a rectangular grid with a size and a default value.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <vector>

int main() {
    std::vector<std::vector<int>> grid = {
        {1, 2},
        {3, 4}
    };

    for (const auto &row : grid) {
        for (int value : row) {
            std::cout << value << " ";
        }
        std::cout << "\\n";
    }
    return 0;
}` },
        { type: 'note', value: 'Storing rows contiguously is cache friendly. For numeric work, a flat vector with index = row * columns + col is often faster.' },
      ],
    },
    {
      id: 'cpp-array',
      title: 'std::array',
      blocks: [
        { type: 'text', value: 'std::array is a fixed-size array with value semantics. It knows its size, supports iteration and does not decay to a pointer when passed by reference.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <array>
#include <iostream>

int main() {
    std::array<int, 3> scores = {85, 92, 78};

    for (int score : scores) {
        std::cout << score << " ";
    }
    std::cout << "\\n";
    std::cout << scores.size() << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Prefer std::array when the size is fixed, std::vector when it changes. Both are safer than a raw C array.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'arrays-vectors',
      q: 'Which container grows automatically?',
      options: ['int[10]', 'std::array', 'std::vector', 'char[]'],
      answer: 2,
      explain: 'std::vector manages a dynamic buffer and resizes as needed.',
    },
    {
      chapterId: 'arrays-vectors',
      q: 'What does push_back do?',
      options: ['Removes the last element', 'Appends an element', 'Sorts the vector', 'Clears the vector'],
      answer: 1,
      explain: 'It adds an element at the end.',
    },
    {
      chapterId: 'arrays-vectors',
      q: 'Why does a raw array lose its length in a function?',
      options: ['It is copied', 'It decays to a pointer', 'It becomes a vector', 'It is deleted'],
      answer: 1,
      explain: 'The parameter is a pointer to the first element.',
    },
    {
      chapterId: 'arrays-vectors',
      q: 'When is std::array better than std::vector?',
      options: ['When the size is fixed', 'When you need push_back', 'When the data is text', 'Never'],
      answer: 0,
      explain: 'std::array has no dynamic allocation and a fixed size.',
    },
  ],
};
