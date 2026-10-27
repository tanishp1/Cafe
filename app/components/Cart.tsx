"use client";

import { FormEvent, useEffect, useState } from "react";
import { cafe } from "../data/Config";
import { buildOrderMessage, formatPrice, whatsappUrl } from "../lib/WhatsApp";
import { useCart } from "./CartProvider";

const WhatsAppIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.04 2a9.93 9.93 0 0 0-8.5 15.1L2 22l5.05-1.5A9.94 9.94 0 1 0 12.04 2Zm5.8 14.1c-.25.7-1.42 1.34-1.95 1.4-.5.05-1.12.07-1.8-.11a14 14 0 0 1-1.63-.6c-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.17-1.56-1.17-2.97s.74-2.1 1-2.39c.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.25.58.84 2.01.91 2.16.07.14.12.31.02.5-.1.2-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.12.58.17.29.74 1.22 1.6 1.98 1.1.98 2.03 1.28 2.32 1.43.29.14.46.12.63-.07.17-.2.72-.84.91-1.13.2-.29.38-.24.65-.14.26.1 1.67.79 1.96.93.29.14.48.22.55.34.07.12.07.7-.18 1.4Z" />
  </svg>
);

export default function CartBar() {
  const { count, total, setIsOpen, isOpen } = useCart();

  if (isOpen) return null;

  if (count === 0) {
    return (
      <a
        className="wa-float"
        href={whatsappUrl(`Hi ${cafe.name}! I have a question.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    );
  }

  return (
    <button type="button" className="cart-bar" onClick={() => setIsOpen(true)}>
      <span>
        View order ({count} {count === 1 ? "item" : "items"})
      </span>
      <strong>{formatPrice(total)}</strong>
    </button>
  );
}

export function CartDrawer() {
  const { lines, total, count, isOpen, setIsOpen, add, remove, clear } =
    useCart();
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(()=> {
     if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  },[isOpen, setIsOpen])

  if (!isOpen) return null;

  const needsAddress = mode === "delivery" && address.trim() === "";
  const canSend = count > 0 && name.trim() !== "" && !needsAddress;

  function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSend) return;
    const text = buildOrderMessage({ lines, total, name, mode, address, note });
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <div className="drawer-root">
      <div className="drawer-backdrop" onClick={() => setIsOpen(false)} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="order-title">
        <div className="drawer-head">
          <h2 id="order-title">Your order</h2>
          <button type="button" className="icon-btn" onClick={() => setIsOpen(false)} aria-label="Close order">
            ✕
          </button>
        </div>

        {count === 0 ? (
          <div className="drawer-empty">
            <p>Your order is empty. Pick something from the menu to get started.</p>
            <button type="button" className="btn btn-pine" onClick={() => setIsOpen(false)}>
              Browse the menu
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="drawer-form">
            <ul className="lines">
              {lines.map((l) => (
                <li key={l.id}>
                  <div>
                    <p className="line-name">{l.name}</p>
                    <p className="line-price">{formatPrice(l.price)} each</p>
                  </div>
                  <div className="stepper" role="group" aria-label={`${l.name} quantity`}>
                    <button type="button" onClick={() => remove(l.id)} aria-label={`Remove one ${l.name}`}>
                      −
                    </button>
                    <span>{l.qty}</span>
                    <button type="button" onClick={() => add(l.id)} aria-label={`Add one ${l.name}`}>
                      +
                    </button>
                  </div>
                  <strong className="line-total">{formatPrice(l.price * l.qty)}</strong>
                </li>
              ))}
            </ul>

            <div className="total-row">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <label className="field">
              <span>Your name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Aditi" required />
            </label>

            <fieldset className="field">
              <legend>How would you like it?</legend>
              <div className="segmented">
                <label className={mode === "pickup" ? "on" : ""}>
                  <input type="radio" name="mode" checked={mode === "pickup"} onChange={() => setMode("pickup")} />
                  Pickup
                </label>
                <label className={mode === "delivery" ? "on" : ""}>
                  <input type="radio" name="mode" checked={mode === "delivery"} onChange={() => setMode("delivery")} />
                  Delivery
                </label>
              </div>
            </fieldset>

            {mode === "delivery" && (
              <label className="field">
                <span>Delivery address</span>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat, building, street, landmark"
                  required
                />
              </label>
            )}

            <label className="field">
              <span>Note for the kitchen (optional)</span>
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Less sugar, extra spicy..." />
            </label>

            <button type="submit" className="btn btn-whatsapp" disabled={!canSend}>
              <WhatsAppIcon /> Send order on WhatsApp
            </button>
            {!canSend && (
              <p className="hint">
                {name.trim() === "" ? "Add your name to continue." : "Add your delivery address to continue."}
              </p>
            )}
            {sent && (
              <p className="sent" role="status">
                WhatsApp opened in a new tab. Press send there to confirm your order.
              </p>
            )}
            <button type="button" className="link-btn" onClick={clear}>
              Clear order
            </button>
          </form>
        )}
      </aside>
    </div>
  );
}

