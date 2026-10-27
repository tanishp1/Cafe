import { cafe } from "../data/Config";
import { whatsappUrl } from "../lib/WhatsApp";
import OpenStatus from "./OpenStatus";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">☕ Koregaon Park, Pune</div>
          <OpenStatus className="status-light" />
          <h1>
            Slow chai.<br />
            <em>Fast friends.</em>
          </h1>
          <p className="lead">{cafe.description}</p>
          <div className="hero-actions">
            <a className="btn btn-saffron" href="#menu">
              See the menu →
            </a>
            <a
              className="btn btn-ghost"
              href={whatsappUrl(`Hi ${cafe.name}! I have a question.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="hero-art">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop"
            alt="A steaming cup of cardamom chai surrounded by cardamom pods"
            width="600"
            height="600"
          />
          <div className="hero-art-badge">
            <span style={{ fontSize: "1.6rem" }}>🌿</span>
            <div>
              <strong>Hand-pulled chai</strong>
              <br />
              <span>Fresh every morning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
