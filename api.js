// api.js

import WebSocket from "ws";

// Binance WebSocket endpoint for live BTC/USDT trades
const URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";

/**
 * Starts the live price stream
 * @param {Function} onPrice - callback to send price updates to main controller
 */
export function startPriceStream(onPrice) {
  // Create WebSocket connection
  const ws = new WebSocket(URL);

  // Triggered whenever a new trade happens on Binance
  ws.on("message", (data) => {
    // Parse incoming JSON message
    const trade = JSON.parse(data);

    // Extract price from trade payload
    const price = parseFloat(trade.p);

    // Extract timestamp of trade (in ms)
    const timestamp = trade.T;

    // Send clean data to main logic
    onPrice({ price, timestamp });
  });

  // Connection established
  ws.on("open", () => {
    console.log("Connected to Binance stream...");
  });

  // Handle errors gracefully
  ws.on("error", (err) => {
    console.error("WebSocket error:", err.message);
  });

  // Handle connection close
  ws.on("close", () => {
    console.log("Connection closed");
  });
}