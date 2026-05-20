export function calculateProbabilities(ptb, current) {
  const diff = current - ptb;

  let up = 50 + diff * 5;
  let down = 100 - up;

  up = Math.max(0, Math.min(100, up));
  down = Math.max(0, Math.min(100, down));

  return {
    up: up.toFixed(2),
    down: down.toFixed(2),
  };
}
