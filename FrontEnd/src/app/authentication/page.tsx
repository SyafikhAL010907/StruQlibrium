// ========================ini code folder app/authentication/page.tsx (Unified Fix)======
"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Terminal, 
  ArrowLeft,
  GraduationCap,
  Building2,
  Mail
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnifiedAuthentication() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Real-time Admin Detection
  useEffect(() => {
    if (email.toLowerCase().includes("admindev")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [email]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "Syafikh@gmail.com" && password === "123456") {
      router.push("/dashboard");
    } else if (email === "AdminDev@gmail.com" && password === "AdminDev1") {
      router.push("/dashboard");
    } else {
      alert("Email atau Password salah!");
    }
  };

  return (
    <div className="fixed! inset-0! z-50! flex! items-center! justify-center! bg-white! dark:bg-slate-950! overflow-hidden!">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10! dark:opacity-20!">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500! blur-[120px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500! blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg px-4"
      >
        <Card className={`overflow-hidden! border-2! transition-all duration-500 rounded-[2.5rem]! bg-white! dark:bg-slate-950! ${isAdmin ? 'border-red-500/40! shadow-2xl! shadow-red-500/20!' : 'border-slate-200! dark:border-white/10! shadow-2xl! shadow-violet-500/10!'}`}>
          
          {/* Internal Header & Back Button */}
          <div className="p-8 md:p-10 pb-4!">
            <Link href="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400! hover:text-violet-600! transition-colors mb-8">
              <ArrowLeft className="mr-2 w-3.5 h-3.5" /> BACK TO HOME
            </Link>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-outfit text-3xl md:text-4xl font-black tracking-tighter uppercase text-slate-900! dark:text-white!">
                  {isLogin ? "MISSION" : "JOIN"} <span className={isAdmin ? 'text-red-500!' : 'gradient-text'}>{isLogin ? "LOGIN" : "PORTAL"}</span>
                </h1>
                <p className="text-xs font-bold text-slate-500! mt-1 uppercase tracking-widest">
                  {isAdmin ? "ADMINISTRATOR ACCESS ENABLED" : "READY FOR YOUR NEXT MISSION?"}
                </p>
              </div>
              <div className={`p-4 rounded-2xl transition-all duration-500 ${isAdmin ? 'bg-red-500/10! text-red-500!' : 'bg-violet-600/10! text-violet-600!'}`}>
                {isAdmin ? <Terminal className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5!">
               <AnimatePresence mode="wait">
                 {isLogin ? (
                   <motion.div 
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-5"
                   >
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400! group-focus-within:text-violet-600! transition-colors" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2! border-slate-200! dark:border-white/10! bg-slate-50/50! dark:bg-white/5! text-slate-900! dark:text-white! focus:outline-hidden focus:ring-2! focus:ring-violet-500! transition-all font-bold"
                        />
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400! group-focus-within:text-violet-600! transition-colors" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2! border-slate-200! dark:border-white/10! bg-slate-50/50! dark:bg-white/5! text-slate-900! dark:text-white! focus:outline-hidden focus:ring-2! focus:ring-violet-500! transition-all font-bold"
                        />
                        <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-violet-600! uppercase tracking-tighter">Lupa?</button>
                      </div>
                   </motion.div>
                 ) : (
                   <motion.div 
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-2 gap-4"
                   >
                      <input placeholder="Nama Lengkap" className="col-span-2 w-full p-4 rounded-2xl border-2! border-slate-200! dark:border-white/10! bg-slate-50/50! dark:bg-white/5! font-bold" />
                      <input placeholder="Username" className="w-full p-4 rounded-2xl border-2! border-slate-200! dark:border-white/10! bg-slate-50/50! dark:bg-white/5! font-bold" />
                      <input placeholder="Nama Sekolah" className="w-full p-4 rounded-2xl border-2! border-slate-200! dark:border-white/10! bg-slate-50/50! dark:bg-white/5! font-bold" />
                      <input placeholder="Email" className="col-span-2 w-full p-4 rounded-2xl border-2! border-slate-200! dark:border-white/10! bg-slate-50/50! dark:bg-white/5! font-bold" />
                      <input type="password" placeholder="Password" className="w-full p-4 rounded-2xl border-2! border-slate-200! dark:border-white/10! bg-slate-50/50! dark:bg-white/5! font-bold" />
                      <input type="password" placeholder="Konfirmasi" className="w-full p-4 rounded-2xl border-2! border-slate-200! dark:border-white/10! bg-slate-50/50! dark:bg-white/5! font-bold" />
                   </motion.div>
                 )}
               </AnimatePresence>

               <Button 
                type="submit"
                className={`w-full py-7 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-xs tracking-[0.2em] transition-all duration-500 text-white! ${isAdmin ? 'bg-red-600! hover:bg-red-700! shadow-xl shadow-red-500/20' : 'bg-linear-to-r! from-violet-600! to-blue-600! hover:scale-[1.02] shadow-xl shadow-violet-500/20'}`}
               >
                 {isLogin ? "INITIALIZE LOGIN" : "CREATE ACCOUNT"} <ArrowRight className="w-5 h-5" />
               </Button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400! hover:text-violet-600! transition-colors"
              >
                {isLogin ? "NEED AN ACCOUNT? SIGN UP" : "ALREADY HAVE AN ACCOUNT? LOGIN"}
              </button>
            </div>
          </div>

          {/* Internal Footer Block */}
          <div className="mt-4! border-t border-slate-100! dark:border-white/5! bg-slate-50/50! dark:bg-white/2! p-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${isAdmin ? 'bg-red-500!' : 'bg-green-500!'}`} />
              <span className="text-[10px] font-black text-slate-400! uppercase tracking-[0.2em]">System Status: Online</span>
            </div>
            <span className="text-[10px] font-black text-slate-400! uppercase tracking-[0.2em]">AUTHENTICATION SYSTEM v3.0</span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
// ==========================ini code app/authentication/page.tsx selesai ==============
