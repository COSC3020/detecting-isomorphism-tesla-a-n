function are_isomorphic(graph1, graph2) {
    //Check if they have the same # of vertices
    //check if same # of edges
    //group nodes by degree
    //check if degree spreds match
    //use a set and a map
    //if all nodes are mapped return true
    //try each of the nodes of same degree from graph2
        //check if the mapping works with the existing mappings
        //try another mapping
    //Check if mapping node1 to node2 is compatible with existing mappings
        // for each mapped neighbor of node1
            // corresponding node in graph2 should be a neighbor of node2
        //for each neighbor of node2 that has a reverse mapping
            // corresponding node in graph1 should be a neighbor of node1
    return true;
}
