"use client";

import { useState } from "react";
import "./slider.css";

const data = [
    {
        title: "Volatility Analysis",
        description: "Track historical volatility and measure risk precisely."
    },
    {
        title: "Diversification Metrics",
        description: "Understand portfolio exposure and sector concentration."
    },
    {
        title: "Macro Risk Indicators",
        description: "Integrate economic data into your portfolio evaluation."
    },
    {
        title: "Sharpe Ratio",
        description: "Measure risk-adjusted performance accurately."
    }
];

export default function slider() {
    const [index, setIndex] = useState(0);

    const slideLeft = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const slideRight = () => {
        if (index < data.length - 1) {
            setIndex(index + 1);
        }
    };

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