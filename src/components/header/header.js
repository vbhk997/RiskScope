"use client";

import Link from "next/link";
import "./header.css";

export default function Header() {
    return (
        <header className="site-header">
            <div className="header-inner">
                <div className="logo">RiskScope</div>

                <nav className="header-nav">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/login" className="login-btn">
                        Login
                    </Link>
                </nav>
            </div>
        </header>
    );
}