const assert = require('assert');
const Rooster = require('../index');

describe('Rooster', () => {
  describe(".announceDawn", () => {
    it("returns a rooster call", () => {
      // Define expected output
      const expected = 'moo!';
    
      // Call Rooster.announceDawn and store result in variable
      const result = Rooster.announceDawn()
      // Use an assert method to compare actual and expected result
      assert.equal(expected, result)
    })
  })
});

describe('Rooster', () => {
  describe('.timeAtDawn', () => {
    it("returns its argument as a string", () => {
      // Define expected output
      const inputNumber = 12;
      const expected = '12';
      // Call Rooster.announceDawn and store result in variable
      const result = Rooster.timeAtDawn(inputNumber)
      // Use an assert method to compare actual and expected result
      assert.equal(expected, result)
    })
    it('throws a range rror if passed a number less than 0', () => {
      const inputNumber = -1;
      const expected = RangeError;
      
      assert.throws(() => {
        Rooster.timeAtDawn(inputNumber)
      }, expected)
    })
    it('throws an error if passed a number greater than 23', () => {
      const inputNumber = 24;
      const expected = RangeError;
      assert.throws(() => {
        Rooster.timeAtDawn(inputNumber);
      }, expected);
    })
});
