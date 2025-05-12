# Graph Isomorphism

Devise an algorithm to determine whether two given graphs are isomorphic or not.
It takes two graphs as an argument and returns `true` or `false`, depending on
whether the graphs are isomorphic or not. Your algorithm needs to handle both
the case where the two graphs are isomorphic and where they are not isomorphic.

Hint: Your algorithm does not need to be the best possible algorithm, but should
avoid unnecessarily repeating work.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the worst-case big $\Theta$ time complexity of your algorithm?

## Sources

[GeeksforGeeks: Graph Isomorphisms and Connectivity](https://www.geeksforgeeks.org/graph-isomorphisms-connectivity/#)

[University of Washington: Algorithm and Experiments in Testing Planar
Graphs for Isomorphism](https://ailab.wsu.edu/subdue/papers/KuklukJGAA05.pdf)

"We first test if a pair of graphs is planar. In order to compare two planar graphs for isomorphism, we construct a unique code for every
graph. If those codes are the same, the graphs are isomorphic."

"Algorithm 1 Graph isomorphism and unique code construction for connected
planar graphs
1: Test if G1 and G2 are planar graphs
2: Decompose G1 and G2 into biconnected components and construct the tree
of biconnected components
3: Decompose each biconnected component into its triconnected components
and construct the SPQR-tree.
4: Construct unique code for every SPQR-tree and in bottom-up fashion construct unique code for the biconnected tree
5: If Code(G1) = Code(G2) G1 is isomorphic to G2"

[GeeksforGeeks: Backtracking](https://www.geeksforgeeks.org/backtracking-algorithms/)

[Mapping](https://en.wikipedia.org/wiki/Map_(higher-order_function))


