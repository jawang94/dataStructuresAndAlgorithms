// class Node {
//   constructor(value) {
//     this.value = value ? value : null;
//   }
// }

class Graph {
  constructor() {
    this.vertices = [];
    this.edges = [];
    this.numberOfEdges = 0;
  }

  addVertex(vertex) {
    if (this.vertices.indexOf(vertex) === -1) {
      this.vertices.push(vertex);
      this.edges.push([]);
    }
  }

  addEdge(vertex1, vertex2) {
    let index1 = this.vertices.indexOf(vertex1);
    let index2 = this.vertices.indexOf(vertex2);

    if (this.edges[index1].indexOf(vertex2) === -1) {
      this.edges[index1].push(vertex2);
    }
    if (this.edges[index2].indexOf(vertex1) === -1) {
      this.edges[index2].push(vertex1);
    }

    this.numberOfEdges++;
    // console.log(this.edges);
  }

  removeVertex(vertex) {}

  removeEdge(vertex1, vertex2) {
    let index1 = this.vertices.indexOf(vertex1);
    let index2 = this.vertices.indexOf(vertex2);
    let v1ToV2 = this.edges[index1].indexOf(vertex2);
    let v2ToV1 = this.edges[index2].indexOf(vertex1);

    if (v1ToV2 >= 0) {
      this.edges[index1].slice(v1ToV2, 1);
    }
    if (v2ToV1 >= 0) {
      this.edges[index2].slice(v2ToV1, 1);
    }

    this.numberOfEdges--;
  }

  numOfEdges() {
    return this.numberOfEdges;
  }

  printGraph() {
    for (let i = 0; i < this.vertices.length; i++) {
      let vertex = this.vertices[i];
      let edges = this.edges[i];
      console.log(
        `${vertex} => ${edges
          .join(",")
          .replace(/,/g, " | ")
          .trim()}`
      );
    }
  }
}

let newGraph = new Graph();
newGraph.addVertex(1);
newGraph.addVertex(2);
newGraph.addVertex(3);
newGraph.addVertex(4);
newGraph.addEdge(2, 3);
newGraph.addEdge(2, 4);
newGraph.printGraph();
