import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GameProvider } from "@/components/GameProvider";
import { CoinDisplay } from "@/components/game/CoinDisplay";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "StruQlibrium",
  description: "Platform pembelajaran gamifikasi untuk siswa SMK Konstruksi.",
  icons: {
    icon: "/images/LogoStruQlibrium.png",
    shortcut: "/images/LogoStruQlibrium.png",
    apple: "/images/LogoStruQlibrium.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GameProvider>
            <Navbar />

            <main className="grow min-h-screen">
              {children}
            </main>

            <Footer />
          </GameProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
