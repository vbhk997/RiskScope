"use client"

import { useState, useEffect } from "react";
import "./tickerribbon.css";

export default function TickerRibbon() {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetch("/api/stocks")
            .then(res => res.json())
            .then(data => setStocks(data.stocks || []));//added fallback
    }, []); //call api to get stock data

    if (stocks.length === 0) return null;
    const doubled = [...stocks, ...stocks]; // increase lenbgth for better looping

    return (
        <div className="ticker-ribbon">
            <div className="ticker-track">
                {doubled.map((stock, i) => (
                    <div key={`${stock.symbol}-${i}`} className="ticker-item">
                        <span>{stock.symbol}</span>
                        <span>{stock.price}</span>
                        <span>{stock.change}</span>
                        <span>{stock.changePercent}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
