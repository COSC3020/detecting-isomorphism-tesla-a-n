function are_isomorphic(graph1, graph2) {
    //Check if they have the same # of vertices
    const nodes1 = Object.keys(graph1);
    const nodes2 = Object.keys(graph2);
    
    if (nodes1.length !== nodes2.length) {
        return false;
    }
    
    //check if same # of edges
    const countEdges = (graph) => {
        let count = 0;
        for (const node in graph) {
            count += Array.isArray(graph[node]) ? graph[node].length : 0;
        }
        return count / 2; // Each edge is counted twice in an adjacency list
    };
    
    // if isomorphic, theyd have the same # of edges
     if (countEdges(graph1) !== countEdges(graph2)) {
        return false;
    }
    
    //group nodes by degree
    const getNodesByDegree = (graph) => {
        const result = {};
        for (const node in graph) {
            const degree = Array.isArray(graph[node]) ? graph[node].length : 0;
            if (!result[degree]) {
                result[degree] = [];
            }
            result[degree].push(node);
        }
        return result;
    };
    
    const nodesByDegree1 = getNodesByDegree(graph1);
    const nodesByDegree2 = getNodesByDegree(graph2);
    
    //check if degree spreads match
    for (const degree in nodesByDegree1) {
        if (!nodesByDegree2[degree] || 
            nodesByDegree1[degree].length !== nodesByDegree2[degree].length) {
            return false;
        }
    }
    
    //use a set and a map
    const used = new Set();
    const mapping = {};

    //backtrack to find valid mapping
    return backtrack(0, nodes1, graph1, graph2, nodesByDegree2, used, mapping);
}

//function backtrack helper function takes (index, nodes, graphs, nodes by degree, map)
function backtrack(index, nodes1, graph1, graph2, nodesByDegree2, used, mapping) {
    //if all nodes are mapped return true
    if (index === nodes1.length) {
        return true;
    }
    
    const node1 = nodes1[index];
    const degree = Array.isArray(graph1[node1]) ? graph1[node1].length : 0;
    
    //try each of the nodes of same degree from graph2 to see if its already mapped
    //for each node of nodes by degree
    for (const node2 of nodesByDegree2[degree] || []) {
        if (used.has(node2)) {
            continue; // Already mapped
        }
        //check if its map works with existing maps
        if (!isCompatible(node1, node2, graph1, graph2, mapping)) {
            continue;
        }
        //check if the mapping works with the existing mappings
        //try another mapping and make the index node1 //backtrack needs index
        mapping[node1] = node2;
        used.add(node2);
        
        if (backtrack(index + 1, nodes1, graph1, graph2, nodesByDegree2, used, mapping)) {
            return true;
        }
        //delete mapping of node1 index
        delete mapping[node1];
        used.delete(node2);
    }
    
    return false;
}

//Check if mapping node1 to node2 is compatible with existing mappings
//function isCompatible helper function takes (nodes, graphs, map)
function isCompatible(node1, node2, graph1, graph2, mapping) {
    const neighbors1 = Array.isArray(graph1[node1]) ? graph1[node1] : [];
    const neighbors2 = Array.isArray(graph2[node2]) ? graph2[node2] : [];
    
    // for each mapped neighbor of node1
    for (const neighbor of neighbors1) {
        //if neighbor is in map
        if (neighbor in mapping) {
            // corresponding node in graph2 should be a neighbor of node2
            if (!neighbors2.includes(mapping[neighbor])) {
                return false;
            }
        }
    }
    
    //for each neighbor of node2 that has a reverse mapping
    for (const neighbor of neighbors2) {
        const reverseMapping = Object.keys(mapping).find(key => mapping[key] === neighbor);
        if (reverseMapping) {
            // corresponding node in graph1 should be a neighbor of node1
            //if the corresponding node in graph1 should be a neighbor of node1
            if (!neighbors1.includes(reverseMapping)) {
                //if not, return false
                return false;
            }
        }
    }
    return true;
}
