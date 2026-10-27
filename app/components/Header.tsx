"use client"

import { cafe } from "../data/Config";
import { useCart } from "./CartProvider";

export default function Header(){
    const {count, setIsOpen} = useCart();

    return (
        <header className="site-header">
            <div className="wrap bar">
                <a href="#top" className="brand">
                    {cafe.name}
                </a>
                <nav aria-label="Main" className="nav">
                    <a href="#menu">Menu</a>
                    <a href="#hours">Hours</a>
                    <a href="#find-us">Find us</a>
                </nav>
                <button type="button" className="cart-btn" onClick={() => setIsOpen(true)}
                    aria-label={`Open your order ${count} items`}
                    >
                    Your Order <span className="badge">{count}</span>
                </button>
            </div>
        </header>
    )
}
