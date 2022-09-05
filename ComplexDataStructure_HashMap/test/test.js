console.log = function() {};
const { expect } = require('chai');
const rewire = require('rewire');

describe('', function () {
  it('', function() {
    let HashMap
    try {
      HashMap = rewire('../HashMap.js');
    } catch(e) {
      expect(1, 'There was an issue importing your `HashMap()` file: ' + e.message).to.equal(0);
    }

    // check that constant was declared
		let birdCensus;
    try {
        birdCensus = HashMap.__get__('birdCensus');
    } catch (e) {
        expect(true, `Did you declare a constant, \`birdCensus\`?`).to.equal(false);
    }
    
    // check the value of the constant
    expect(birdCensus, `Did you assign a \`HashMap\` to \`birdCensus\`?`).to.be.an.instanceof(HashMap);
    // check the lenght of the hashmap
    expect(birdCensus.hashmap.length > 15, `Is the size of the hash map greater than \`15\`?`).to.equal(true);
  });
});