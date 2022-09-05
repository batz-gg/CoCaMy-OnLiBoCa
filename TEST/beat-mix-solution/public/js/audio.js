const audioCtx = new AudioContext();

const drumSounds = {
  kicks: new ArrayBuffer(),
  snares: new ArrayBuffer(),
  rideCymbals: new ArrayBuffer(),
  hiHats: new ArrayBuffer(),
};

const drumUrls = {
  kicks: 'http://localhost:4001/audio/kick.wav',
  snares: 'http://localhost:4001/audio/snare.wav',
  rideCymbals: 'http://localhost:4001/audio/ride.wav',
  hiHats: 'http://localhost:4001/audio/hiHat.wav'
};

const getDrumAudioData = () => {
  Object.keys(drumSounds).forEach((key) => {
    const request = new XMLHttpRequest();
    request.open('GET', drumUrls[key], true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      const audioData = request.response;
      audioCtx.decodeAudioData(audioData,
        (buf) => {
          drumSounds[key] = buf;
        },
        (e) => {
          console.log('Error with decoding audio data' + e.err);
      });
    };
    request.send();
  });
};

getDrumAudioData();

const reverbUrl = 'http://localhost:4001/audio/reverb.wav';

const convolver = audioCtx.createConvolver();
const reverbGain = audioCtx.createGain();
reverbGain.gain.value = 0.2;
reverbGain.connect(convolver);
convolver.connect(audioCtx.destination);

const getReverbAudioData = () => {
  const request = new XMLHttpRequest();
  request.open('GET', reverbUrl, true);
  request.responseType = 'arraybuffer';
  request.onload = () => {
    const audioData = request.response;
    audioCtx.decodeAudioData(audioData,
      (buf) => {
        convolver.buffer = buf;
      },
      (e) => {
        console.log('Error with decoding audio data' + e.err);
      }
    );
  };
  request.send();
};

getReverbAudioData();

const playDrum = (buf) => {
  let source = audioCtx.createBufferSource();
  source.buffer = buf;
  source.connect(audioCtx.destination);
  source.connect(reverbGain);
  source.loop = false;
  source.start(0);
};

document.querySelector('body').addEventListener('click', () => {
  audioCtx.resume();
});
