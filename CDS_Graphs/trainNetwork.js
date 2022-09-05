const Graph = require('./Graph.js');

const trainNetwork = new Graph(true, true);
const laStation = trainNetwork.addVertex('Los Angeles');
const sfStation = trainNetwork.addVertex('San Francisco');
const nyStation = trainNetwork.addVertex('New York');
const atlStation = trainNetwork.addVertex('Atlanta');
const denStation = trainNetwork.addVertex('Denver');
const calStation = trainNetwork.addVertex('Calgary');

trainNetwork.addEdge(sfStation, laStation, 400);
trainNetwork.addEdge(laStation, sfStation, 400);
trainNetwork.addEdge(nyStation, denStation, 1800);
trainNetwork.addEdge(denStation, nyStation, 1800);
trainNetwork.addEdge(calStation, denStation, 1000);
trainNetwork.addEdge(denStation, calStation, 1000);
trainNetwork.addEdge(atlStation, laStation, 2100);
trainNetwork.addEdge(laStation, atlStation, 2100);

trainNetwork.removeEdge(nyStation, denStation);
trainNetwork.removeEdge(calStation, denStation);
trainNetwork.removeEdge(denStation, calStation);
trainNetwork.removeVertex(calStation);

trainNetwork.print();