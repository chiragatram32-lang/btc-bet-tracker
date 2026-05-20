// display.js

/**
 * Formats number as USD currency
 */
function formatUSD(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

/**
 * Converts seconds into "Xm Ys" format
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

/**
 * Renders the terminal UI
 */
export function render({ ptb, price, up, down, remaining }) {
  // Clear terminal screen before re-rendering (in-place update)
  process.stdout.write("\x1Bc");

  // Helper to align columns with fixed width
  const format = (val, width = 16) =>
    String(val).padEnd(width, " ");

  // Header row
  console.log(
    format("PTB") +
      format("LIVE") +
      format("UP") +
      format("DOWN") +
      format("EXPIRES")
  );

  // Divider
  console.log("-".repeat(80));

  // Data row
  console.log(
    format(formatUSD(ptb)) +     // Price to Beat with $
      format(formatUSD(price)) + // Live price with $
      format(`${up}%`) +         // Up probability
      format(`${down}%`) +       // Down probability
      format(formatTime(remaining)) // Time left
  );
}