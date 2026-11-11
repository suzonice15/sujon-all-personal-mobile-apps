// DSA chapter: Graphs.

export default {
  id: 'graphs',
  title: 'Graphs',
  description: 'BFS, DFS and topological order',
  icon: 'share',
  lessons: [
    {
      id: 'dsa-graph-representation',
      title: 'Representing a graph',
      blocks: [
        { type: 'text', value: 'A graph has vertices and edges. An adjacency list maps each vertex to its neighbours. It is the default representation because it uses O(V + E) space and iterates neighbours quickly.' },
        { type: 'code', lang: 'js', tryIt: true, value: `const graph = new Map([
  ['A', ['B', 'C']],
  ['B', ['A', 'D']],
  ['C', ['A', 'D']],
  ['D', ['B', 'C']],
]);

for (const [node, neighbours] of graph) {
  console.log(node, '->', neighbours.join(', '));
}` },
        { type: 'list', items: [
          'Adjacency list - O(V + E) space, fast neighbours',
          'Adjacency matrix - O(V^2) space, O(1) edge check',
          'Edge list - simple, good for Kruskal and union-find',
        ] },
      ],
    },
    {
      id: 'dsa-bfs',
      title: 'Breadth-first search',
      blocks: [
        { type: 'text', value: 'BFS explores neighbours level by level with a queue. In an unweighted graph it finds the shortest path in edges. It visits every reachable vertex once, O(V + E).' },
        { type: 'code', lang: 'js', tryIt: true, value: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    order.push(node);

    for (const next of graph.get(node) || []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  return order;
}

const graph = new Map([
  ['A', ['B', 'C']],
  ['B', ['A', 'D']],
  ['C', ['A', 'D']],
  ['D', ['B', 'C']],
]);

console.log(bfs(graph, 'A'));` },
        { type: 'note', value: 'Mark a node visited when you enqueue it, not when you dequeue it. Otherwise the same node can enter the queue many times.' },
      ],
    },
    {
      id: 'dsa-dfs',
      title: 'Depth-first search',
      blocks: [
        { type: 'text', value: 'DFS follows one path as far as possible, then backtracks. It is natural for connected components, cycle detection and topological sort. Recursion or an explicit stack both work.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function dfs(graph, start) {
  const visited = new Set();
  const order = [];

  function visit(node) {
    if (visited.has(node)) return;
    visited.add(node);
    order.push(node);
    for (const next of graph.get(node) || []) visit(next);
  }

  visit(start);
  return order;
}

const graph = new Map([
  ['A', ['B', 'C']],
  ['B', ['A', 'D']],
  ['C', ['A', 'D']],
  ['D', ['B', 'C']],
]);

console.log(dfs(graph, 'A'));` },
        { type: 'text', value: 'Recursive DFS uses O(V) stack space in the worst case. For very large graphs use an explicit stack to avoid overflow.' },
      ],
    },
    {
      id: 'dsa-topological',
      title: 'Topological sort',
      blocks: [
        { type: 'text', value: 'A topological order lists tasks so every dependency comes first. It exists only for a directed acyclic graph (DAG). Kahn\'s algorithm repeatedly takes a node with no incoming edges.' },
        { type: 'code', lang: 'js', tryIt: true, value: `function topoSort(graph) {
  const indegree = new Map();
  for (const node of graph.keys()) indegree.set(node, 0);

  for (const neighbours of graph.values()) {
    for (const next of neighbours) {
      indegree.set(next, (indegree.get(next) || 0) + 1);
    }
  }

  const queue = [];
  for (const [node, degree] of indegree) {
    if (degree === 0) queue.push(node);
  }

  const order = [];
  let head = 0;
  while (head < queue.length) {
    const node = queue[head++];
    order.push(node);
    for (const next of graph.get(node) || []) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  }
  return order.length === graph.size ? order : null;
}

const tasks = new Map([
  ['A', ['C']],
  ['B', ['C', 'D']],
  ['C', ['E']],
  ['D', ['E']],
  ['E', []],
]);

console.log(topoSort(tasks));` },
        { type: 'text', value: 'If the result is shorter than the number of vertices, the graph has a cycle and no valid order exists. That is how dependency cycles are detected.' },
        { type: 'note', value: 'Build tools, package managers and course prerequisites all use topological order. If two tasks depend on each other, the build must fail.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'graphs',
      q: 'Which data structure tracks the BFS frontier?',
      options: ['Stack', 'Queue', 'Heap', 'Tree'],
      answer: 1,
      explain: 'BFS processes nodes in discovery order, level by level.',
    },
    {
      chapterId: 'graphs',
      q: 'What is the time complexity of BFS on an adjacency list?',
      options: ['O(1)', 'O(V + E)', 'O(V^2)', 'O(E log V)'],
      answer: 1,
      explain: 'Each vertex and each edge is examined once.',
    },
    {
      chapterId: 'graphs',
      q: 'When does a topological order exist?',
      options: ['For any graph', 'For a directed acyclic graph', 'Only for trees', 'Only for unweighted graphs'],
      answer: 1,
      explain: 'A cycle makes a valid dependency order impossible.',
    },
    {
      chapterId: 'graphs',
      q: 'What does DFS naturally support?',
      options: ['Shortest path in unweighted graphs', 'Cycle detection and connected components', 'Fastest sorting', 'Hashing'],
      answer: 1,
      explain: 'DFS explores complete paths and can detect back edges and components.',
    },
  ],
};
