export function calculateProbabilities(ptb, current) {
  const pctChange = ((current - ptb) / ptb) * 100;

  // 1% move = 20% probability swing (tunable)
  let up = 50 + pctChange * 20;
  let down = 100 - up;

  up = Math.max(0, Math.min(100, up));
  down = Math.max(0, Math.min(100, down));

  return {
    up: up.toFixed(2),
    down: down.toFixed(2),
  };
}