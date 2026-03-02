"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./portfolio.css";
import Dashboardheader from "../../components/dashboardheader/dbheader";

export default function Portfolio() {

    const [portfolio, setPortfolio] = useState({});
    const [ticker, setTicker] = useState("");
    const [shares, setShares] = useState("");
    const [uid, setUid] = useState(null);

    //load the current portfolio from firestore
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.replace("/");
                return;
            }
            setUid(user.uid);
            const data = await getDoc(doc(db, "portfolios", user.uid));
            if (data.exists()) {
                setPortfolio(data.data());
            }
        });
    }, []);

    //add new stock to portfolio
    const addStock = () => {
        if (!ticker || !shares || !uid) return;
        const updated = { ...portfolio, [ticker.toUpperCase()]: Number(shares) };
        setPortfolio(updated);
        setDoc(doc(db, "portfolios", uid), updated); //each time new stock is added it gets saved
        setTicker(""); //make ticker value back to null to add more
        setShares(""); //reset share value back to default after adding
    }

    //remove stock from portfolio
    const removeStock = (symbol) => {
        const updated = { ...portfolio }; //get the value of current portfolio
        delete updated[symbol]; //delete required ticker
        setPortfolio(updated) //set new portfolio
        setDoc(doc(db, "portfolios", uid), updated); //update db
    }

    return (
        <div className="portfolio-container">
            <Dashboardheader />
            <div className="main-content">
                <h1>Add Stock Ticker</h1>

                <div className="portfolio-entry">
                    {/* get input data and store them in the variables defined to evenhtually add them to the db */}
                    <input placeholder="Ticker value (exact, e.g. AAPL)" value={ticker} onChange={e => setTicker(e.target.value)} />
                    <input placeholder="Number of shares" value={shares} onChange={e => setShares(e.target.value)} />
                    <button onClick={addStock}>Add</button>
                </div>

                {/* create table to display current portfolio */}
                <h1>Current Portfolio</h1>
                <div className="table-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Ticker</th>
                                <th>Shares</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(portfolio).map(([symbol, count]) => (
                                <tr key={symbol}>
                                    <td>{symbol}</td>
                                    <td>{count}</td>
                                    <td><button onClick={() => removeStock(symbol)}>Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}