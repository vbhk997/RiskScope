"use client";

import { useState } from "react";
import Link from "next/link";
import "./login.css";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Header from "../../components/header/header";

export default function LoginPage() {
    const [mode, setMode] = useState("login");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            if (mode === "signup") {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Account created!");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Login successful!");
            }

            window.location.replace("/dashboard");

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="login-container">
                <div className="login-card">

                    <div className="tabs">
                        <button
                            className={mode === "login" ? "active-tab" : ""}
                            onClick={() => setMode("login")}
                        >
                            Login
                        </button>
                        <button
                            className={mode === "signup" ? "active-tab" : ""}
                            onClick={() => setMode("signup")}
                        >
                            Sign Up
                        </button>
                    </div>

                    <h2>{mode === "login" ? "Welcome Back" : "Create Account"}</h2>

                    <form className="form">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        {mode === "signup" && (
                            <>
                                {/* <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />

                            <input
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            /> */}

                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </>
                        )}

                        <button type="button" className="submit-btn" onClick={handleSubmit}>
                            {mode === "login" ? "Login" : "Sign Up"}
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
}