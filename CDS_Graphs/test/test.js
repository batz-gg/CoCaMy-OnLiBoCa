console.log = function() {};
const { expect } = require('chai');
const rewire = require('rewire');
const Graph = require('../Graph.js');
const sinon = require('sinon');

describe('`trainNetwork`', function() {
  it('should have the following vertices: Los Angeles, San Francisco, New York, Atlanta, and Denver', function() {
		let trainNetwork;
    const removeVertexSpy = sinon.spy(Graph.prototype, 'removeVertex');
    const removeEdgeSpy = sinon.spy(Graph.prototype, 'removeEdge');
    try {
        const moduleImport = rewire('../trainNetwork.js');
				trainNetwork = moduleImport.__get__('trainNetwork');
    } catch (e) {
        expect(true, 'We\'re unable to find your `trainNetwork` graph. Try checking your code for syntax errors.').to.equal(false);
		}

    expect(removeEdgeSpy.called, 'Make sure that you are removing the edges using the `trainNetwork`\'s `.removeEdge()` method.').to.equal(true);
    expect(removeVertexSpy.called, 'Make sure that you are removing Calgary using the `trainNetwork`\'s `.removeVertex()` method.').to.equal(true);
    
		let missingVertices = ['Los Angeles', 'San Francisco', 'New York', 'Atlanta', 'Denver'];
		trainNetwork.vertices.forEach((vert) => {
			missingVertices = missingVertices.filter(v => vert.data.toLowerCase() !== v.toLowerCase());
			expect(vert.data.toLowerCase() !== 'calgary', 'Make sure the Calgary station vertex is removed using `.removeVertex()`.').to.equal(true)
		})

		expect(missingVertices.length, `The following vertices are missing from the \`trainNetwork\` graph: ${missingVertices.join(', ')}`).to.equal(0);

		const expectedPaths = {
			'san francisco': {
				'los angeles': 400,
			},
      'los angeles': {
        'san francisco': 400,
        atlanta: 2100,
      },
      denver: {
        'new york': 1800,
			},
			atlanta: {
				'los angeles': 2100,
			},
		};

		const receivedPaths = {
			'san francisco': {},
      'los angeles': {},
			atlanta: {},
			denver: {},
		};

		let numPaths = 0;

		trainNetwork.vertices.forEach((vertex) => {
			if (vertex.edges.length) {
				vertex.edges.forEach((edge) => {
					let expectedWeight;
					const startVert = edge.start.data.toLowerCase();
					const endVert = edge.end.data.toLowerCase();

					expect(startVert !== 'calgary', 'Found a route out of Calgary. Check to make sure all routes from Calgary are removed.').to.equal(true);
					expect(endVert !== 'calgary', 'Found a route to Calgary. Check to make sure all routes to Calgary are removed.').to.equal(true);

					try {
						expectedWeight = expectedPaths[startVert][endVert];
					} catch (e) {
						expect(true, `Unrecognized path from ${startVert} to ${endVert}`).to.equal(false);
					}

					expect(expectedWeight, `Expected the weight of the path from ${edge.start.data} to ${edge.end.data} to be ${expectedWeight}, but it was ${edge.weight}. Check that you are calling \`.addEdge()\` with the correct weight.`).to.equal(edge.weight);

					if (!receivedPaths[startVert][endVert]) {
						receivedPaths[startVert][endVert] = true;
						numPaths++;
					}
				})
			}
		})

		expect(numPaths, 'Looks like you don\'t have the right number of routes. Check your edges again.').to.equal(5);
  });
});