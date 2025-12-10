console.log("Preload running...");

var images = [];
function preload() {
  for (var i = 0; i < arguments.length; i++) {
    images[i] = new Image();
    images[i].src = arguments[i];
  }
}

// Preload all project images
preload(
  // Backgrounds
  "Images/background12 (1) (1).png",
  "Images/ESCAPE_BACK.png",

  // Door
  "Images/door.png",

  // Notes / modals
  "numbers/Notes 0(modal version).png",
  "numbers/Notes1(modal version).png",
  "numbers/Notes middle(modal version).png",
  "numbers/Notes sec(modal version).png",
  "numbers/Notes 8(modal version).png",

  // Cipher
  "Images/cipherr.png",

  // Letterlock / UV flashlight reveal
  "Letterlock/LetterE.png",
  "Letterlock/LetterB.png",
  "Letterlock/LetterR.png",
  "Letterlock/LetterL.png",
  "Letterlock/letterP.png",
  "Letterlock/Fainted B.png",
  "Letterlock/Fainted E.png",
  "Letterlock/Fainted L.png",
  "Letterlock/Fainted P.png",
  "Letterlock/Fainted R.png",

  // Drag & swap numbers
  "numbers/number0.png",
  "numbers/number5.png",
  "numbers/number4.png",
  "numbers/number8.png",

  "sounds/ambiancecreepy.mp3",
  "sounds/paper.mp3",
  "sounds/LockSound.wav",
  "sounds/Body.mp3",

  // Flashlight
  "Images/uvlighta.png"
);

console.log("Preload done!");
