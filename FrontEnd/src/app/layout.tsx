import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GameProvider } from "@/components/GameProvider";
import { CoinDisplay } from "@/components/game/CoinDisplay";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import Link from "next/link";
import { Construction } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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
            <header className="sticky top-0 z-40 w-full glass border-b border-slate-200 dark:border-white/10">
              <div className="container mx-auto px-4 h-auto min-h-20 py-4 md:py-0 md:h-20 flex flex-col md:flex-row items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-2 group self-start md:self-auto">
                  <div className="bg-linear-to-br from-violet-600 to-blue-600 p-2 rounded-xl shadow-lg group-hover:rotate-6 transition-transform">
                    <Construction className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center font-outfit font-black tracking-tighter uppercase leading-none">
                      <span className="text-slate-950! dark:text-white! text-xl md:text-2xl opacity-100!">STRU</span>
                      <span className="logo-q text-3xl md:text-4xl mx-px">Q</span>
                      <span className="text-slate-950! dark:text-white! text-xl md:text-2xl opacity-100!">LIBRIUM</span>
                    </div>
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] ml-0.5 text-slate-500 dark:text-slate-400">PKM-RSH Project</span>
                  </div>
                </Link>

                <nav className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-between md:justify-end">
                  <CoinDisplay />
                  <ThemeToggle />
                </nav>
              </div>
            </header>

            <main className="grow">
              {children}
            </main>

            <footer className="glass border-t border-slate-200 dark:border-white/10 p-10 mt-20">
              <div className="container mx-auto text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  © 2026 PKM-RSH Project - <span className="inline-flex items-center font-outfit font-black tracking-tighter uppercase ml-1">
                    <span className="text-slate-950! dark:text-white! text-[10px] opacity-100!">STRU</span>
                    <span className="logo-q text-sm mx-px">Q</span>
                    <span className="text-slate-950! dark:text-white! text-[10px] opacity-100!">LIBRIUM</span>
                  </span> Team
                </p>
              </div>
            </footer>
          </GameProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
