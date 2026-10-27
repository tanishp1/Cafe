import { cafe } from "../data/Config";
import { MenuItem } from "../data/Menu";

export type CartLine = MenuItem & {qty: number};

type OrderDetails = {
  lines: CartLine[];
  total: number;
  name: string;
  mode: "pickup" | "delivery";
  address: string;
  note: string;
};

export function formatPrice(amount: number){
    return `${cafe.currency} ${amount}`
}

export function whatsappUrl(text: string) {
  return `https://wa.me/${cafe.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function buildOrderMessage({ lines, total, name, mode, address, note }: OrderDetails) {
  const items = lines.map(
    (l) => `${l.qty} x ${l.name} (${formatPrice(l.price * l.qty)})`
  );

  const parts = [
    `Hi ${cafe.name}! I'd like to place an order.`,
    "",
    ...items,
    "",
    `Total: ${formatPrice(total)}`,
    `Name: ${name.trim()}`,
    `Order type: ${mode === "delivery" ? "Delivery" : "Pickup"}`,
  ];

  if (mode === "delivery" && address.trim()) parts.push(`Address: ${address.trim()}`);
  if (note.trim()) parts.push(`Note: ${note.trim()}`);

  return parts.join("\n");
}

