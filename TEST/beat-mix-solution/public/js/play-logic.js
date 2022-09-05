// Initial states

const flags = {
  '.clear': false,
  '.invert': false,
  '.single-drum-grid': false,
  '#clear-all': false,
  '.presets': false,
  '#stop': false,
  '#save-preset': false,
};

let activePreset = 0;
let savedPreset = false;

const presets = [
  [],
  [],
  [],
  [],
];

const SIZE = 5;

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

// Sound Logic

let tempo = 120;
let timeOut;

let currentStep = 0;

const play = () => {
  $('.single-drum-grid').removeClass('playing');
  Object.keys(drums).forEach((drum) => {
    $(`#${drum}-${currentStep}`).addClass('playing');
    if (drums[drum][currentStep]) {
      let buf = drumSounds[drum];
      playDrum(buf);
    }
  });
  currentStep = (currentStep + 1) % 16;
  timeOut = window.setTimeout(play, 1000 / (tempo / 60) / 4);
};

const stop = () => {
  $('.single-drum-grid').removeClass('playing');
  currentStep = 0;
  window.clearTimeout(timeOut);
  timeOut = null;
};

// Drawing logic

const redrawDrumRow = (drumType) => {
  drums[drumType].forEach((drumVal, index) => {
    const $drum = $(`#${drumType}-${index}`);
    if (drumVal) {
      $drum.addClass('active');
    } else {
      $drum.removeClass('active');
    }
  });
};

const redrawDrums = () => {
  redrawDrumRow('kicks');
  redrawDrumRow('snares');
  redrawDrumRow('hiHats');
  redrawDrumRow('rideCymbals');
};

const drawPreset = (id) => {
  const preset = presets[id];
  kicks = preset[0];
  snares = preset[1];
  hiHats = preset[2];
  rideCymbals = preset[3];
  redrawDrums();
};

// Preset logic

const savePreset = () => {
  $savePreset = $('#save-preset');
  $savePreset.addClass('clicked');
  flags['#save-preset'] = true;
  const arr = [kicks, snares, hiHats, rideCymbals];
  $.ajax({
    url: `http://localhost:4001/presets/${activePreset}`,
    dataType: 'json',
    contentType: 'application/json',
    type: 'PUT',
    data: JSON.stringify(arr),
  })
  .done((results) => {
    $(`#preset-${activePreset}`).addClass('saved');
    presets[activePreset] = results;
    drawPreset(activePreset);
    $savePreset.addClass('saved');
    $savePreset.text('Saved Preset!');
    savedPreset = true;
  });
};

const getPresets = () => {
  $.get({
    url: 'http://localhost:4001/presets'
  })
  .done((results) => {
    let presetDoesNotExist = results.every((presetArrays, index) => {
      let isPreset = presetArrays.some((drumArray) => {
        return drumArray.some((step) => step !== false);
      });
      if (isPreset) {
        $(`#preset-${index}`).addClass('saved');
      }
      return isPreset;
    });
    if (presetDoesNotExist) {
      $('#preset-0').addClass('active');
    }
  });
};

// Synth setup

let synthPlaying = false;

let synths = {};

const setupSynths = () => {
  const $synthGrid = $('#synth-grid');
  const synthDivs = [];
  for (let i = 0; i < SIZE; i ++) {
    let synthRow = [];
    for (let j = 0; j < SIZE; j++) {
      const id = `synth-${j}-${4 - i}`;
      synthRow.push(`<div id="${id}" class="single-synth"></div>`);
      let oscillator = audioCtx.createOscillator();
      oscillator.type = 'triangle';
      oscillator.frequency.value = 100 * (4 - i + j + Math.floor(Math.random() * 2));
      let gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      gainNode.gain.value = 0;
      oscillator.start();
      synths[id] = {
        oscillator: oscillator,
        gainNode: gainNode,
      };
    }
    synthDivs.push(`<div class="synth-row">${synthRow.join('\n')}</div>`);
  }
  $synthGrid.append(synthDivs.join('\n'));
};

// Drums setup

const setupDrums = () => {
  const $drumButtonGrid = $('#drum-button-grid');
  const $drumPadGrid = $('#drum-grid');
  let drumTypes = Object.keys(drums).reverse();
  drumTypes.forEach((drumName) => {
    // Add drum grids to DOM
    const drumGridDivs = [];
    for (let i = 0; i < 16; i++) {
      drumGridDivs.push(`<div id="${drumName}-${i}" class="single-drum-grid"></div>`);
    }
    $drumPadGrid.append(`<div id="${drumName}" class="drum-row">${drumGridDivs.join('\n')}</div>`);

    // Add invert/clear buttons to DOM
    const drumButtons = [];
    drumButtons.push(`<div id="invert-${drumName}" class="invert button">Invert</div>`);
    drumButtons.push(`<div id="clear-${drumName}" class="clear button">Clear</div>`);
    $drumButtonGrid.append(`<div id="${drumName}" class="drum-row">${drumButtons.join('\n')}</div>`);
  });
};

