"use client"

import { cafe } from "../data/Config";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand">
            <span className="footer-brand-icon">☕</span>
            {cafe.name}
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
            {cafe.address.join(", ")}
          </p>
          <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
            <a href={`tel:${cafe.phoneDisplay.replace(/\s/g, "")}`}>{cafe.phoneDisplay}</a>
            {" · "}
            <a href={`mailto:${cafe.email}`}>{cafe.email}</a>
          </p>
        </div>
        <div className="footer-links">
          <p style={{ color: "#fff", fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Quick links
          </p>
          <a href="#menu">Menu</a>
          <a href="#hours">Opening hours</a>
          <a href="#find-us">Find us</a>
        </div>
        <div className="footer-links">
          <p style={{ color: "#fff", fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Follow us
          </p>
          <a href={cafe.instagram} target="_blank" rel="noopener noreferrer">
            Instagram {cafe.instagramHandle}
          </a>
        </div>
      </div>
      <div className="wrap footer-copy">
        <small>&copy; {year} {cafe.name}. All rights reserved.</small>
      </div>
    </footer>
  );
}
