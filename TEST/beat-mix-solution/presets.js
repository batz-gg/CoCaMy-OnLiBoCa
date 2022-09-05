const fs = require('fs');
const blankArray = new Array(16).fill(false);

let presets;

try {
  let memoryPresets = fs.readFileSync('presets.json');
  presets = JSON.parse(memoryPresets).data;
} catch (e) {
  presets = [
    new Array(4).fill(0).map((el) => [...blankArray]),
    new Array(4).fill(0).map((el) => [...blankArray]),
    new Array(4).fill(0).map((el) => [...blankArray]),
    new Array(4).fill(0).map((el) => [...blankArray])
  ];
}

module.exports = presets;
