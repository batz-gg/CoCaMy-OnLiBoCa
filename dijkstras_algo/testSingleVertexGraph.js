const { Graph } = require('./Graph.js');

const testSimpleGraph = new Graph(true, true);
const a = testSimpleGraph.addVertex('A');

module.exports = testSimpleGraph;
