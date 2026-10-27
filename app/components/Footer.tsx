"use client"

import { cafe } from "../data/Config";

const year = new Date().getFullYear();


export default function Footer() {
    return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand">{cafe.name}</p>
          <p>{cafe.address.join(", ")}</p>
        </div>
        <div>
          <p>
            <a href={cafe.instagram} target="_blank" rel="noopener noreferrer">
              Instagram {cafe.instagramHandle}
            </a>
          </p>
          <p>{cafe.phoneDisplay}</p>
        </div>
      </div>
      <div className="wrap footer-copy">
        <small>&copy; {year} {cafe.name} All rights reserved.</small>
      </div>
    </footer>
  );

}