import { cafe } from "../data/Config";

export default function Location() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(cafe.mapQuery)}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cafe.mapQuery)}`;

  return (
    <section className="section location" id="find-us">
      <div className="wrap location-grid">
        <div className="location-info">
          <p className="section-label">Visit us</p>
          <h2>Find us</h2>
          <address>
            {cafe.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <p>
            <a href={`tel:${cafe.phoneDisplay.replace(/\s/g, "")}`}>
              {cafe.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${cafe.email}`}>{cafe.email}</a>
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-pine"
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
            <a
              className="btn btn-outline"
              href={`tel:${cafe.phoneDisplay.replace(/\s/g, "")}`}
            >
              Call us
            </a>
          </div>
        </div>
        <div className="map">
          <iframe
            title={`Map showing ${cafe.name}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
