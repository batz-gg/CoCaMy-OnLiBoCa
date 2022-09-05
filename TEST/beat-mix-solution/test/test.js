const fs = require('fs');
const vm = require('vm');
const chai = require('chai');
const things = require('chai-things');
chai.use(things);
const expect = chai.expect;

// Getters in case drum arrays are reassigned

const drums = {
  get kicks() {
    return kicks;
  },
  get snares() {
    return snares;
  },
  get hiHats() {
    return hiHats;
  },
  get rideCymbals() {
    return rideCymbals;
  }
};

describe('Beat Mix Problem Set - script.js file', () => {

  let drumArrays;
  let code;
  before('load script.js', (done) => {
    fs.readFile('public/js/script.js', (err, data) => {
      if (err) {
        throw err;
      }
      code = data;
      vm.runInThisContext(code);
      drumArrays = [kicks, snares, hiHats, rideCymbals];
      done();
    });
  });

  describe('Drum Arrays', () => {
    
    it('a variable called kicks should exist', () => {
      expect(kicks).to.not.be.undefined;
    });

    it('a variable called snares should exist', () => {
      expect(snares).to.not.be.undefined;
    });

    it('a variable called hiHats should exist', () => {
      expect(hiHats).to.not.be.undefined;
    });

    it('a variable called rideCymbals should exist', () => {
      expect(rideCymbals).to.not.be.undefined;
    });

    it('the kicks array should have 16 elements initialized to false.', () => {
      expect(kicks.length).to.be.equal(16);
      const containsAllFalseyElements = kicks.every((element) => element === false);
      expect(containsAllFalseyElements).to.be.true;
    });

    it('the snares array should have 16 elements initialized to false.', () => {
      expect(snares.length).to.be.equal(16);
      const containsAllFalseyElements = snares.every((element) => element === false);
      expect(containsAllFalseyElements).to.be.true;
    });

    it('the hiHats array should have 16 elements initialized to false.', () => {
      expect(hiHats.length).to.be.equal(16);
      const containsAllFalseyElements = hiHats.every((element) => element === false);
      expect(containsAllFalseyElements).to.be.true;
    });

    it('the rideCymbals array should have 16 elements initialized to false.', () => {
      expect(rideCymbals.length).to.be.equal(16);
      const containsAllFalseyElements = rideCymbals.every((element) => element === false);
      expect(containsAllFalseyElements).to.be.true;
    });

    it('each drum array variable should point to a unique Array.', () => {
      for (let i = 0; i < drumArrays.length; i++) {
        for (let j = i + 1; j < drumArrays.length; j++) {
          expect(drumArrays[i]).to.not.be.equal(drumArrays[j]);
        }
      }
    });

  });

  describe('toggleDrum() function', () => {

    let clonedDrums;
    beforeEach('reset drum arrays', () => {
      drumArrays = [drums.kicks, drums.snares, drums.hiHats, drums.rideCymbals];
      drumArrays.forEach((drumArray) => drumArray.fill(false));
      clonedDrums = drumArrays.map((arr) => [...arr]);
    });

    it('should exist and be a function', () => {
      expect(toggleDrum).to.exist;
      expect(toggleDrum).to.be.an.instanceof(Function);
    });

    it('should not alter any arrays when called with missing arguments', () => {
      toggleDrum();
      clonedDrums.forEach((arr, index) => {
        expect(arr).to.be.deep.equal(drumArrays[index]);
      });
    });

    it('should not mutate any arrays with out-of-range index arguments', () => {
      toggleDrum('snares', 20);
      clonedDrums.forEach((arr, index) => {
        expect(arr).to.be.deep.equal(drumArrays[index]);
      });
      toggleDrum('snares', -1);
      clonedDrums.forEach((arr, index) => {
        expect(arr).to.be.deep.equal(drumArrays[index]);
      });
    });

    it('should not mutate any arrays with negative index arguments', () => {
      toggleDrum('snares', -15);
      clonedDrums.forEach((arr, index) => {
        expect(Object.keys(arr)).to.be.deep.equal(Object.keys(drumArrays[index]));
      });
    });

    it('should mutate the correct array', () => {
      toggleDrum('kicks', 0);
      expect(kicks[0]).to.not.equal(clonedDrums[0][0]);
      kicks.forEach((val, index) => {
        if (index === 0) return;
        expect(val).to.be.false;
      });

      toggleDrum('snares', 0);
      expect(snares[0]).to.not.equal(clonedDrums[1][0]);
      snares.forEach((val, index) => {
        if (index === 0) return;
        expect(val).to.be.false;
      });

      toggleDrum('hiHats', 0);
      expect(hiHats[0]).to.not.equal(clonedDrums[1][0]);
      hiHats.forEach((val, index) => {
        if (index === 0) return;
        expect(val).to.be.false;
      });

      toggleDrum('rideCymbals', 0);
      expect(rideCymbals[0]).to.not.equal(clonedDrums[1][0]);
      rideCymbals.forEach((val, index) => {
        if (index === 0) return;
        expect(val).to.be.false;
      });

    });

    it('can toggle true -> false and false -> true', () => {
      expect(kicks[0]).to.be.false;
      toggleDrum('kicks', 0);
      expect(kicks[0]).to.be.true;
      toggleDrum('kicks', 0);
      expect(kicks[0]).to.be.false;
    });

    it('toggles a drum in a single array at a time, not all four', () => {
      expect(snares[0]).to.be.false;
      expect(hiHats[0]).to.be.false;
      expect(rideCymbals[0]).to.be.false;
      toggleDrum('kicks', 0);
      expect(kicks[0]).to.be.true;
      expect(snares[0]).to.be.false;
      expect(hiHats[0]).to.be.false;
      expect(rideCymbals[0]).to.be.false;
    });

    it('should only toggle a single drum in a single array', () => {
      toggleDrum('kicks', 0);
      kicks.forEach((val, index) => {
        if (index === 0) {
          expect(val).to.be.true;
        } else {
          expect(val).to.be.false;
        }
      });
    });
  });

  describe('clear() function', () => {

    let clonedDrums;
    beforeEach('reset drum arrays', () => {
      drumArrays = [drums.kicks, drums.snares, drums.hiHats, drums.rideCymbals];
      drumArrays.forEach((drumArray) => drumArray.fill(false));
      clonedDrums = drumArrays.map((arr) => [...arr]);
    });

    it('should exist and be a function', () => {
      expect(clear).to.exist;
      expect(clear).to.be.an.instanceof(Function);
    });

    it('should perform no array mutation when called with no arguments', () => {
      drumArrays.forEach((drumArray) => drumArray.fill(true));
      const trueArray = new Array(16).fill(true);
      clear();
      expect(drums.kicks).to.be.deep.equal(trueArray);
      expect(drums.snares).to.be.deep.equal(trueArray);
      expect(drums.hiHats).to.be.deep.equal(trueArray);
      expect(drums.rideCymbals).to.be.deep.equal(trueArray);
    });

    it('should not perform any mutation when called with an invalid array name', () => {
      drumArrays.forEach((drumArray) => drumArray.fill(true));
      const trueArray = new Array(16).fill(true);
      clear('nonExistentArray');
      expect(drums.kicks).to.be.deep.equal(trueArray);
      expect(drums.snares).to.be.deep.equal(trueArray);
      expect(drums.hiHats).to.be.deep.equal(trueArray);
      expect(drums.rideCymbals).to.be.deep.equal(trueArray);
    });

    it('mutates only a single array at a time', () => {
      drumArrays.forEach((drumArray) => drumArray.fill(true));
      const trueArray = new Array(16).fill(true);
      clear('kicks');
      expect(drums.kicks).to.be.not.deep.equal(trueArray);
      expect(drums.snares).to.be.deep.equal(trueArray);
      expect(drums.hiHats).to.be.deep.equal(trueArray);
      expect(drums.rideCymbals).to.be.deep.equal(trueArray);
    });

    it('should set all values in an array to false when called with a valid array name', () => {
      drumArrays.forEach((drumArray) => drumArray.fill(true));
      const falseArray = new Array(16).fill(false);
      clear('kicks');
      expect(drums.kicks).to.be.deep.equal(falseArray);
      clear('snares');
      expect(drums.snares).to.be.deep.equal(falseArray);
      clear('hiHats');
      expect(drums.hiHats).to.be.deep.equal(falseArray);
      clear('rideCymbals');
      expect(drums.rideCymbals).to.be.deep.equal(falseArray);
    });

  });

  describe('invert() function', () => {

    let clonedDrums;
    beforeEach('reset drum arrays', () => {
      drumArrays = [drums.kicks, drums.snares, drums.hiHats, drums.rideCymbals];
      drumArrays.forEach((drumArray) => drumArray.fill(false));
      clonedDrums = drumArrays.map((arr) => [...arr]);
    });

    it('should exist and be a function', () => {
      expect(invert).to.exist;
      expect(invert).to.be.an.instanceof(Function);
    });

    it('should perform no array mutation when called with no arguments', () => {
      drumArrays.forEach((drumArray) => drumArray.fill(true));
      const trueArray = new Array(16).fill(true);
      invert();
      expect(drums.kicks).to.be.deep.equal(trueArray);
      expect(drums.snares).to.be.deep.equal(trueArray);
      expect(drums.hiHats).to.be.deep.equal(trueArray);
      expect(drums.rideCymbals).to.be.deep.equal(trueArray);
    });

    it('should not perform any mutation when called with an invalid array name', () => {
      drumArrays.forEach((drumArray) => drumArray.fill(true));
      const trueArray = new Array(16).fill(true);
      invert('nonExistentArray');
      expect(drums.kicks).to.be.deep.equal(trueArray);
      expect(drums.snares).to.be.deep.equal(trueArray);
      expect(drums.hiHats).to.be.deep.equal(trueArray);
      expect(drums.rideCymbals).to.be.deep.equal(trueArray);
    });

    it('mutates only a single array at a time', () => {
      const falseArray = new Array(16).fill(false);
      invert('kicks');
      expect(drums.kicks).to.be.not.deep.equal(falseArray);
      expect(drums.snares).to.be.deep.equal(falseArray);
      expect(drums.hiHats).to.be.deep.equal(falseArray);
      expect(drums.rideCymbals).to.be.deep.equal(falseArray);
    });

    it('should invert all values in an array when called with a valid array name', () => {
      const trueArray = new Array(16).fill(true);
      invert('kicks');
      expect(drums.kicks).to.be.deep.equal(trueArray);
      invert('snares');
      expect(drums.snares).to.be.deep.equal(trueArray);
      invert('hiHats');
      expect(drums.hiHats).to.be.deep.equal(trueArray);
      rideCymbals[0] = true;
      invert('rideCymbals');
      trueArray[0] = false;
      expect(drums.rideCymbals).to.be.deep.equal(trueArray);
    });

  });

});

