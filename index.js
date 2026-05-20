

// Import modules
import { startPriceStream } from "./api.js";
import { render } from "./display.js";
import { calculateProbabilities } from "./utils.js";

// PTB (Price to Beat) — initialized later
let ptb = null;

// Track when current 5-minute window started
let startTime = Date.now();

// Window duration in seconds (5 minutes)
const WINDOW = 300;

/**
 * Start receiving live price updates
 */
startPriceStream(({ price }) => {

  // Initialize PTB at first received price
  if (!ptb) {
    ptb = price;
    startTime = Date.now();
  }

  // Calculate how much time has passed
  const elapsed = Math.floor((Date.now() - startTime) / 1000);

  // Remaining time in current window
  let remaining = WINDOW - elapsed;

  // If 5 minutes passed → reset window
  if (remaining <= 0) {
    ptb = price;           // new PTB
    startTime = Date.now();// reset timer
    remaining = WINDOW;    // reset countdown
  }

  // Calculate Up/Down probabilities
  const { up, down } = calculateProbabilities(ptb, price);

  // Render updated data in terminal
  render({
    ptb,
    price,
    up,
    down,
    remaining,
  });
});