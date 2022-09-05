console.log = function() {};
const { expect } = require('chai');
const rewire = require('rewire');
const sinon = require('sinon');
console.log = sinon.spy();

describe('breadthFirstTraversal', function() {
  it('should traverse through the entirety of the `testGraph` in layers', function() {
		let bft;
    try {
        const moduleImport = rewire('../breadthFirstTraversal.js');
				bft = moduleImport.__get__('breadthFirstTraversal');
    } catch (e) {
        expect(true, 'We\'re unable to find the `breadthFirstTraversal` function. Try checking your code for syntax errors.').to.equal(false);
		}
    
    const expectedVisitOrder = ['v0.0.0', 'v1.0.0', 'v2.0.0', 'v1.1.0', 'v1.2.0', 'v2.1.0', 'v1.1.1', 'v1.1.2', 'v1.2.1', 'v2.1.1'];
    expectedVisitOrder.forEach((vertex, index) => {
      expect(console.log.args[index][0] === vertex, 'Check that you are iterating through the `current` list of `edges` and enqueuing each `neighbor` if it has not been visited yet.').to.equal(true);
    })
	})
});