export async function GET(request) {
    const symbols = new URL(request.url).searchParams.get("symbols").split(",");
    const results = await Promise.all(
        symbols.map(s =>
            fetch(`https://query2.finance.yahoo.com/v8/finance/chart/${s}?interval=1d&range=1d`,
                { headers: { "User-Agent": "Mozilla/5.0" } }
            ).then(r => r.json())
        )
    );

    const prices = results.map(d => {
        const meta = d?.chart?.result?.[0]?.meta; //get meta data for each symbol from yahoo finance api

        if (!meta) return null;

        const price = meta.regularMarketPrice; //get the current price of the symbol
        const prev = meta.chartPreviousClose; //get the previous close price of the symbol
        return { symbol: meta.symbol, price, change: +(price - prev).toFixed(2) }; //return the symbol, price and change
    }).filter(Boolean);

    return Response.json(prices);
}