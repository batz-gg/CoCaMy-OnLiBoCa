console.log = () => {};
const rewire = require('rewire');
const pizzaModule = rewire('../main.js');
const { expect } = require('chai');

describe('', function () {
  it('', function() {
    const pizzaStack = pizzaModule.__get__('pizzaStack');
    const pizza = {
      passing: pizzaStack.size === 0,
      error: 'Did you remove all the pizzas off the stack by calling `.pop()` six times?'
    }
    
    if (!pizza.passing) {
      expect(0, pizza.error).to.equal(1);
    }
  });
});