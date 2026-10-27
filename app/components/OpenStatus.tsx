"use client"

import { useEffect, useState } from "react";
import { getOpenStatus, OpenStatusResult } from "../lib/Hours";
import { cafe } from "../data/Config";

export default function OpenStatus({ className = ""}: { className?: string}){
    const [status, setStatus] = useState<OpenStatusResult | null>(null);

    useEffect(()=> {
        const update = () => setStatus(getOpenStatus(cafe.hours, cafe.timezone));
        update();
        const id = setInterval(update, 6000);
        return () => clearInterval(id);
    },[]);

    return (
        <span className={`status ${className}`} role="status" suppressHydrationWarning>
            {status && <span className={`dot ${status.isOpen ? "dot-open" : "dot-closed"}`} aria-hidden="true"/>}
            {status ? status.label : ""}
        </span>
    )
}
