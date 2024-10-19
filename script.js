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

// Key mapping for keyboard input
const keyMap = {
   'z': 'A0',
   's': 'Bb0',
   'x': 'B0',
   'c': 'C1',
   'v': 'Db1',
   'd': 'D1',
   'f': 'Eb1',
   'g': 'E1',
   'h': 'F1',
   'j': 'Gb1',
   'k': 'G1',
   'l': 'Ab1',
   ';': 'A1',
   'n': 'Bb1',
   'm': 'B1',
   ',': 'C2',
   '.': 'Db2',
   '/': 'D2',
   'q': 'E2',
   'w': 'F2',
   'e': 'Gb2',
   'r': 'G2',
   't': 'Ab2',
   'y': 'A2',
   'u': 'Bb2',
   'i': 'B2',
   'o': 'C3',
   'p': 'Db3',
   '1': 'D3',
   '2': 'Eb3',
   '3': 'E3',
   '4': 'F3',
   '5': 'Gb3',
   '6': 'G3',
   '7': 'Ab3',
   '8': 'A3',
   '9': 'Bb3',
   '0': 'B3',
   '-': 'C4',
   '=': 'Db4',
   'q': 'D4',
   'w': 'Eb4',
   'e': 'E4',
   'r': 'F4',
   't': 'Gb4',
   'y': 'G4',
   'u': 'Ab4',
   'i': 'A4',
   'o': 'Bb4',
   'p': 'B4',
   '[': 'C5',
   ']': 'Db5',
   '\\': 'D5',
   'A': 'E5',
   'S': 'F5',
   'D': 'Gb5',
   'F': 'G5',
   'G': 'Ab5',
   'H': 'A5',
   'J': 'Bb5',
   'K': 'B5',
   'L': 'C6',
   ';': 'Db6',
   '\'': 'D6',
};

keys.forEach((key) => {
   key.addEventListener('click', () => playNote(key));
});

// Function to play the note
function playNote(key) {
   const noteAudio = document.getElementById(key.dataset.note);
   if (!noteAudio) return; // Exit if no audio element is found
   noteAudio.currentTime = 0; // Reset audio to start
   noteAudio.play(); // Play the note
   key.classList.add('active'); // Add active class for visual feedback

   // Remove active class when audio ends
   noteAudio.addEventListener('ended', () => {
       key.classList.remove('active');
   });
}

// Add keyboard controls
document.addEventListener('keydown', (e) => {
   const noteToPlay = keyMap[e.key];
   if (noteToPlay) {
       const keyElement = document.querySelector(`.key[data-note="${noteToPlay}"]`);
       if (keyElement) {
           playNote(keyElement);
       }
   }
});

