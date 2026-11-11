// C++ chapter: The STL.

export default {
  id: 'stl',
  title: 'The STL',
  description: 'Vector, map, set, iterators and algorithms',
  icon: 'inventory-2',
  lessons: [
    {
      id: 'cpp-stl-containers',
      title: 'Containers',
      blocks: [
        { type: 'text', value: 'The Standard Template Library gives ready-made containers. vector is the default sequence, map stores key-value pairs, and set stores unique values.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <map>
#include <set>
#include <vector>

int main() {
    std::vector<int> values = {5, 2, 9};
    std::map<std::string, int> scores = {{"Ayesha", 92}, {"Rahim", 78}};
    std::set<int> unique = {1, 2, 2, 3};

    std::cout << values.size() << " " << scores["Ayesha"] << " " << unique.size() << "\\n";
    return 0;
}` },
        { type: 'note', value: 'map keeps keys sorted and has O(log n) lookup. unordered_map is usually faster but does not keep order.' },
      ],
    },
    {
      id: 'cpp-iterators',
      title: 'Iterators',
      blocks: [
        { type: 'text', value: 'An iterator points into a container. begin() is the first element and end() is one past the last. Algorithms are written against iterators, so they work with many containers.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> values = {10, 20, 30};

    for (auto it = values.begin(); it != values.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Do not modify a container while iterating with an iterator. Adding or removing elements can invalidate it.' },
      ],
    },
    {
      id: 'cpp-algorithms',
      title: 'Algorithms',
      blocks: [
        { type: 'text', value: 'algorithm provides sort, find, count, max_element and many more. They are tested, efficient and work with any container that supplies compatible iterators.' },
        { type: 'code', lang: 'cpp', tryIt: false, value: `#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values = {5, 2, 9, 1};

    std::sort(values.begin(), values.end());
    std::cout << values.front() << " " << values.back() << "\\n";

    auto found = std::find(values.begin(), values.end(), 9);
    std::cout << (found != values.end()) << "\\n";
    return 0;
}` },
        { type: 'note', value: 'Prefer a standard algorithm over a hand-written loop. It is less code, more likely correct and familiar to reviewers.' },
      ],
    },
    {
      id: 'cpp-stl-choice',
      title: 'Choosing a container',
      blocks: [
        { type: 'list', items: [
          'vector - default sequence, fast index access',
          'deque - fast push at both ends',
          'list - fast insert in the middle, poor cache locality',
          'map / unordered_map - key-value lookup',
          'set / unordered_set - unique values',
          'array - fixed size, no heap allocation',
        ] },
        { type: 'text', value: 'Start with vector. Change the container only when a measured requirement demands it.' },
        { type: 'note', value: 'Iterators and algorithms abstract over containers, so the choice is easier to change later if you use them consistently.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'stl',
      q: 'Which container keeps keys sorted?',
      options: ['unordered_map', 'map', 'vector', 'stack'],
      answer: 1,
      explain: 'std::map is ordered by key; unordered_map is hash-based.',
    },
    {
      chapterId: 'stl',
      q: 'What does end() point to?',
      options: ['The last element', 'One past the last element', 'The first element', 'NULL'],
      answer: 1,
      explain: 'It is a past-the-end iterator, not a dereferenceable element.',
    },
    {
      chapterId: 'stl',
      q: 'Which header declares std::sort?',
      options: ['<vector>', '<algorithm>', '<map>', '<string>'],
      answer: 1,
      explain: 'Sorting algorithms live in <algorithm>.',
    },
    {
      chapterId: 'stl',
      q: 'What is the default sequence container?',
      options: ['list', 'vector', 'set', 'map'],
      answer: 1,
      explain: 'vector has the best default mix of speed and simplicity.',
    },
  ],
};
