// Show/Hide modal functions

const note = new Audio("sounds/paper.mp3");
const oplock = new Audio("sounds/LockSound.wav");
const off = new Audio("sounds/Body.mp3");

having = false;
let issolved = false;

function showLock() {
  document.getElementById("myLock").style.display = "flex";
  initDragSwap(); // ← IMPORTANT: activate drag logic AFTER modal opens
}

function hideLock() {
  document.getElementById("myLock").style.display = "none";
}

function showModal() {
  document.getElementById("myModal").style.display = "flex";
  note.play();
}

function hideModal() {
  document.getElementById("myModal").style.display = "none";
}

function showModalnote0() {
  document.getElementById("modal-note-0").style.display = "flex";
  note.play();
}

function hideModalnote0() {
  document.getElementById("modal-note-0").style.display = "none";
}

function showModalnote1() {
  document.getElementById("modal-note-1").style.display = "flex";
  note.play();
}

function hideModalnote1() {
  document.getElementById("modal-note-1").style.display = "none";
}

function showLock2() {
  document.getElementById("myLock2").style.display = "flex";
  document.getElementById("lock2Input").value = ""; // clear previous input
  document.getElementById("lock2Message").textContent = "";
}

function showModalMiddle() {
  document.getElementById("modal-middle-note").style.display = "flex";
  note.play();
}

function hideModalMiddle() {
  document.getElementById("modal-middle-note").style.display = "none";
}

function hideLock2() {
  document.getElementById("myLock2").style.display = "none";
}

function showModalSecond() {
  document.getElementById("modal-second-note").style.display = "flex";
  note.play();
}

function hideModalSecond() {
  document.getElementById("modal-second-note").style.display = "none";
}

function showModalThird() {
  document.getElementById("modal-third-note").style.display = "flex";
  note.play();
}

function hideModalThird() {
  document.getElementById("modal-third-note").style.display = "none";
}

function checkLock2() {
  const input = document
    .getElementById("lock2Input")
    .value.trim()
    .toLowerCase();
  const message = document.getElementById("lock2Message");
  const correctCode = "house";

  if (input === correctCode) {
    message.style.color = "green";
    message.textContent = "Correct! Unlocking...";
    oplock.play();

    setTimeout(() => {
      const overlay = document.getElementById("fadeOverlay");
      overlay.style.opacity = 1; // fade to black
      overlay.style.pointerEvents = "auto"; // make it catch events if needed

      // create typewriter text
      const typeText = document.createElement("div");
      typeText.id = "typewriterText";
      typeText.style.position = "absolute";
      typeText.style.top = "50%";
      typeText.style.left = "50%";
      typeText.style.transform = "translate(-50%, -50%)";
      typeText.style.color = "white";
      typeText.style.fontSize = "2rem";
      typeText.style.fontFamily = "Creepster, cursive";
      overlay.appendChild(typeText);
      overlay.style.opacity = 1; // fade to black

      const textToDisplay =
        "This is too crazy to stay here any longer, I need to get out of here!!!";
      let index = 0;

      const typingInterval = setInterval(() => {
        typeText.textContent += textToDisplay[index];
        index++;
        if (index >= textToDisplay.length) clearInterval(typingInterval);
      }, 100); // speed of typing in ms

      // after 2 seconds (or longer if you want), change background
      setTimeout(() => {
        document.body.style.backgroundImage = "url('Images/ESCAPE_BACK.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";

        // remove old content
        document.querySelectorAll("body > *").forEach((el) => {
          if (el.id !== "fadeOverlay") el.remove();
        });

        // fade overlay out
        overlay.style.opacity = 0;

        // make body clickable
        document.body.style.cursor = "pointer";
        document.body.addEventListener(
          "click",
          () => {
            window.location.href = "https://lvhphv.csb.app/";
          },
          { once: true }
        );
      }, 8000);
    }, 1000); // small delay before starting fade
  } else {
    message.style.color = "red";
    message.textContent = "Wrong passcode, try again.";
  }
}

window.addEventListener("load", () => {
  const music = document.querySelector("audio");
  music.volume = 1.5; // optional
  music.play();
});

// ----------------------------
// DRAG & SWAP LOGIC
// ----------------------------

function initDragSwap() {
  const imgs = document.querySelectorAll(".modall .insidepieces img");

  let draggedImg = null;
  let draggedContainer = null;

  imgs.forEach((img) => {
    img.draggable = true;

    img.addEventListener("dragstart", function (e) {
      draggedImg = e.target;
      draggedContainer = e.target.closest(".insidepieces");
      e.dataTransfer.effectAllowed = "move";
    });

    img.addEventListener("dragover", function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    });

    img.addEventListener("drop", function (e) {
      e.preventDefault();

      const dropContainer = e.target.closest(".insidepieces");
      if (!dropContainer || !draggedContainer || !draggedImg) return;

      // the image currently inside the drop cell
      const targetImg = dropContainer.querySelector("img");
      if (!targetImg) return;

      setTimeout(() => {
        draggedContainer.replaceChildren(targetImg);
        dropContainer.replaceChildren(draggedImg);

        const imgs1 = draggedContainer.querySelectorAll("img");
        if (imgs1.length > 1) {
          for (let i = 1; i < imgs1.length; i++) imgs1[i].remove();
        }

        const imgs2 = dropContainer.querySelectorAll("img");
        if (imgs2.length > 1) {
          for (let i = 1; i < imgs2.length; i++) imgs2[i].remove();
        }

        checkMiddle();
      }, 60);
    });
  });
}

