"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import "./dbheader.css";

export default function dashboardheader() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut(auth);
        router.replace("/");
    };

    return (
        <div className="toolbar">
            <h2 className="logo">RiskScope</h2>
            <div className="navigation">
                <Link href="/dashboard" className={pathname === "/dashboard" ? "active-link" : ""}>Dashboard</Link>
                <Link href="/portfolio" className={pathname === "/portfolio" ? "active-link" : ""}>Edit Portfolio</Link>
                {/* <Link href="/settings" className={pathname === "/settings" ? "active-link" : ""}>Settings</Link> */}
            </div>
            <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
    );
}