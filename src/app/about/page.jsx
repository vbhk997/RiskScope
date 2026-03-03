import "./about.css";
import Header from "../../components/header/header";

export default function AboutPage() {
    return (

        <div className="about-container">

            <Header />

            <div className="about-wrapper">
                <div className="about-description">
                    <div className="about-riskscope">
                        <h1>About RiskScope</h1>
                        <p>
                            Riskscope is a portfolio analysis platform that givesusers the ability
                            to manage their investment portfolio across varioud platforms, as well
                            as assess metrics such as volatility, diversification, as well as sharpe ratio,
                            all of it combined with an AI generated insight to better understand their investments.
                            Riskscope gives users the power to understand finances better and take informed decisions.
                        </p>
                    </div>
                    <div className="leader-card">
                        <div className="leader-info">
                            <h3>Vaibhav Kumar</h3>
                            <p className="leader-description">
                                Vaibhav is the founder and CEO of RiskScope. With a background in
                                Computer Science, he focuses on tech related projects as well as
                                plenty of finance inspired projects with an aim to be able to
                                contribute in the field of financial modelling and risk
                                assessment.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="leadership-section">
                </div>
            </div>
        </div>
    );
}