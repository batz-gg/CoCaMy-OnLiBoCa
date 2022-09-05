/*
 * sketch.js
 * Assumes that Button and Topping classes are defined
 * Assumes that a font is linked in HTML
 */
var font;
var table;
//var leftBrace, rightBrace, reset, fries;
var leftBrace, rightBrace, reset;
var buttons = [];
//var mainButton, sideButton, dessertButton, resetButton;
var mainButton, resetButton;
var toppingsMain = [];
/*
var toppingsSide = [];
var toppingsDessert = [];
*/
var optionsMain = [
  { text: 'Add bread', color: '#ffe399' },
  { text: 'Add burger patty', color: '#872e39' },
  { text: 'Add pickles', color: '#7ed321' },
];
/*
var optionsSide = [
  { text: 'Add fried potatoes', color: '#ffe399' },
  { text: 'Add salt', color: '#ffffff' },
  { text: 'Add ketchup', color: '#d0011b' },
];
var optionsDessert = [
  { text: 'Add chocolate scoop', color: '#8b572a' },
  { text: 'Add vanilla scoop', color: '#fff6ee' },
  { text: 'Add strawberry scoop', color: '#ff6dd0' },
];
*/
var constants = {
  background: '#f5a623',
  backgroundLight: '#FFC462',
  backgroundSuccess: '#F2E2C7',
  gradientW: 15,
  gradientWStart: 15,
  gradientWSuccess: 25,
  gradientCount: 15,
  fnButtonW: 9.5,
  fnButtonH: 2,
  regButtonW: 6.5,
  regButtonH: 2,
  resetButtonD: 2,
  mainToppingW: 4.5,
  mainThickH: 1,
  mainThinH: 0.5,
  /*
  sideToppingW: 4.5,
  sideThickH: 2,
  sideThinH: 0.3,
  dessertToppingR: 1,
  */
  tableColor: '#8B572A',
  tableW: 32,
  tableH: 3,
}

var success = false;
var mainSuccessPattern = [
'#ffe399', '#872e39', '#7ed321', '#ffe399',
'#ffe399', '#872e39', '#7ed321', '#ffe399', 
'#ffe399', '#872e39', '#7ed321', '#ffe399'
];

var wUnit;
var hUnit;

function preload() {
  leftBrace = loadImage('https://content.codecademy.com/programs/code-foundations-path/bop-ii/bracket_left.png');
  rightBrace = loadImage('https://content.codecademy.com/programs/code-foundations-path/bop-ii/bracket_right.png');
  reset = loadImage('https://content.codecademy.com/programs/code-foundations-path/bop-ii/refresh.png');
  //fries = loadImage('https://content.codecademy.com/programs/code-foundations-path/bop-ii/fries.png');
}

