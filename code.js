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
            count += graph[node].length;
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
    
    //check if degree spreds match
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
    return backtrack(index, nodes1, graph1, graph2, nodesByDegree, map)
}
    //funciton backtrack helper function takes (index, nodes, graphs, nodes by degree, map)
    //if all nodes are mapped return true
    //try each of the nodes of same degree from graph2
    //for each node of nodes by degree
        //check if its already mapped
        //check if the mapping works with the existing mappings
        //try another mapping and make the index node1 //backtrack needs index
        //delete mapping of node1 index
        //return false
    //Check if mapping node1 to node2 is compatible with existing mappings
    //function isCompatible helper function takes (nodes, graphs, map)
        // for each mapped neighbor of node1
            //if neighbor is in map
                // corresponding node in graph2 should be a neighbor of node2
                    //return false
        //for each neighbor of node2 that has a reverse mapping
            // corresponding node in graph1 should be a neighbor of node1
                //if the corresponding node in graph1 should be a neighbor of node1
                    //if not, return false
    return true;
}
