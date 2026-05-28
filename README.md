# BTC Bet Tracker (Final Submission)

## Overview
This project simulates a Polymarket-style 5-minute BTC betting window using real-time market data from Binance WebSocket.

## Features
- Real-time BTC price streaming (Binance)
- 5-minute rolling PTB (Price to Beat)
- Simulated Up/Down probabilities
- Clean terminal table output (updates in-place)

## Tech Stack
- Node.js
- WebSocket (ws)
- Binance public stream

## Run Instructions

```bash
npm install
node index.js
```

## Notes
- Uses real-time trade data from Binance
- Up/Down values are derived based on price movement within the time window

## Fixes
- Implemented the intended 5-minute rolling PTB window
- Added live probability calculations using current price movement
- Updated terminal rendering for clean in-place output
