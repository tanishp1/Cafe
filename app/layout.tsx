import { Metadata, Viewport } from "next";
import { cafe } from "./data/Config";
import { CartProvider } from "./components/CartProvider";
import Header from "./components/Header";
import CartBar, { CartDrawer } from "./components/Cart";
import "./globals.css";
import Footer from "./components/Footer";


const display = { variable: "" };
const body = { variable: "" };

export const metadata: Metadata = {
  title: `${cafe.name} | Cafe in Koregaon Park, Pune`,
  description: cafe.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#17403A",
};

export default function RootLayout({ children } : { children: React.ReactNode}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <Header/>
          <main>{children}</main>
          <Footer/>
          <CartBar/>
          <CartDrawer/>
        </CartProvider>
      </body>
    </html>
  )
}