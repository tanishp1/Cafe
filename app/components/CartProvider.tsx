"use client"
import { act, createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { CartLine } from "../lib/WhatsApp";
import { menuItems } from "../data/Menu";

type Items = Record<string, number>;

type Action = { type: "hydrate"; items: Items }| { type: "add"; id: string } | { type: "remove"; id: string } | 
{ type: "clear" };

type CartContextValue = {
    items : Items;
    lines: CartLine[];
    total: number;
    count: number;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    add: (id: string)=> void;
    remove: (id: string) => void;
    clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "Cardamom-Cart-v1";

function reducer(state: Items, action: Action): Items {
    switch(action.type){
        case "hydrate":
            return action.items;
        case "add":
            return {...state,[action.id]:(state[action.id] || 0) + 1};
        case "remove":
            const qty = (state[action.id] || 0) - 1;
            const next = {...state};
            if(qty > 0) delete next[action.id];
            else next[action.id] = qty;
            return next;
        case "clear":
            return {};
            default:
                return state;
    }
}

export function CartProvider({ children } : {children: ReactNode}){
    const [items, dispatch] = useReducer(reducer, {} as Items);
    const [hydrated, setHydrated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if(saved)
            dispatch({ type: "hydrate", items: JSON.parse(saved)})
      } catch {}
        setHydrated(true)
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        } catch {}
    },[items, hydrated])

    const value = useMemo<CartContextValue>(() => {
        const lines: CartLine[] = [];
        for(const [id, qty] of Object.entries(items)){
            const item = menuItems.find((i) => i.id === id);
            if(item)lines.push({...item, qty});
        }

        const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0 );
        const count = lines.reduce((sum, l) => sum + l.qty, 0);

        return { items, lines, total, count, isOpen, setIsOpen, 
            add: (id) => dispatch({ type: "add", id}),
            remove: (id) => dispatch({ type: "remove", id}),
            clear: () => dispatch({ type: "clear"})
        }
    },[items, isOpen]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
    
}

export function useCart (){
    const ctx = useContext(CartContext);
    if(!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}
