import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import FloatingCartBar from "@/components/FloatingCartBar";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wholeseller India — Smart Gadgets at Wholesale Price",
  description:
    "सबसे सस्ते Smart Watches, Airpods, Earbuds, Keypad mobile & Smart Gadgets. Shop from Wholeseller India, Karol Bagh, Delhi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} bg-[#f5f5f5] min-h-screen`} suppressHydrationWarning>
        {children}
        <FloatingCartBar />
        {/* Bottom padding so content isn't hidden behind floating bar */}
        <div className="h-20" />
      </body>
    </html>
  );
}