const generateNeighborIds = (id) => {
  let [_, x, y] = id.split('-');
  let positions = getNeighborPads(+x, +y, 5);
  if (!positions) return;
  return positions.map((position) => {
    return `synth-${position[0]}-${position[1]}`;
  });
};

const startOrStopNeighbors = (mode, id) => {
  let ids = generateNeighborIds(id);
  if (!ids) return;
  ids.forEach((id) => {
    if (mode === 'start') {
      $(`#${id}`).addClass('playing-neighbor');
      synths[id].gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);
    } else if (mode === 'stop') {
      $(`#${id}`).removeClass('playing-neighbor');
      synths[id].gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.05);
    }
  });
};

// register handlers
$(() => {
  // Set up DOM
  setupDrums();
  setupSynths();
  getPresets();

  // drum grid toggle
  $('.single-drum-grid').on('mousedown', function() {
    if (savedPreset) {
      savedPreset = false;
      $('#save-preset').removeClass('saved').text('Save Preset');
    }
    const [drumType, id] = $(this).attr('id').split('-');
    toggleDrum(drumType, id);
    const shouldBeActive = drums[drumType][id];
    if (shouldBeActive) {
      if (!timeOut) {
        let buf = drumSounds[drumType];
        playDrum(buf);
      }
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  // tempo slider handler
  $('#tempo-slider').on('input', function() {
    const val = $(this).val();
    tempo = Number(val);
    $('#tempo').text(val);
  });

  // clear button handler
  $('.clear').on('mousedown', function() {
    flags['.clear'] = true;
    $(this).addClass('clicked')
    const drumType = $(this).attr('id').slice(6);
    clear(drumType);
    redrawDrumRow(drumType);
  });

  // invert button handler
  $('.invert').on('mousedown', function() {
    flags['.invert'] = true;
    $(this).addClass('clicked');
    const drumType = $(this).attr('id').slice(7);
    invert(drumType);
    redrawDrumRow(drumType);
  });

  
  $('#play').on('mousedown', function() {
    if (!timeOut) {
      play();
    }
  });

  $('#stop').on('mousedown', function() {
    flags['#stop'] = true;
    $(this).addClass('clicked');
    stop();
  });

  function turnOnSynthNeighbors() {
    $this = $(this);
    const id = $this.attr('id');
    $this.addClass('active');
    synthPlaying = true;
    startOrStopNeighbors('start', id);
    synths[id].gainNode.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.05);
  }

  function turnOffSynthNeighbors() {
    $this = $(this);
    const id = $this.attr('id');
    $(this).removeClass('active');
    startOrStopNeighbors('stop', id);
    synths[id].gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.05);
  }

  $('.single-synth').on({
    mousedown: turnOnSynthNeighbors,
    mouseup: turnOffSynthNeighbors,
    mouseenter: function() {
     if (synthPlaying) {
       turnOnSynthNeighbors.call(this);
     }
    },
    mouseleave: turnOffSynthNeighbors
  });

  // turn clicked appearance off
  $('*').on('mouseup', function() {
    synthPlaying = false;
    Object.keys(flags).forEach((key) => {
      if (flags[key]) {
        $(key).removeClass('clicked');
        flags[key] = false;
      }
    });
  });

  $('#clear-all').on('mousedown', function() {
    $(this).addClass('clicked');
    flags['#clear-all'] = true;
    Object.keys(drums).forEach((name) => {
      clear(name);
      redrawDrumRow(name);
    });
  });

  $('.preset').on('mousedown', function() {
    if (savedPreset) {
      savedPreset = false;
      $('#save-preset').removeClass('saved').text('Save Preset');
    }
    $('.preset').removeClass('active');
    $this = $(this);
    $this.addClass('active');
    const id = $this.attr('id').slice(7);
    activePreset = id;
    $.ajax({
      url: `http://localhost:4001/presets/${id}`,
      type: 'GET'
    })
    .done((results) => {
      if (results[0].length > 0) {
        presets[activePreset] = results;
        drawPreset(activePreset);
      }
    });
  });

  $('#save-preset').on('mousedown', savePreset);

  // keyboard handlers
  $(document).on('keydown', (e) => {
    if (e.key === 's' && (e.ctrlKey||e.metaKey)) {
      e.preventDefault();
      savePreset();
    } else if (e.key === ' ') {
      if (timeOut) {
        stop();
      } else {
        play();
      }
    }
  });
});
