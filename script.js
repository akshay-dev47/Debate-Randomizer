// =================== TOPICS LIST ===================
let topics = [
  "Should Mobile Phones Be Banned in Classrooms?",
  "Is Online Learning Better than Classroom Learning?",
  "Is ‘Work from Home’ Better than ‘Work from Office’ for India’s IT Industry?",
  "Are College Degrees Losing Value in Today’s Job Market?",
  "Should Junk Food Be Sold in Vending Machines or Cafeterias at Schools/Colleges?",
  "Are Big Tech Giants like google Too Powerful or Is Their Success a Product of Market Demand?",
  "Is Data Privacy a Myth in the Digital Age?",
  "Do Marks Matter for Jobs?",
  "Is It Better for Students to Select an MNC or a Startup?",
  "Does Social Media Do More Harm Than Good for Students?",
  "Should Companies Be Held Accountable for Creating 'Addictive' Digital Experiences?",
  "Will Robots Ever Replace Teachers in Classrooms?",
  "Should College Exams Be Replaced with Skill Tests?",
  "Will Humans Lose Creativity if We Depend Too Much on Technology?",
  "Is AI a Threat to Human Employment or a Tool for Human Progress?",
  "Should Voting Be Made Mandatory in Democracies?",
  "Does Social Media Corrupt Human Interactions?",
  "Should Religious Attire be Allowed in Educational Institutions?"
];

// Elements
const generateBtn = document.getElementById("generateBtn");
const roller = document.getElementById("roller");
const resultText = document.getElementById("resultText");
const overlay = document.getElementById("overlay");
const overlayTopic = document.getElementById("overlayTopic");
const closeOverlay = document.getElementById("closeOverlay");

// =================== RANDOMIZER ===================
generateBtn.addEventListener("click", () => {
  if (topics.length === 0) {
    alert("No topics left!");
    return;
  }

  let counter = 0;
  resultText.textContent = "";
  roller.textContent = "";

  // Roller effect
  const rollInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * topics.length);
    roller.textContent = topics[randomIndex];
    counter++;

    if (counter > 20) { // stop after 20 iterations
      clearInterval(rollInterval);

      // Pick final topic
      const finalIndex = Math.floor(Math.random() * topics.length);
      const finalTopic = topics[finalIndex];

      // Show final topic
      resultText.textContent = finalTopic;
      roller.textContent = "";

      // Show fullscreen overlay
      overlayTopic.textContent = finalTopic;
      overlay.style.display = "flex";

      // Remove topic from array so it can't repeat
      topics.splice(finalIndex, 1);

      // Play sound when topic is revealed
      const sound = document.getElementById("topicSound");
      sound.currentTime = 0;
      sound.play();
    }
  }, 100);
});

// Close overlay
closeOverlay.addEventListener("click", () => {
  overlay.style.display = "none";
});

// =================== CUSTOM TIMER (MM:SS) ===================
let timerInterval;
let countdown = 0;

const customTimeInput = document.getElementById("custom-time");
const startBtn = document.getElementById("start-timer-btn");
const resetBtn = document.getElementById("reset-timer-btn");
const timerDisplay = document.getElementById("debate-timer");
const warningSound = document.getElementById("warningSound");

function parseTime(input) {
  if (input.includes(":")) {
    let [m, s] = input.split(":").map(Number);
    return (m * 60) + (s || 0);
  } else {
    return parseInt(input, 10) * 60;
  }
}

function startTimer(duration) {
  clearInterval(timerInterval);
  countdown = duration;

  timerInterval = setInterval(() => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    timerDisplay.textContent =
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (countdown === 7) {
      warningSound.currentTime = 0;
      warningSound.play();
    }

    if (countdown <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "⏰ Time's up!";
    }

    countdown--;
  }, 1000);
}

// Start button
startBtn.addEventListener("click", () => {
  let inputVal = customTimeInput.value.trim();
  if (inputVal) {
    let totalSeconds = parseTime(inputVal);
    if (totalSeconds > 0) {
      startTimer(totalSeconds);
      startBtn.style.display = "none";
      resetBtn.style.display = "inline-block";
      customTimeInput.disabled = true;
    } else {
      alert("Please enter a valid time (e.g. 3 or 3:00).");
    }
  }
});

// Reset button
resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerDisplay.textContent = "00:00";
  customTimeInput.disabled = false;
  startBtn.style.display = "inline-block";
  resetBtn.style.display = "none";
});
