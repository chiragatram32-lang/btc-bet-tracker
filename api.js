import axios from "axios";
import WebSocket from "ws";

const BINANCE_WS = "wss://stream.binance.com:9443/ws/btcusdt@trade";
const GAMMA_API = "https://gamma-api.polymarket.com/markets";
const CLOB_API = "https://clob.polymarket.com/price";

let livePrice = null;
let priceToBeat = null;
let currentMarketSlug = null;

export function startPriceStream() {
  const ws = new WebSocket(BINANCE_WS);

  ws.on("open", () => {
    console.log("Connected to Binance stream...");
  });

  ws.on("message", (data) => {
    try {
      const trade = JSON.parse(data);
      livePrice = parseFloat(trade.p);
    } catch (err) {
      console.error("WebSocket parse error:", err.message);
    }
  });

  ws.on("error", (err) => {
    console.error("WebSocket Error:", err.message);
  });

  ws.on("close", () => {
    console.log("Binance stream closed");
  });
}

export function getLivePrice() {
  return livePrice;
}

function getCurrentMarketSlug() {
  const now = Math.floor(Date.now() / 1000);
  const interval = Math.floor(now / 300) * 300;
  return `btc-updown-5m-${interval}`;
}

async function getTokenPrice(tokenId) {
  const response = await axios.get(CLOB_API, {
    params: {
      token_id: tokenId,
      side: "BUY"
    },
    timeout: 10000
  });

  return response.data.price;
}

export async function getMarketData() {
  try {
    const slug = getCurrentMarketSlug();

    const response = await axios.get(GAMMA_API, {
      params: { slug },
      timeout: 10000
    });

    const markets = response.data;

    if (!markets.length) {
      console.log("No active BTC 5m market found");
      return null;
    }

    const market = markets[0];

    if (!market.clobTokenIds) {
      console.log("No CLOB token IDs found for this market");
      return null;
    }

    const tokenIds = JSON.parse(market.clobTokenIds);

    const upPrice = await getTokenPrice(tokenIds[0]);
    const downPrice = await getTokenPrice(tokenIds[1]);

    if (currentMarketSlug !== slug) {
      currentMarketSlug = slug;
      priceToBeat = livePrice;
    }

    return {
      ptb: priceToBeat,
      up: upPrice,
      down: downPrice,
      endTime: market.endDate
    };

  } catch (err) {
    console.error("Polymarket API Error:", err.message);
    return null;
  }
}