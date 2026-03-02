import Link from "next/link";
import "./landing.css";
import Header from "../components/header/header";
import Slider from "../components/slider/slider";
import TickerRibbon from "../components/tickerribbon/tickerribbon";


export default function LandingPage() {
  return (
    <div className="landing-container">

      <Header />

      <Slider />

      <TickerRibbon />

      <section className="features-section">

        <div className="feature-card">
          <h3>Portfolio Tracking</h3>
          <p>Track holdings and monitor daily changes in one clean dashboard.</p>
        </div>

        <div className="feature-card">
          <h3>Risk Metrics</h3>
          <p>Understand volatility and identify overexposure easily.</p>
        </div>

        <div className="feature-card">
          <h3>Diversification Insights</h3>
          <p>Visualize allocation and balance your portfolio effectively.</p>
        </div>

      </section>

      <footer className="footer">
        <div className="main-content">
          <div className="column1">
            <h3>RiskScope</h3>
            <p>RiskScope is a portfolio analytics platform that helps investors track their holdings and monitor daily changes in one clean dashboard.</p>
          </div>
          <div className="column2">
            <h3>Features</h3>
            <ul>
              <li>Portfolio Tracking</li>
              <li>Risk Metrics</li>
              <li>Diversification Insights</li>
            </ul>
          </div>
          <div className="column3">
            <h3>Contact</h3>
            <ul>
              <li>Email: vkk5156@psu.edu</li>
              <li>Phone: +1 (123) 456-7890</li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  );
}