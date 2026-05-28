/**
 * Format USD values
 */
function formatUSD(value) {
  if (
    value === null ||
    value === undefined ||
    isNaN(value)
  ) {
    return "N/A";
  }

  return `$${Number(value).toFixed(2)}`;
}

/**
 * Format remaining time
 */
function formatTime(seconds) {
  if (
    seconds === null ||
    seconds === undefined ||
    isNaN(seconds)
  ) {
    return "N/A";
  }

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}m ${secs}s`;
}

/**
 * Render terminal output
 */
export function render({
  ptb,
  price,
  up,
  down,
  remaining
}) {

  /**
   * Clear terminal
   */
  process.stdout.write("\x1Bc");

  console.log(
    "Polymarket BTC Market\n"
  );

  console.log(
    `PTB: ${formatUSD(ptb)}`
  );

  console.log(
    `Live Price: ${formatUSD(price)}`
  );

  console.log(
    `Up: ${
      up !== undefined
        ? up
        : "N/A"
    }`
  );

  console.log(
    `Down: ${
      down !== undefined
        ? down
        : "N/A"
    }`
  );

  console.log(
    `Expires In: ${formatTime(
      remaining
    )}`
  );
}