function are_isomorphic(graph1, graph2) {
    // Check if they have the same number of vertices
    const nodes1 = Object.keys(graph1);
    const nodes2 = Object.keys(graph2);
    if (nodes1.length !== nodes2.length) return false;

    // Check if they have the same number of edges
    const edgeCount = g => Object.values(g).reduce((sum, nbrs) => sum + nbrs.length, 0) / 2;
    if (edgeCount(graph1) !== edgeCount(graph2)) return false;

    // Group nodes by degree
    function groupByDegree(graph) {
        const groups = {};
        for (const node in graph) {
            const deg = graph[node].length;
            if (!groups[deg]) groups[deg] = [];
            groups[deg].push(node);
        }
        return groups;
    }
    
    const degGroups1 = groupByDegree(graph1);
    const degGroups2 = groupByDegree(graph2);

    // Check if degree distributions match
    const degs1 = Object.keys(degGroups1).sort((a, b) => a - b);
    const degs2 = Object.keys(degGroups2).sort((a, b) => a - b);
    
    if (degs1.length !== degs2.length) return false;
    
    for (let i = 0; i < degs1.length; i++) {
        if (degs1[i] !== degs2[i] || degGroups1[degs1[i]].length !== degGroups2[degs2[i]].length) {
            return false;
        }
    }

    // Helper: check if mapping is compatible
    function isCompatible(node1, node2, mapping, reverseMapping) {
        for (const nbr1 of graph1[node1]) {
            if (nbr1 in mapping) {
                const mappedNbr2 = mapping[nbr1];
                if (!graph2[node2].includes(mappedNbr2)) return false;
            }
        }
        
        for (const nbr2 of graph2[node2]) {
            if (nbr2 in reverseMapping) {
                const mappedNbr1 = reverseMapping[nbr2];
                if (!graph1[node1].includes(mappedNbr1)) return false;
            }
        }
        
        return true;
    }

    // Backtracking search for valid mapping
    function backtrack(mapping, reverseMapping) {
        if (Object.keys(mapping).length === nodes1.length) return true;

        // Find an unmapped node with lowest possible options
        let bestNode = null;
        let minOptions = Infinity;
        
        for (const node1 of nodes1) {
            if (node1 in mapping) continue;
            
            const deg = graph1[node1].length;
            const options = degGroups2[deg].filter(n => !(n in reverseMapping)).length;
            
            if (options < minOptions) {
                minOptions = options;
                bestNode = node1;
            }
        }
        
        if (bestNode === null) return false;
        
        // Try mapping this node to compatible nodes of same degree
        const deg = graph1[bestNode].length;
        const candidates = degGroups2[deg].filter(n => !(n in reverseMapping));
        
        for (const node2 of candidates) {
            if (!isCompatible(bestNode, node2, mapping, reverseMapping)) continue;
            
            mapping[bestNode] = node2;
            reverseMapping[node2] = bestNode;
            
            if (backtrack(mapping, reverseMapping)) return true;
            
            delete mapping[bestNode];
            delete reverseMapping[node2];
        }
        
        return false;
    }

    return backtrack({}, {});
}
