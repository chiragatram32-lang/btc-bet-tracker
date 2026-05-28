# BTC Bet Tracker

A terminal-based real-time BTC tracker that simulates a Polymarket-style 5-minute prediction window.

## Overview

Every 5 minutes, a new betting window opens. The app tracks the **Price to Beat (PTB)** — the BTC price at the start of the window — and shows live Polymarket odds for whether BTC will go **UP** or **DOWN** by the end of the window.

## APIs Used

| API | What it does | Where in code |
|-----|-------------|---------------|
| **Binance WebSocket** `wss://stream.binance.com:9443/ws/btcusdt@trade` | Streams real-time BTC trade prices tick by tick | `api.js` → `startPriceStream()` |
| **Polymarket Gamma API** `https://gamma-api.polymarket.com/markets` | Fetches the current 5-minute BTC up/down market and its token IDs | `api.js` → `getMarketData()` |
| **Polymarket CLOB API** `https://clob.polymarket.com/price` | Fetches live UP and DOWN probabilities/odds for the current market | `api.js` → `getTokenPrice()` |

## Project Structure

```
btc-bet-tracker/
├── index.js      # Entry point — starts stream, runs update loop every second
├── api.js        # All data fetching: Binance WebSocket + Polymarket API calls
├── display.js    # Terminal rendering — formats and prints the live dashboard
├── package.json  # Dependencies: axios, ws
└── README.md
```

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start the tracker
node index.js
```

## What You'll See in the Terminal

```
Polymarket BTC Market

PTB:         $103,450.00   ← BTC price at start of 5-min window
Live Price:  $103,512.00   ← Current real-time Binance price
Up:          0.62          ← Polymarket odds for UP (62%)
Down:        0.38          ← Polymarket odds for DOWN (38%)
Expires In:  3m 14s        ← Time remaining in current window
```

## Tech Stack

- **Node.js** (ES Modules)
- **ws** — WebSocket client for Binance stream
- **axios** — HTTP requests to Polymarket APIs