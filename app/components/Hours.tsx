"use client"
import { useEffect, useState } from "react";
import { cafe } from "../data/Config";
import OpenStatus from "./OpenStatus";
import { getNow } from "../lib/Hours";

function format12(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
}

export default function Hours(){
    const [today, setToday] = useState<string | null>(null);

    useEffect(()=>{
        setToday(getNow(cafe.timezone).day)
    },[]);

    return(
        <section className="section hours" id="hours">
            <div className="wrap hours-grid">
                <div>
                    <h2>Opening hours</h2>
                    <p className="section-sub">Walk-ins are always welcome. Order ahead to skip the wait.</p>
                    <OpenStatus className="status-dark"/>
                </div>
                <ul className="hours-list">
                    {cafe.hours.map((h)=>(
                        <li key={String(h.day)} className={h.day === today ? "today" : ""}>
                            <span>{h.day}</span>
                            <span>{h.closed ? "Closed" : `${format12(String(h.open))} to ${format12(String(h.close))}`}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
