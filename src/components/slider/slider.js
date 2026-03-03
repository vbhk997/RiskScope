"use client";

import { useState } from "react";
import "./slider.css";

const data = [
    {
        title: "VOLATILITY ANALYSIS",
        description: "RiskScope allows you to track the volatility of your portfolio for up to 1 year time period based off accurate historical insights using Yahoo Finance."
    },
    {
        title: "DIVERSIFICATION METRICS",
        description: "Using our automated generated AI insights, your holdings are analyzed by AI to then predict how diverse your portfolio is, along with a custom risk score attached to it."
    },
    {
        title: "PORTFOLIO INSIGHTS",
        description: "Dive deeper into your investments by accumulating all your investments from different platforms onto one place, tracking top performers, total amount, daily gains and losses, and more."
    },
    {
        title: "SHARPE RATIO",
        description: "Easily calculate the Sharpe Ratio of your investments using our in-house calculation methods. A higher Sharpe ratio suggests a better, more efficient portfolio that generates higher returns for the risk taken. Generally, a ratio > 1 is good, > 2 is very good, and > 3 is excellent."
    }
];

export default function slider() {
    const [index, setIndex] = useState(0);

    return (
        <div className="carousel_section">
            <div className="carousel_container">
                <div className="card_container">
                    {data.map((item, i) => {
                        let position = i < index ? "prevCard" : i === index ? "activeCard" : "nextCard";
                        return (
                            <article key={i} className={`carousel_card ${position}`}>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
            <div className="slider_dots">
                {data.map((_, i) => (
                    <button key={i} onClick={() => setIndex(i)} className={i === index ? "activeDot" : "dot"} />
                ))}
            </div>
        </div>
    )


}