function are_isomorphic(graph1, graph2) {
    // Quick check: same number of vertices?
    const nodes1 = Object.keys(graph1);
    const nodes2 = Object.keys(graph2);
    
    if (nodes1.length !== nodes2.length) {
        return false;
    }
    
    // Quick check: same number of edges?
    const countEdges = (graph) => {
        let count = 0;
        for (const node in graph) {
            count += graph[node].length;
        }
        return count / 2; // Each edge is counted twice in an adjacency list
    };
    
    if (countEdges(graph1) !== countEdges(graph2)) {
        return false;
    }
    
    // Group nodes by degree
    const getNodesByDegree = (graph) => {
        const result = {};
        for (const node in graph) {
            const degree = graph[node].length;
            if (!result[degree]) {
                result[degree] = [];
            }
            result[degree].push(node);
        }
        return result;
    };
    
    const nodesByDegree1 = getNodesByDegree(graph1);
    const nodesByDegree2 = getNodesByDegree(graph2);
    
    // Check if degree distributions match
    for (const degree in nodesByDegree1) {
        if (!nodesByDegree2[degree] || 
            nodesByDegree1[degree].length !== nodesByDegree2[degree].length) {
            return false;
        }
    }
    
    // Try to find an isomorphism using backtracking
    const used = new Set();
    const mapping = {};
    
    // Start the backtracking process
    return backtrack(nodes1, 0, graph1, graph2, nodesByDegree2, used, mapping);
}

/**
 * Backtracking helper function to find a valid mapping
 */
function backtrack(nodes1, index, graph1, graph2, nodesByDegree2, used, mapping) {
    // Base case: all nodes are mapped
    if (index === nodes1.length) {
        return true;
    }
    
    const node1 = nodes1[index];
    const degree = graph1[node1].length;
    
    // Try each node of the same degree from graph2
    for (const node2 of nodesByDegree2[degree] || []) {
        if (used.has(node2)) {
            continue; // Already mapped
        }
        
        // Check if this mapping works with existing mappings
        if (!isCompatible(node1, node2, graph1, graph2, mapping)) {
            continue;
        }
        
        // Try this mapping
        mapping[node1] = node2;
        used.add(node2);
        
        if (backtrack(nodes1, index + 1, graph1, graph2, nodesByDegree2, used, mapping)) {
            return true;
        }
        
        // Backtrack
        delete mapping[node1];
        used.delete(node2);
    }
    
    return false;
}

/**
 * Checks if mapping node1 to node2 is compatible with existing mappings
 */
function isCompatible(node1, node2, graph1, graph2, mapping) {
    const neighbors1 = graph1[node1];
    const neighbors2 = graph2[node2];
    
    // For each already mapped neighbor of node1, check if the corresponding 
    // mapped node is a neighbor of node2
    for (const neighbor of neighbors1) {
        if (mapping[neighbor] !== undefined) {
            // If neighbor is mapped to mapping[neighbor], then node2 should be connected
            // to mapping[neighbor] for this mapping to be consistent
            if (!graph2[node2].includes(mapping[neighbor])) {
                return false;
            }
        }
    }
    
    // For each neighbor of node2, check if the corresponding reverse mapping
    // is a neighbor of node1
    for (const neighbor of neighbors2) {
        // Find if any node in graph1 is mapped to this neighbor
        const reverseMapping = Object.entries(mapping).find(([_, val]) => val === neighbor);
        if (reverseMapping) {
            const [originalNode] = reverseMapping;
            // If originalNode is mapped to neighbor, then node1 should be connected
            // to originalNode for this mapping to be consistent
            if (!graph1[node1].includes(originalNode)) {
                return false;
            }
        }
    }
    
    return true;
}
