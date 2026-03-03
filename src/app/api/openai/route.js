import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request) {
    const { holdings } = await request.json(); // get all the holdings of the user from the passed in request

    const prompt = `You are a financial expert and an economist. For each of these stocks in the user's holdings in 
    ${holdings.map(h => `${h.symbol} (${h.weight}%)`).join(", ")}, analyze and give a statement on the diversification of the portfolio
    in 3-5 words max. Very important: do not exceed the word limit.`

    const result = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
    });

    return Response.json({ statement: result.choices[0].message.content.trim() });
}