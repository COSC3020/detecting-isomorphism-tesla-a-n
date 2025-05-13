const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js')+'');

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

function createCycleGraph(n) {
    const graph = {};
    for (let i = 0; i < n; i++) {
        graph[i] = [(i + 1) % n, (i - 1 + n) % n];
    }
    return graph;
}

function createPathGraph(n) {
    const graph = {};
    for (let i = 0; i < n; i++) {
        graph[i] = [];
        if (i > 0) graph[i].push(i - 1);
        if (i < n - 1) graph[i].push(i + 1);
    }
    return graph;
}

function createStarGraph(n) {
    const graph = {};
    graph[0] = [];
    for (let i = 1; i < n; i++) {
        graph[0].push(i);
        graph[i] = [0];
    }
    return graph;
}

function relabelGraph(graph, permutation) {
    const result = {};
    
    // Create new empty adjacency lists
    for (let i = 0; i < permutation.length; i++) {
        result[permutation[i]] = [];
    }
    
    // Map each edge
    for (const oldNode in graph) {
        const newNode = permutation[parseInt(oldNode)];
        
        for (const oldNeighbor of graph[oldNode]) {
            const newNeighbor = permutation[oldNeighbor];
            result[newNode].push(newNeighbor);
        }
    }
    
    return result;
}

function generatePermutation(n) {
    const result = Array.from({ length: n }, (_, i) => i);
    
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    
    return result;
}

const testIdentical = jsc.forall(jsc.integer(1, 10), size => {
    const graph = createCompleteGraph(size);
    return are_isomorphic(graph, graph);
});

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

try {
    console.log("Testing identical graphs...");
    jsc.assert(testIdentical);
    
    console.log("Testing complete graphs...");
    jsc.assert(testCompleteGraphs);
    
    console.log("Testing cycle graphs...");
    jsc.assert(testCycleGraphs);
    
    console.log("Testing path graphs...");
    jsc.assert(testPathGraphs);
    
    console.log("Testing star graphs...");
    jsc.assert(testStarGraphs);
    
    console.log("Testing different graphs...");
    jsc.assert(testDifferentGraphs);
    
    console.log("All tests passed!");
} catch (error) {
    console.error("Test failed:", error);
    process.exit(1);
}
