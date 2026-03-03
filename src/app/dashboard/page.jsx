"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./dashboard.css";
import Dashboardheader from "../../components/dashboardheader/dbheader";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState(null);
    const [holdings, setHoldings] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [totalChange, setTotalChange] = useState(0);

    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); //get todays date

    const [top_holding, setTopHolding] = useState(null);
    const [volatility, setVolatility] = useState(null);
    const [diversification, setDiversification] = useState(null);
    const [sharperatio, setSharpeRatio] = useState(null);

    useEffect(() => {
        const logout = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.replace("/login");
            } else { //if user is successfully auth
                setUserEmail(user.email);

                //load the portfolio from the firestore db
                const data = await getDoc(doc(db, "portfolios", user.uid));
                if (!data.exists()) {
                    return;
                }
                const portfolio = data.data();
                const symbols = Object.keys(portfolio);

                //get live proces for each ticker
                const result = await fetch(`/api/prices?symbols=${symbols.join(",")}`);
                const prices = await result.json();

                //compute values and data
                let total = 0;
                for (const p of prices) { //iterate over prices and multiply by holdings to get total value
                    total += p.price * portfolio[p.symbol];
                }

                //create a array of objects for all the elements in the prices array with all the needed metrics
                const computed = prices.map(p => ({
                    symbol: p.symbol,
                    shares: portfolio[p.symbol],
                    price: p.price.toFixed(2),
                    change: p.change.toFixed(2),
                    value: (p.price * portfolio[p.symbol]).toFixed(2),
                    weight: ((p.price * portfolio[p.symbol] / total) * 100).toFixed(1)
                }));

                //find the top holding
                let top = computed[0];
                for (const h of computed) {
                    if (h.weight > top.weight) {
                        top = h;
                    }
                }

                setTopHolding(top); // set the value of best holding as of now

                //get 1 year of closing prices for each ticker in holding
                const historicaldata = await Promise.all(
                    symbols.map(s => fetch(`/api/history?symbol=${s}`).then(r => r.json()))
                );

                //compute daily returns for each ticker
                const weights = computed.map(h => h.weight / 100); //store weight for each stock
                const returns = []
                for (let i = 0; i < historicaldata[0].length; i++) {
                    let dailyreturn = 0;
                    for (let j = 0; j < symbols.length; j++) {
                        const h = historicaldata[j];
                        if (h[i] && h[i - 1]) {
                            dailyreturn += weights[j] * ((h[i] - h[i - 1]) / h[i - 1]);
                        }
                    }
                    returns.push(dailyreturn);
                }

                //compute volatility: formula = std dev x sqrt(252) fore one year
                //get mean first
                let sum = 0;
                for (const r of returns) {
                    sum += r;
                }
                const mean = sum / returns.length;

                //get variance next
                let squared_difference = 0;
                for (const r of returns) {
                    squared_difference += (r - mean) ** 2;
                }
                const variance = squared_difference / returns.length;

                //get sharpe ratio for indicator
                const sharpe = ((mean - 0.045 / 252) / Math.sqrt(variance) * Math.sqrt(252)).toFixed(2);

                //calculate volatility
                const volatility = Math.sqrt(variance) * Math.sqrt(252) * 100;
                setVolatility(volatility.toFixed(2));

                const chatbot_div = await fetch("/api/openai", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ holdings: computed })
                });

                const { statement } = await chatbot_div.json();
                setDiversification(statement);

                setHoldings(computed);
                setTotalValue(total.toFixed(2));
                setTotalChange(prices.reduce((sum, p) => sum + p.change * portfolio[p.symbol], 0).toFixed(2));
                setSharpeRatio(sharpe);
            }
        });

        return () => logout();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        router.replace("/");
    };

    if (!userEmail) return null;

    return (
        <div className="dashboard-container">
            <Dashboardheader />
            <div className="main-content">

                <div className="top-bar">
                    <h1>Portfolio Overview</h1>
                </div>

                <div className="cards">
                    <div className="card">
                        <p className="card-label">Portfolio Value</p>
                        <h2>${totalValue}</h2> {/*show total holdings as of latest date*/}
                        <p className="neutral">As of {today} </p>
                    </div>

                    <div className="card">
                        <p className="card-label">Top Holding</p> {/*show top holdings with value as of latest date*/}
                        <h2>{top_holding ? `${top_holding.symbol} ${top_holding.weight}%` : "—"}</h2>
                        <p className="neutral">${top_holding?.value}</p>
                    </div>

                    <div className="card">
                        <p className="card-label">Volatility</p>
                        <h2 className={volatility > 30 ? "volatilityred" : volatility < 15 ? "volatilitygreen" : "volatilityneutral"}>{volatility ? `${volatility}%` : "—"}</h2>
                        <p className="neutral">1Y estimate</p>
                    </div>

                    <div className="card">
                        <p className="card-label">Sharpe Ratio</p> {/*show diversification with value as of latest date*/}
                        <h2 className={sharperatio > 1 ? "volatilitygreen" : sharperatio > 0 ? "volatilityneutral" : "volatilityred"}>
                            {sharperatio ?? "—"}
                        </h2>
                        <p className="neutral">As of {today}</p>
                    </div>

                    <div className="card">
                        <p className="card-label">AI Diversification Insights</p> {/*show top holdings with value as of latest date*/}
                        <h2>{diversification}</h2>
                        <p className="neutral">Auto Generated Insight</p>
                    </div>

                </div>

                <div className="table-section">
                    <h2>Holdings</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>Ticker</th>
                                <th>Weight</th>
                                <th>Price</th>
                                <th>Daily</th>
                            </tr>
                        </thead>

                        <tbody>
                            {holdings.map(h => ( //map over the holdings and create a table row for each holding
                                <tr key={h.symbol}>
                                    <td>{h.symbol}</td>
                                    <td>{h.weight}%</td>
                                    <td>${h.price}</td>
                                    <td className={h.change > 0 ? "green" : "red"}>{h.change > 0 ? "+" : ""}{h.change}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}