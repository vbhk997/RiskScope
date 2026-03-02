export async function GET(request) {
    const symbol = new URL(request.url).searchParams.get("symbol");
    const result = await fetch(`https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1y`,
        { headers: { "User-Agent": "Mozilla/5.0" } }
    ); //removed double json: test once before submitting

    const data = await result.json();
    const closing_prices = data?.chart?.result?.[0]?.indicators?.quote?.[0]?.close; //get closing prices for each day for a year
    return Response.json(closing_prices.filter(Boolean)); //removes null values for example days when market was closed
}