import "./about.css";
import Header from "../../components/header/header";

export default function AboutPage() {
    return (

        <div className="about-container">

            <Header />

            <section className="about-description">
                <h1>About RiskScope</h1>
                <p>
                    RiskScope is a portfolio risk analysis platform designed to help
                    modern investors understand volatility, diversification, and
                    exposure in a simple and structured way. Our goal is to bridge
                    the financial literacy gap by providing intuitive tools that
                    make risk visible and measurable.
                </p>
            </section>

            <section className="leadership-section">
                <h2>Leadership</h2>

                <div className="leader-card">
                    <div className="leader-info">
                        <h3>Vaibhav Kumar</h3>
                        <p className="leader-title">Chief Executive Officer</p>
                        <p className="leader-description">
                            Vaibhav is the founder and CEO of RiskScope. With a background in
                            Computer Science, he focuses on building
                            structured, data-driven platforms that simplify complex
                            decision-making processes. His work centers on combining
                            technical design with practical financial insight to create
                            tools that are both powerful and intuitive.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
}