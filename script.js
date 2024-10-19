const notes = [
   'A0', 'Bb0', 'B0', 'C1', 'Db1', 'D1', 'Eb1', 'E1',
   'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'B1', 'C2',
   'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2',
   'A2', 'Bb2', 'B2', 'C3', 'Db3', 'D3', 'Eb3', 'E3',
   'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'C4',
   'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4',
   'A4', 'Bb4', 'B4', 'C5', 'Db5', 'D5', 'Eb5', 'E5',
   'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5', 'C6',
   'Db6', 'D6', 'Eb6', 'E6', 'F6', 'Gb6', 'G6', 'Ab6',
   'A6', 'Bb6', 'B6', 'C7', 'Db7', 'D7', 'Eb7', 'E7',
   'F7', 'Gb7', 'G7', 'Ab7', 'A7', 'Bb7', 'B7', 'C8',
];

const keys = document.querySelectorAll('.key');
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const noteBuffers = {};

// Preload notes
function preloadNotes() {
   const promises = notes.map(note => 
       fetch(`notes/${note}.mp3`)
           .then(response => response.arrayBuffer())
           .then(data => audioContext.decodeAudioData(data)
               .then(buffer => { noteBuffers[note] = buffer; })
           )
           .catch(error => console.error('Error preloading audio:', error))
   );

   return Promise.all(promises);
}

preloadNotes();

// Function to play the preloaded note
function playPreloadedNote(note) {
   if (!noteBuffers[note]) return;
   const source = audioContext.createBufferSource();
   source.buffer = noteBuffers[note];
   source.connect(audioContext.destination);
   source.start(0);
}

// Function to handle playing keys
function handleKeyPlay(event) {
   const targetKey = event.target.closest('.key');
   if (targetKey) {
       const note = targetKey.dataset.note;
       targetKey.classList.add('active');
       playPreloadedNote(note);
   }
}

// Mouse and touch event listeners
const handleMouseDown = (event) => {
   event.preventDefault();
   handleKeyPlay(event);
   document.addEventListener('mousemove', handleKeyPlay);
};

const handleMouseUp = () => {
   keys.forEach(key => key.classList.remove('active'));
   document.removeEventListener('mousemove', handleKeyPlay);
};

const handleTouchStart = (event) => {
   event.preventDefault();
   handleKeyPlay(event.touches[0]);
   document.addEventListener('touchmove', handleKeyPlay);
};

const handleTouchEnd = () => {
   keys.forEach(key => key.classList.remove('active'));
   document.removeEventListener('touchmove', handleKeyPlay);
};

// Add event listeners for mouse clicks on keys
keys.forEach(key => {
   key.addEventListener('mousedown', handleMouseDown);
   key.addEventListener('mouseup', handleMouseUp);

   // For touch devices
   key.addEventListener('touchstart', handleTouchStart);
   key.addEventListener('touchend', handleTouchEnd);
});

// Key mapping for keyboard input
const keyMap = {
   // Your existing key mapping...
};

document.addEventListener('keydown', event => {
   const note = keyMap[event.key];
   if (note) {
       const keyElement = [...keys].find(key => key.dataset.note === note);
       if (keyElement) {
           keyElement.classList.add('active');
           playPreloadedNote(note);
       }
   }
});

document.addEventListener('keyup', event => {
   const note = keyMap[event.key];
   if (note) {
       const keyElement = [...keys].find(key => key.dataset.note === note);
       if (keyElement) {
           keyElement.classList.remove('active');
       }
   }
});

hueRange.addEventListener('input', function () {
   const hueValue = this.value;
   document.documentElement.style.setProperty('--hue', hueValue);
   
   // Select all white and black piano keys
   const whiteKeys = document.querySelectorAll('.white'); // Change to your actual class name
   const blackKeys = document.querySelectorAll('.black'); // Change to your actual class name

   // Apply hue to white keys
   whiteKeys.forEach(key => {
       key.style.backgroundColor = `hsl(${hueValue}, 100%, 90%)`; // Lighter hue for white keys
   });

   // Apply hue to black keys
   blackKeys.forEach(key => {
       key.style.backgroundColor = `hsl(${hueValue}, 100%, ,40%)`; // Darker hue for black keys
   });

   console.log(`Hue set to: ${hueValue}`);
});
