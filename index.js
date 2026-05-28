import {
  startPriceStream,
  getLivePrice,
  getMarketData
} from "./api.js";

import { render }
  from "./display.js";

/**
 * Start Binance stream
 */
startPriceStream();

/**
 * Wait for websocket
 */
setTimeout(() => {

  setInterval(async () => {

    const market =
      await getMarketData();

    const livePrice =
      getLivePrice();

    if (
      !market ||
      !livePrice
    ) {

      console.log(
        "Waiting for data..."
      );

      return;
    }

    /**
     * Remaining seconds
     */
    const remaining =
      Math.max(
        0,
        Math.floor(
          (
            new Date(
              market.endTime
            ) - Date.now()
          ) / 1000
        )
      );

    render({
      ptb: market.ptb,
      price: livePrice,
      up: market.up,
      down: market.down,
      remaining
    });

  }, 1000);

}, 5000);
