let userPrint = '';
console.log = function(userLog) {
  userPrint += `\n${userLog}`;
};
const { assert, expect } = require('chai');
describe('', function () {
  it('', function() {
    // Check for bubbleSort and swap function files
    let bubbleSort, swap;
    try {
      bubbleSort = require('../bubbleSort');
      swap = require('../swap').swap;
    } catch(e) {
      expect(1, 'There was an issue importing your `bubbleSort()` and `swap()` functions: ' + e.message).to.equal(0);
    }
    
    // Check for bubbleSort function
    expect(bubbleSort, `Do you have a function called \`bubbleSort()\`?`).to.be.an.instanceOf(Function);
    expect(bubbleSort.length, `Does your \`bubbleSort()\` function expect 1 argument?`).to.equal(1);
    // Check for swap function
    expect(swap, `Do you have a function called \`swap()\`?`).to.be.an.instanceOf(Function);
    expect(swap.length, `Does your \`swap()\` function expect 3 arguments?`).to.equal(3);
    
    // Check for logged calls to bubbleSort()
    const reverseSorted = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    const sorted = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const pattern = /swapped\s*(36|0)\s*times\s*/gi;
		let matches; 
    
    try {
      bubbleSort(reverseSorted);
      bubbleSort(sorted);
      matches = userPrint.match(pattern).length;
    } catch (e) {
      expect(2, `Did you log the result of calling \`bubbleSort()\` with the two arrays given to you?`).to.equal(null);
    }
  });
});
