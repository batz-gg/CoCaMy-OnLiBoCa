//console.log = () => {};
let userPrint = '';
console.log = function(userLog) {
  userPrint += userLog;
};

const rewire = require('rewire');
const treeModule = rewire('../script.js');
const { expect } = require('chai');

describe('', function () {
  it('', function() {
    const menu = treeModule.__get__('menu');
    const checks = [
      {
        passing: menu.children[0].children[2] && (menu.children[0].children[2].data === 'Yogurt'),
        error: 'Did you move `Yogurt` to go under `Breakfast`?'
    	},
      {
        passing: menu.children[2].children[2] && (menu.children[2].children[2].data === 'BBQ Chicken'),
        error: 'Did you move `BBQ Chicken` to go under `Dinner`?'
    	}
    ];

		for (let i = 0; i < checks.length; i++) {    
      expect(checks[i].passing, checks[i].error).to.equal(true);
    }
    
    expect(userPrint, 'Did you print the menu under the heading `Corrected Menu`?').to.match(/Corrected\s*Menu/);
    const string = userPrint.substring(userPrint.length-11,userPrint.length);
		expect(string, 'Did you call `.print()` a second time?').to.match(/BBQ Chicken/);
  });
});
