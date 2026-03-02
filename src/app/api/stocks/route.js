// add caching so that rate limits are not exceeded
let cache = null;
let time = 0;
const total_duration = 12 * 60 * 60 * 1000; //12 hours limit for one api call to be reset

export async function GET() {
    // return Response.json({ message: "Hello World" });

    //if we already have cache stored then return it if within the time limit
    if (cache && Date.now() - time < total_duration) {
        return Response.json({ stocks: cache });
    }

    const symbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "NVDA", "META"]; //standard tickers to show on main page

    const stocks = [];

    try {
        // fetch all symbols in parallel using the chart endpoint (quote endpoint is blocked server-side)
        const results = await Promise.all(
            symbols.map(symbol =>
                fetch(`https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
                    { headers: { "User-Agent": "Mozilla/5.0" } }
                ).then(r => r.json())
            )
        );

        // push each stock data to stocks array
        for (const data of results) {
            const meta = data?.chart?.result?.[0]?.meta;
            if (!meta) continue;
            const price = meta.regularMarketPrice;
            const prev = meta.chartPreviousClose;
            const change = (price - prev).toFixed(2);
            const changePct = (((price - prev) / prev) * 100).toFixed(2) + "%";
            stocks.push({
                symbol: meta.symbol,
                price: price.toFixed(2),
                change,
                changePercent: changePct
            });
        }

        //update cache
        cache = stocks;
        time = Date.now();
        return Response.json({ stocks }); //return stocks

    } catch (e) {
        if (cache) return Response.json({ stocks: cache }); //if we do not have any api result we check and return cached data from earlier
        return Response.json({ error: "Failed to fetch stocks" });
    }

}