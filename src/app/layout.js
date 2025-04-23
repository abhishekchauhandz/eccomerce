import { Poppins } from "next/font/google";
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import CartSidebar from "./_components/CartSidebar";
import { BuyNowProvider } from "./context/BuyNowContext";
import { AuthProvider } from "./context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <AuthProvider>
          <BuyNowProvider>
            <CartProvider>
              <WishlistProvider>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  {children}
                  <CartSidebar />
                  <Footer />
                </div>
              </WishlistProvider>
            </CartProvider>
          </BuyNowProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