describe('Preset function - presetHandler.js file', () => {

  let presets = require('../presets');
  const presetHandler = require('../presetHandler');

  describe('presetHandler() function', () => {

    it('should exist and be a function', () => {
      expect(presetHandler).to.exist;
      expect(presetHandler).to.be.an.instanceof(Function);
    });

    describe('method === \'GET\'', () => {

      it('should return an array', function() {
        expect(presetHandler('GET')).to.be.an.instanceOf(Array);
      });

      it('should return 200 as the first element for a valid array index', function() {
        expect(presetHandler('GET', 0)[0]).to.equal(200);
      });

      it('should return the correct preset array as the second element', function() {
        let testPreset = ['test', 'test'];
        presets[0] = testPreset;
        expect(presetHandler('GET', 0)[1]).to.deep.equal(presets[0]);
      });

      it('should return 404 as the first element for an out-of-range array index', function() {
        expect(presetHandler('GET', 1240)[0]).to.equal(404);
        expect(presetHandler('GET', -1)[0]).to.equal(404);
      });
      
    });

    describe('method === \'PUT\'', () => {

      it('should return an array', function() {
        expect(presetHandler('PUT')).to.be.an.instanceOf(Array);
      });

      it('should return 200 as the first element for a valid array index', function() {
        expect(presetHandler('PUT', 0, ['newTest'])[0]).to.equal(200);
      });

      it('should return the updated preset array as the second element', function() {
        const testPreset = ['newTest', 'newTest'];
        expect(presetHandler('PUT', 0, testPreset)[1]).to.deep.equal(testPreset);
      });

      it('should set the preset at the correct index with the new presetArray', function() {
        const persistentPreset = ['persistenceTest', 'persistenceTest'];
        presetHandler('PUT', 0, persistentPreset);
        expect(presets[0]).to.deep.equal(persistentPreset);
      });

      it('should return 404 as the first element for an out-of-range array index', function() {
        expect(presetHandler('PUT', 1240)[0]).to.equal(404);
        expect(presetHandler('PUT', -1)[0]).to.equal(404);
      });

    });

    describe('invalid method argument', () => {
      it('should return 400 as the first element if called without a \'GET\' or \'PUT\' method', () => {
        expect(presetHandler('invalid')[0]).to.equal(400);
      });
    });

  });

  // Remove the 'x' before 'describe' to run these tests when you want to attempt the bonus!
  xdescribe('BONUS: getNeighborPads() function', () => {

    it('should exist and be a function', () => {
      getNeighborPads;
      expect(getNeighborPads).to.be.an.instanceof(Function);
    });

    it('should return an array', () => {
      const neighbors = getNeighborPads();
      expect(neighbors).to.be.an.instanceOf(Array);
    });

    it('should return an empty array when called with an x or y argument outside the size range', () => {
      let result = getNeighborPads(-1, 0, 4);
      expect(result).to.be.deep.equal([]);
      result = getNeighborPads(5, 0, 4);
      expect(result).to.be.deep.equal([]);
      result = getNeighborPads(4, 0, 4);
      expect(result).to.be.deep.equal([]);
      result = getNeighborPads(1, 5, 4);
      expect(result).to.be.deep.equal([]);
      result = getNeighborPads(-1, 0, -1);
      expect(result).to.be.deep.equal([]);
    });

    it('should return an array of four neighbor locations when called with a valid input', () => {
      let result = getNeighborPads(2, 2, 5);
      expect(result).to.include.something.that.deep.equals([1, 2]);
      expect(result).to.include.something.that.deep.equals([2, 1]);
      expect(result).to.include.something.that.deep.equals([3, 2]);
      expect(result).to.include.something.that.deep.equals([2, 3]);
    });

    it('should only return two neighbors when called with a location in a corner of the grid', () => {
      let result = getNeighborPads(0, 0, 5);
      expect(result).to.include.something.that.deep.equals([0, 1]);
      expect(result).to.include.something.that.deep.equals([1, 0]);
      expect(result.length).to.equal(2);
      result = getNeighborPads(4, 4, 5);
      expect(result).to.include.something.that.deep.equals([3, 4]);
      expect(result).to.include.something.that.deep.equals([4, 3]);
      expect(result.length).to.equal(2);
    });

    it('should only return three neighbors when called with a location on the edge of the grid', () => {
      let result = getNeighborPads(3, 4, 5);
      expect(result).to.include.something.that.deep.equals([2, 4]);
      expect(result).to.include.something.that.deep.equals([3, 3]);
      expect(result).to.include.something.that.deep.equals([4, 4]);
      expect(result.length).to.equal(3);
      result = getNeighborPads(4, 3, 5);
      expect(result).to.include.something.that.deep.equals([4, 4]);
      expect(result).to.include.something.that.deep.equals([3, 3]);
      expect(result).to.include.something.that.deep.equals([4, 4]);
      expect(result.length).to.equal(3);
      result = getNeighborPads(0, 1, 5);
      expect(result).to.include.something.that.deep.equals([0, 0]);
      expect(result).to.include.something.that.deep.equals([1, 1]);
      expect(result).to.include.something.that.deep.equals([0, 2]);
      expect(result.length).to.equal(3);
    });

  });

});