function setup() {
  // Create array of gradient colors
  constants.gradient = [];
  constants.gradientSuccess = [];
  const bkgLtColor = color(constants.backgroundLight);
  const bkgColor = color(constants.background);
  const bkgScsColor = color(constants.backgroundSuccess);
  for (let i = 0; i < constants.gradientCount; i++) {
    constants.gradient.push(lerpColor(bkgColor, bkgLtColor, i/constants.gradientCount));
    constants.gradientSuccess.push(lerpColor(bkgColor, bkgScsColor, i/constants.gradientCount));
  }

  createCanvas(windowWidth, windowHeight);
  // Expects Oxygen imported as <link> in HTML
  textFont('Oxygen');
  textSize(14);

  // The canvas will be divided into a 36 x 36 grid
  wUnit = windowWidth / 36;
  hUnit = windowHeight / 36;

  const tableWidth = constants.tableW * wUnit;
  const tableHeight = constants.tableH * hUnit
  table = {x: width/2 - (tableWidth/2), y: height - 1.5*hUnit - tableHeight, w: tableWidth, h: tableHeight, color: constants.tableColor};

  // Add main buttons
  mainButton = new Button( width/2 - (constants.fnButtonW/2)*wUnit, 2 * hUnit, constants.fnButtonW * wUnit, constants.fnButtonH * hUnit, 'makeHamburger()');
  buttons.push(mainButton);
  optionsMain.forEach( (elem, index)=> {
    buttons.push(new Button(
      width/2 - (constants.regButtonW/2)*wUnit, buttons[0].y + buttons[0].h + (constants.regButtonH * hUnit * index) + (0.5 * hUnit * (index + 1)),
      constants.regButtonW * wUnit, constants.regButtonH * hUnit,
      elem.text
    ));
  });

  /*
  // Add side buttons
  sideButton = new Button( width/2 - (constants.fnButtonW/2)*wUnit, 7 * hUnit, constants.fnButtonW * wUnit, constants.fnButtonH * hUnit, 'makeSomeFries()');
  buttons.push(sideButton);
  optionsSide.forEach( (elem, index)=> {
    buttons.push(new Button(
      width/2 - (6.5/2)*wUnit, buttons[0].y + buttons[0].h + (2 * hUnit * index) + (0.5 * hUnit * (index + 1)),
      constants.regButtonW * wUnit, constants.regButtonH * hUnit,
      elem.text
    ));
  });

  // Add dessert buttons
  dessertButton = new Button( width - 2*wUnit - constants.fnButtonW*wUnit, 7* hUnit, constants.fnButtonW * wUnit, constants.fnButtonH * hUnit, 'makeIceCream()');
  buttons.push(dessertButton);
  optionsDessert.forEach( (elem, index)=> {
    buttons.push(new Button(
      width - (2+1.5)*wUnit - 6.5*wUnit, buttons[0].y + buttons[0].h + (2 * hUnit * index) + (0.5 * hUnit * (index + 1)),
      constants.regButtonW * wUnit, constants.regButtonH * hUnit,
      elem.text
    ));
  });
  */

  // Add reset button
  resetButton = new Button( width - 2*wUnit - 2*wUnit, 2*hUnit, constants.resetButtonD*hUnit, constants.resetButtonD*hUnit, ' ', 'circ');

  buttons.push(resetButton);
}

function draw() {
  background(constants.background);
  noStroke();

  const mainCenter = mainButton.x + mainButton.w/2;
  //const sideCenter = sideButton.x + sideButton.w/2;
  //const dessertCenter = dessertButton.x + dessertButton.w/2;

  ellipseMode(CENTER);
  let lightDiameter, gradient;
  if (success) {
    constants.gradientW = constrain(constants.gradientW + 0.5, 0, constants.gradientWSuccess)
    gradient = constants.gradientSuccess;
  } else {
    gradient = constants.gradient;
  }
  lightDiameter = constants.gradientW * hUnit;

  gradient.forEach((color, index) => {
    fill(color);
    ellipse(mainCenter, table.y - lightDiameter/2, lightDiameter*(1 - index/gradient.length), lightDiameter* (1 - index/gradient.length));
    //ellipse(sideCenter, table.y - lightDiameter/2, lightDiameter*(1 - index/constants.gradient.length), lightDiameter* (1 - index/constants.gradient.length));
    //ellipse(dessertCenter, table.y - lightDiameter/2, lightDiameter*(1 - index/constants.gradient.length), lightDiameter* (1 - index/constants.gradient.length));
  });
  ellipseMode(CORNER);

  // Draw table and legs
  fill(table.color);
  rect(table.x, table.y, table.w, table.h);
  rect(table.x + 3 * wUnit, table.y + table.h, 2 * wUnit, 400);
  rect(table.x + table.w - (2 + 3) * wUnit, table.y + table.h, 2 * wUnit, 400);

  // Draw braces
  image(leftBrace, mainButton.x, buttons[1].y, wUnit, 3 * (2+0.5) * hUnit );
  image(rightBrace, mainButton.x + mainButton.w - wUnit, buttons[1].y, wUnit, 3 * (2+0.5) * hUnit);
  /*
  const btns = [mainButton, sideButton, dessertButton];
  btns.forEach((btn) => {
    image(leftBrace, btn.x, buttons[1].y, wUnit, 3 * (2+0.5) * hUnit );
    image(rightBrace, btn.x + btn.w - wUnit, buttons[1].y, wUnit, 3 * (2+0.5) * hUnit);
  });
  */

  // Draw button(s)
  let isOnButton = false;

  buttons.forEach((elem) => {
    if (elem.underMouse()) {
      if (mouseIsPressed) {
        elem.draw(elem.colorClick);
      } else {
        elem.draw(elem.colorHover);
      }
      isOnButton = true;
    } else {
      elem.draw(elem.color);
    }
  });
  imageMode(CENTER);
  image(reset, resetButton.x + resetButton.w/2, resetButton.y + resetButton.h/2, resetButton.w/2, resetButton.h/2);
  imageMode(CORNER);

  cursor( isOnButton ? HAND : ARROW )

  // Move and draw topping(s)
  toppingsMain.forEach((elem) => {
    elem.move();
    elem.draw();
  })
    /*
  toppingsSide.forEach((elem) => {
    elem.move();
    elem.draw();
  })
  toppingsDessert.forEach((elem) => {
    elem.move();
    elem.draw();
  })
  */
}

