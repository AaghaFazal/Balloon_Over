// script.js

const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
let score = 0;

// Function to generate a random position
function getRandomPosition() {
    const x = Math.floor(Math.random() * (window.innerWidth - 60)); // Adjusted for balloon width
    return { x };
}

// Function to create a balloon
function createBalloon() {
    const balloon = document.createElement("div");
    balloon.className = "balloon";

    // Set random horizontal position for the balloon
    const { x } = getRandomPosition();
    balloon.style.left = `${x}px`;

    // Add event listener to automatically "blast" the balloon when the cursor is above it
    balloon.addEventListener("mouseover", () => {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        // Create blast effect
        const blastEffect = document.createElement("div");
        blastEffect.className = "blast";
        blastEffect.style.left = balloon.style.left;
        blastEffect.style.top = balloon.style.top;
        
        // Add blast effect to the game area
        gameArea.appendChild(blastEffect);

        // Remove the blast effect after the animation
        setTimeout(() => {
            gameArea.removeChild(blastEffect);
        }, 500);

        // Remove the balloon
        gameArea.removeChild(balloon);
    });

    // Add balloon to the game area
    gameArea.appendChild(balloon);

    // Remove balloon after a certain amount of time if it wasn't clicked
    setTimeout(() => {
        if (gameArea.contains(balloon)) {
            gameArea.removeChild(balloon);
        }
    }, 5000);
}

// Create balloons at intervals
setInterval(createBalloon, 1000); // Create a new balloon every second
