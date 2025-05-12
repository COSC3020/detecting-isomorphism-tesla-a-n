function are_isomorphic(graph1, graph2) {
    //Check if they have the same # of vertices
    //check if same # of edges
    //group nodes by degree
    //check if degree spreds match
    //use a set and a map
    //backtrack to find valid mapping
    //funciton backtrack helper function takes (nodes, graphs, nodes by degree, map)
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