function mousePressed() {
  // Determine resting place of latest toppings and centers
  const totalHeightMain = getTotalHeight(toppingsMain, table.y);
  const mainToppingX = (mainButton.x + mainButton.w/2) - (constants.mainToppingW * wUnit) / 2;

  /*
  const totalHeightSide = getTotalHeight(toppingsSide, table.y);
  const sideToppingX = (sideButton.x + sideButton.w/2) - (constants.sideToppingW * wUnit) / 2;

  const totalHeightDessert = getTotalHeight(toppingsDessert, table.y);
  const dessertToppingX = (dessertButton.x + dessertButton.w/2) - (constants.dessertToppingR * wUnit) / 2;
  */

  // Add topping based on the clicked button's text
  buttons.forEach((elem) => {
    if (elem.underMouse()) {
      let match;
      switch (elem.text) {
        // Main cases
        case 'makeHamburger()':
          toppingsMain.push(new Topping(mainToppingX, 0, constants.mainToppingW * wUnit, constants.mainThickH * hUnit, totalHeightMain, 10, optionsMain[0].color, 'rect'));
          toppingsMain.push(new Topping(mainToppingX, 0, constants.mainToppingW * wUnit, constants.mainThickH * hUnit, totalHeightMain - constants.mainThickH*hUnit, 10, optionsMain[1].color, 'rect'));
          toppingsMain.push(new Topping(mainToppingX, 0, constants.mainToppingW * wUnit, constants.mainThinH * hUnit, totalHeightMain - 2*constants.mainThickH*hUnit, 10, optionsMain[2].color, 'rect'));
          toppingsMain.push(new Topping(mainToppingX, 0, constants.mainToppingW * wUnit, constants.mainThickH * hUnit, totalHeightMain - (2*constants.mainThickH + constants.mainThinH)*hUnit, 10, optionsMain[0].color, 'rect'));
          break;
        case 'Add burger patty':
        case 'Add bread':
          match = findMatchingOption(optionsMain, elem.text);
          toppingsMain.push(new Topping(mainToppingX, 0, constants.mainToppingW * wUnit, constants.mainThickH * hUnit, totalHeightMain, 10, match.color, 'rect'));
          break;
        case 'Add pickles':
          match = findMatchingOption(optionsMain, elem.text);
          toppingsMain.push(new Topping(mainToppingX, 0, constants.mainToppingW * wUnit, constants.mainThinH * hUnit, totalHeightMain, 10, match.color, 'rect'));
          break;
          /*
        // Side cases
        case 'makeSomeFries()':
          toppingsSide.push(new Topping(sideToppingX, 0, constants.sideToppingW * wUnit, constants.sideThickH * hUnit, totalHeightSide,  10, optionsSide[0].color, 'img'));
          toppingsSide.push(new Topping(sideToppingX, 0, constants.sideToppingW * wUnit, constants.sideThinH * hUnit, totalHeightSide - constants.sideThickH*hUnit, 10, optionsSide[1].color, 'rect'));
          toppingsSide.push(new Topping(sideToppingX, 0, constants.sideToppingW * wUnit, constants.sideThinH * hUnit, totalHeightSide - (constants.sideThickH + constants.sideThinH)*hUnit, 10, optionsSide[2].color, 'rect'));
          break;
        case 'Add fried potatoes':
          match = findMatchingOption(optionsSide, elem.text);
          toppingsSide.push(new Topping(sideToppingX, 0, constants.sideToppingW * wUnit, constants.sideThickH * hUnit, totalHeightSide, 10, match.color, 'img'));
          break;
        case 'Add salt':
        case 'Add ketchup':
          match = findMatchingOption(optionsSide, elem.text);
          toppingsSide.push(new Topping(sideToppingX, 0, constants.sideToppingW * wUnit, constants.sideThinH * hUnit, totalHeightSide, 10, match.color, 'rect'));
          break;
        // Dessert cases
        case 'makeIceCream()':
          toppingsDessert.push(new Topping(dessertToppingX, 0, constants.dessertToppingR*2*hUnit, constants.dessertToppingR*2*hUnit, totalHeightDessert, 10, optionsDessert[0].color, 'circ'));
          toppingsDessert.push(new Topping(dessertToppingX, 0, constants.dessertToppingR*2*hUnit, constants.dessertToppingR*2*hUnit, totalHeightDessert - constants.dessertToppingR*2*hUnit, 10, optionsDessert[1].color, 'circ'));
          toppingsDessert.push(new Topping(dessertToppingX, 0, constants.dessertToppingR*2*hUnit, constants.dessertToppingR*2*hUnit, totalHeightDessert - 2*constants.dessertToppingR*2*hUnit, 10, optionsDessert[2].color, 'circ'));
          break;
        case 'Add chocolate scoop':
        case 'Add vanilla scoop':
        case 'Add strawberry scoop':
          match = findMatchingOption(optionsDessert, elem.text);
          toppingsDessert.push(new Topping(dessertToppingX, 0, constants.dessertToppingR*2*hUnit, constants.dessertToppingR*2*hUnit, totalHeightDessert, 10, match.color, 'circ'));
          break;
          */

        default:
          // Remove all toppings
          toppingsMain = [];
          success = false;
          constants.gradientW = constants.gradientWStart;
          /*
          toppingsSide = [];
          toppingsDessert = [];
          */
      }
    }
  });

  if (checkForSuccess(toppingsMain, mainSuccessPattern)) {
    success = true;
  }
}

