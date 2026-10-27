import { Metadata, Viewport } from "next";
import { cafe } from "./data/Config";
import { CartProvider } from "./components/CartProvider";
import Header from "./components/Header";
import CartBar, { CartDrawer } from "./components/Cart";
import "./globals.css";
import Footer from "./components/Footer";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
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