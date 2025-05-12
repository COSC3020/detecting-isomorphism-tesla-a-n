const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js')+'');

//complete graph generator
function createCompleteGraph(n) {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        graph[i].push(j);
      }
    }
  }
  return graph;
}

//cycle graph generator
function createCycleGraph(n) {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [(i + 1) % n, (i - 1 + n) % n];
  }
  return graph;
}

//path graph generator
function createPathGraph(n) {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
    if (i > 0) graph[i].push(i - 1);
    if (i < n - 1) graph[i].push(i + 1);
  }
  return graph;
}

//star graph test
function createStarGraph(n) {
  const graph = {};
  graph[0] = [];
  for (let i = 1; i < n; i++) {
    graph[0].push(i);
    graph[i] = [0];
  }
  return graph;
}

//helper function to duplicate graph (isomorphic copy)
function relabelGraph(graph, permutation) {
    const result = {};
    const nodes = Object.keys(graph);
    
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const newLabel = permutation[i];
        result[newLabel] = [];
        
        for (const neighbor of graph[node]) {
            const neighborIndex = nodes.indexOf(neighbor);
            result[newLabel].push(permutation[neighborIndex]);
        }
    }
    
    return result;
}

//helper function to generate a random permutation
// Made from functional programming experience and brute force sorting exercise
function generatePermutation(n) {
    const result = Array.from({ length: n }, (_, i) => i);
    
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    
    return result;
}

//test identical graphs are isomorphic
const testIdentical = jsc.forall(jsc.integer(1, 10), size => {
    const graph = createCompleteGraph(size);
    return are_isomorphic(graph, graph);
});

//functions to test each of the isomorphic copies (complete, cycle, path, star) are isomorphic
const testCompleteGraphs = jsc.forall(jsc.integer(2, 8), size => {
    const graph1 = createCompleteGraph(size);
    const permutation = generatePermutation(size);
    const graph2 = relabelGraph(graph1, permutation);
    return are_isomorphic(graph1, graph2);
});

const testCycleGraphs = jsc.forall(jsc.integer(3, 10), size => {
    const graph1 = createCycleGraph(size);
    const permutation = generatePermutation(size);
    const graph2 = relabelGraph(graph1, permutation);
    return are_isomorphic(graph1, graph2);
});

const testPathGraphs = jsc.forall(jsc.integer(2, 10), size => {
    const graph1 = createPathGraph(size);
    const permutation = generatePermutation(size);
    const graph2 = relabelGraph(graph1, permutation);
    return are_isomorphic(graph1, graph2);
});

const testStarGraphs = jsc.forall(jsc.integer(3, 10), size => {
    const graph1 = createStarGraph(size);
    const permutation = generatePermutation(size);
    const graph2 = relabelGraph(graph1, permutation);
    return are_isomorphic(graph1, graph2);
});

//function to test that different graphs are not isomorphic
const testDifferentGraphs = jsc.forall(jsc.integer(4, 10), size => {
    const completeGraph = createCompleteGraph(size);
    const cycleGraph = createCycleGraph(size);
    const pathGraph = createPathGraph(size);
    const starGraph = createStarGraph(size);
    
    return !are_isomorphic(completeGraph, cycleGraph) &&
           !are_isomorphic(completeGraph, pathGraph) &&
           !are_isomorphic(completeGraph, starGraph) &&
           !are_isomorphic(cycleGraph, pathGraph) &&
           !are_isomorphic(cycleGraph, starGraph) &&
           !are_isomorphic(pathGraph, starGraph);
});

jsc.assert(testIdentical);
jsc.assert(testCompleteGraphs);
jsc.assert(testCycleGraphs);
jsc.assert(testPathGraphs);
jsc.assert(testStarGraphs);
jsc.assert(testDifferentGraphs);


