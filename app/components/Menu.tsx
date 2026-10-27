"use client"

import { useState } from "react";
import { categories, menuItems, MenuItem } from "../data/Menu";
import { formatPrice } from "../lib/WhatsApp";
import { useCart } from "./CartProvider";

function MenuCard({ item } : {item: MenuItem}){
   const { items, add, remove  } =  useCart();
   const qty = items[item.id] || 0;

   return (
    <article className="card">
        <div className="card-img">
            <img src={item.image} alt={item.name} width={400} height={300} loading="lazy" />
            {item.tag && <span className="card-tag">{item.tag}</span>}
        </div>
        <div className="card-body">
            <div className="card-title">
                <span className={`diet ${item.veg ? "diet-veg" : "diet-nonveg"}`}
                role="img"  aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
                />
                <h3>{item.name}</h3>
            </div>
            <p className="card-desc">{item.desc}</p>
            <div className="card-foot">
                <span className="price">{formatPrice(item.price)}</span>
                {qty === 0 ? (
                    <button type="button" className="btn btn-sm btn-pine" onClick={() => add(item.id)}>
                        Add
                    </button>
                ): (
                    <div className="stepper" role="group" aria-label={`${item.name}, quantity`}>
                        <button type="button" onClick={() => remove(item.id)} aria-label={`Remove one ${item.name}`}>
                            -
                        </button>
                        <span aria-live="polite">{qty}</span>
                        <button type="button" onClick={() => add(item.id)} aria-label={`Add one ${item.name}`}>
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>
    </article>
   )
}

export default function Menu(){
    const [active, setActive] = useState("all");
    const visible = categories.filter((c) => active === "all" || c.id === active);

    return (
        <section className="section" id="menu">
            <div className="wrap">
                <p className="section-label">What we serve</p>
                <h2>Our Menu</h2>
                <p className="section-sub">Tap to build your order, then send it to us on WhatsApp — skip the queue.</p>
                <div className="tabs" role="group" aria-label="Menu categories">
                    {[{ id: "all", name: "All"}, ...categories].map((c)=> (
                        <button key={c.id} type="button" className="tab" aria-pressed={active === c.id}
                        onClick={()=> setActive(c.id)}
                        >
                        {c.name}
                    </button>
                    ))}
                </div>
                {visible.map((cat) => (
          <div key={cat.id} className="menu-group">
            <h3 className="group-title">{cat.name}</h3>
            <div className="grid">
              {menuItems
                .filter((i) => i.category === cat.id)
                .map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
            </div>
          </div>
        ))}

            </div>
        </section>
    )
}