function checkMiddle() {
  const correct = [
    "numbers/number0.png",
    "numbers/number5.png",
    "numbers/number4.png",
    "numbers/number8.png",
    "numbers/number0.png",
  ];

  const pieces = document.querySelectorAll(".modall .pieces");
  let correctmiddle = true;

  for (let numberdiv = 0; numberdiv < pieces.length; numberdiv++) {
    const middle = pieces[numberdiv].querySelectorAll(".insidepieces")[2];
    if (!middle) continue;

    const img = middle.querySelector("img"); // single image
    if (!img || !img.src.includes(correct[numberdiv])) {
      correctmiddle = false;
      break;
    }
  }

  if (correctmiddle) {
    console.log("correct ");
    flashLight();
    issolved = true;
  } else {
    console.log("not yet");
  }
}

function flashLight() {
  hideLock();

  const replacement = document.getElementById("uvlight");

  replacement.src = "Images/uvlighta.png";
  replacement.style.display = "block"; // make image visible

  replacement.classList.add("flash");

  replacement.addEventListener(
    "animationend",
    () => {
      replacement.classList.remove("flash");
    },
    { once: true }
  );

  // Click to equip the flashlight
  replacement.onclick = function () {
    if (issolved) {
      having = true; // activate flashlight
      replacement.style.display = "none"; // hide the static image
      document.body.style.cursor = "none"; // hide default cursor
      const darkness = document.getElementById("darkness");
      darkness.style.opacity = 1;
      console.log("UV flashlight equipped!");
      off.play();
    }
  };
}

/*flashlight lighting cursor code*/

const puplight = document.getElementById("lighting");

let updown = window.innerHeight / 2;
let leftright = window.innerWidth / 2;

let lighterud = updown;
let lighterlr = leftright;
const ease = 0.2;

window.addEventListener("pointermove", function (moving) {
  updown = moving.clientY;
  leftright = moving.clientX;
});

function continuous() {
  if (having) {
    puplight.style.display = "block";

    lighterud += (updown - lighterud) * ease;
    lighterlr += (leftright - lighterlr) * ease;

    puplight.style.left = lighterlr + "px";
    puplight.style.top = lighterud + "px";

    darkness.style.setProperty("--x", lighterlr + "px");
    darkness.style.setProperty("--y", lighterud + "px");
    darkness.style.opacity = "1";
  } else {
    puplight.style.display = "none";
    darkness.style.opacity = "0";
  }

  requestAnimationFrame(continuous);
}

continuous();

// Array of UV targets
const uvTargets = [
  {
    target: document.getElementById("modal-note-1"),
    content: "Letterlock/Fainted E.png",
  },
  {
    target: document.getElementById("modal-note-0"),
    content: "Letterlock/Fainted B.png",
  },
  {
    target: document.getElementById("modal-middle-note"),
    content: "Letterlock/Fainted R.png",
  },

  {
    target: document.getElementById("modal-second-note"),
    content: "Letterlock/Fainted L.png",
  },

  {
    target: document.getElementById("modal-third-note"),
    content: "Letterlock/Fainted P.png",
  },
];

// Create UV reveal element
const uvReveal = document.createElement("div");
uvReveal.id = "uv-reveal";
uvReveal.style.position = "absolute"; // relative to modal
uvReveal.style.pointerEvents = "none";
uvReveal.style.zIndex = "9999";
uvReveal.style.display = "none";
uvReveal.innerHTML =
  '<img src="" style="max-width:30%; max-height:30%; filter: drop-shadow(0 0 20px rgba(168,85,255,0.9)); border-radius:10px;">';
document.body.appendChild(uvReveal);

// Pointer movement
window.addEventListener("pointermove", (e) => {
  if (!having) return;

  let revealed = false;

  for (let r of uvTargets) {
    const rect = r.target.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      uvReveal.querySelector("img").src = r.content;
      uvReveal.style.display = "block";

      // Calculate center of the target modal
      const centerX = rect.left + rect.width / 2 - uvReveal.offsetWidth / 2;
      const centerY = rect.top + rect.height / 2 - uvReveal.offsetHeight / 2;
      uvReveal.style.left = centerX + "px";
      uvReveal.style.top = centerY + "px";

      revealed = true;
      break;
    }
  }

  if (!revealed) {
    uvReveal.style.display = "none";
  }
});