/*
 * Find the element in options whose .text property is text
 * @param {Object[]} options
 * @param {string} text
 */
function findMatchingOption(options, text) {
  return options.find((obj, index) => {
    return obj.text === text
  });
  console.log(`Cannot find ${text} in ${options} array`)
}

// Returns total height of stack represented by toppings,
// returns fallback if stack is 0.
function getTotalHeight(toppings, fallback) {
  let totalHeight;
  const last = toppings[toppings.length - 1]
  if (last) {
    totalHeight = last.floor - last.h;
  } else {
    totalHeight = fallback;
  }
  return totalHeight;
}

/*
Returns true if the pattern defined in the colors array is found in the colors
of the toppings in the toppings array.
@param {Object[]} toppings An array of Topping objects to check
@param {String[]} colors An array of strings of the desired color pattern
*/
function checkForSuccess(toppings, colors) {
  const toppingColors = toppings.map((topping) => {
    return topping.color.toUpperCase();
  });

  const pattern = colors.map(str => str.toUpperCase());
  const patternLength = pattern.length;

  // If toppings array is shorter than colors, return false
  if (toppingColors.length < patternLength) {
    return false;
  }

  // Check for pattern starting at each feasible index in toppingColors
  for (let i=0; i<=(toppingColors.length-patternLength); i++) {
    const partial = toppingColors.slice(i, i+patternLength);
    if (hasSameValues(partial, pattern)) {
      return true;
    }
  }

  return false;
}

/*
Checks for value equality between two arrays. Returns true if, for each index,
the value in arr1 is strictly equal to the value in arr2.
@param {Array} arr1 An array of values
@param {Array} arr2 An array of values
Values must be comparable using strict equality (`===`).
*/
function hasSameValues(arr1, arr2) {
  return arr1.every((elem, index) => {
    return elem === arr2[index];
  });
}