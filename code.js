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

    // Check if degree spreads match
    const degs1 = Object.keys(degGroups1).sort();
    const degs2 = Object.keys(degGroups2).sort();
    if (degs1.length !== degs2.length) return false;
    for (let i = 0; i < degs1.length; i++) {
        if (degs1[i] !== degs2[i] || degGroups1[degs1[i]].length !== degGroups2[degs2[i]].length) {
            return false;
        }
    }

    // Helper: check if mapping is compatible
    function isCompatible(node1, node2, mapping, reverseMapping) {
        for (const nbr1 of graph1[node1]) {
            if (mapping.hasOwnProperty(nbr1)) {
                const mappedNbr2 = mapping[nbr1];
                if (!graph2[node2].includes(mappedNbr2)) return false;
            }
        }
        for (const nbr2 of graph2[node2]) {
            if (reverseMapping.hasOwnProperty(nbr2)) {
                const mappedNbr1 = reverseMapping[nbr2];
                if (!graph1[node1].includes(mappedNbr1)) return false;
            }
        }
        return true;
    }

    // Backtracking search for valid mapping
    function backtrack(mapping, reverseMapping, unmappedDegrees) {
        if (Object.keys(mapping).length === nodes1.length) return true;

        // Pick a degree group with unmapped nodes
        for (const deg of degs1) {
            const group1 = degGroups1[deg].filter(n => !mapping.hasOwnProperty(n));
            if (group1.length === 0) continue;
            const group2 = degGroups2[deg].filter(n => !reverseMapping.hasOwnProperty(n));
            if (group1.length !== group2.length) return false;

            // Try to map the first unmapped node in this group
            const node1 = group1[0];
            for (const node2 of group2) {
                if (reverseMapping.hasOwnProperty(node2)) continue;
                if (!isCompatible(node1, node2, mapping, reverseMapping)) continue;

                mapping[node1] = node2;
                reverseMapping[node2] = node1;
                if (backtrack(mapping, reverseMapping, unmappedDegrees)) return true;
                delete mapping[node1];
                delete reverseMapping[node2];
            }
            return false; // No mapping worked for node1
        }
        return false;
    }

    return backtrack({}, {}, degs1);
}
