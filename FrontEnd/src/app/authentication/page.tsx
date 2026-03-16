// ========================ini code app/authentication/page.tsx (V4.4)======
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
  ArrowLeft,
  Mail,
  Sparkles,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnifiedAuthentication() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Strict Admin Detection (Case-Sensitive)
  useEffect(() => {
    if (email === "AdminDev@gmail.com") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (email === "Syafikh@gmail.com" && password === "123456") {
        router.push("/dashboard");
      } else if (email === "AdminDev@gmail.com" && password === "AdminDev1") {
        router.push("/dashboard");
      } else {
        alert("Email atau Password salah!");
      }
    } else {
      // Signup logic placeholder
      console.log("Signing up...", { fullName, username, schoolName, email, password });
      setIsLogin(true);
    }
  };

  // Dynamic Styles based on Admin State
  // V4.7: Logic Aura Dual-Mode (Putih untuk User, Merah untuk Admin)
  // V4.8: Logic Aura Tipis & Elegan ( Compact Red Aura )
  const inputStyles = isAdmin
    ? "border-red-500/50! shadow-[0_0_10px_rgba(239,68,68,0.2)]! focus:shadow-[0_0_15px_rgba(239,68,68,0.4)]! text-red-500! transition-all! duration-300!"
    : "border-slate-100! dark:border-white/5! shadow-[0_0_15px_rgba(255,255,255,0.07)]! focus:border-violet-500! text-slate-900! dark:text-white! transition-all! duration-300!";
  const iconColor = isAdmin ? "text-red-500! transition-colors! duration-300!" : "text-slate-400 group-focus-within:text-violet-500! transition-colors! duration-300!";
  const lupaPasswordColor = isAdmin ? "text-red-500!" : "text-violet-600!";
  const toggleLinkColor = isAdmin ? "text-red-500!" : "text-blue-500!";

  return (
    <div className="fixed! inset-0! z-50! flex! items-center! justify-center! bg-slate-50! dark:bg-slate-950! overflow-y-auto! py-10! px-4!">
      {/* Static Neutral Background Glow (Subtle Branding) */}
      <div className="fixed! inset-0! z-0! bg-slate-50! dark:bg-slate-950!" />
      <div className="absolute! inset-0! bg-linear-to-br! from-violet-600/10! to-blue-600/10! blur-[120px]! z-0!" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative! z-10! w-full! max-w-[440px]!"
      >
        <Card className={`premium-card! overflow-hidden! border-2! transition-all! duration-500! shadow-2xl! rounded-[2.5rem]! ${isAdmin ? 'border-red-500/40! shadow-red-500/20!' : 'border-slate-200! dark:border-white/10! shadow-violet-500/10!'}`}>

          <div className="p-8! pb-6!">
            {/* Back Button (Top Left) */}
            <div className="absolute! top-8! left-8!">
              <Link href="/" className="inline-flex! items-center! text-[10px]! font-black! uppercase! tracking-widest! text-slate-400! hover:text-slate-900! dark:hover:text-white! transition-colors!">
                <ArrowLeft className="mr-2! w-3.5! h-3.5!" /> BACK TO HOME
              </Link>
            </div>

            {/* Header Section (Centralized) */}
            <div className="flex! flex-col! items-center! text-center! mb-8! mt-6!">
              <motion.div
                animate={{ rotate: isAdmin ? [0, -10, 10, 0] : 0 }}
                transition={{ duration: 0.5 }}
                className={`p-5! rounded-2xl! mb-6! transition-all! duration-500! ${isAdmin ? 'bg-red-500/10! text-red-500!' : 'bg-violet-600/10! text-violet-600!'}`}
              >
                {isAdmin ? <ShieldCheck className="w-10! h-10!" /> : <Sparkles className="w-10! h-10!" />}
              </motion.div>

              <h1 className="font-outfit! text-3xl! md:text-3xl! font-black! tracking-tighter! uppercase! text-black! dark:text-white!">
                {isLogin ? "AUTHENTICATION" : <>Auth <span className="text-violet-600!">entication</span></>}
              </h1>
              <p className="text-[11px]! font-medium! text-slate-500! mt-2! tracking-[0.2em]! uppercase!">
                Log in to initiate your mission
              </p>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-5!">
              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    key="login-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4!"
                  >
                    {/* Email Input */}
                    <div className="relative! group!">
                      <Mail className={`absolute! left-4! top-1/2! -translate-y-1/2! w-5! h-5! transition-colors! ${iconColor}`} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className={`w-full! pl-12! pr-4! py-3.5! border-2! bg-slate-50! dark:bg-white/5! rounded-2xl! font-bold! outline-none! transition-all! ${inputStyles}`}
                      />
                    </div>

                    {/* Password Section */}
                    <div className="space-y-0!">
                      {/* Lupa Password Link (Positioned Above Password Input) */}
                      <div className="flex! justify-end!">
                        <button
                          type="button"
                          className={`text-right! text-[10px]! font-black! uppercase! tracking-tighter! mb-2! transition-colors! hover:opacity-80! ${lupaPasswordColor}`}
                        >
                          LUPA PASSWORD?
                        </button>
                      </div>

                      {/* Password Input */}
                      <div className="relative! group!">
                        <Lock className={`absolute! left-4! top-1/2! -translate-y-1/2! w-5! h-5! transition-colors! ${iconColor}`} />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          required
                          className={`w-full! pl-12! pr-12! py-3.5! border-2! bg-slate-50! dark:bg-white/5! rounded-2xl! font-bold! outline-none! transition-all! ${inputStyles}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute! right-4! top-1/2! -translate-y-1/2! transition-colors! hover:opacity-80! ${iconColor}`}
                        >
                          {showPassword ? <EyeOff className="w-5! h-5!" /> : <Eye className="w-5! h-5!" />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid! grid-cols-2! gap-3!"
                  >
                    <div className="relative! group!">
                      <User className={`absolute! left-4! top-1/2! -translate-y-1/2! w-4.5! h-4.5! transition-colors! ${iconColor}`} />
                      <input
                        placeholder="Nama Lengkap"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full! pl-11! pr-4! py-3.5! border-2! bg-slate-50! dark:bg-white/5! rounded-2xl! font-bold! text-sm! outline-none! transition-all! ${inputStyles}`}
                      />
                    </div>
                    <div className="relative! group!">
                      <User className={`absolute! left-4! top-1/2! -translate-y-1/2! w-4.5! h-4.5! transition-colors! ${iconColor}`} />
                      <input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`w-full! pl-11! pr-4! py-3.5! border-2! bg-slate-50! dark:bg-white/5! rounded-2xl! font-bold! text-sm! outline-none! transition-all! ${inputStyles}`}
                      />
                    </div>

                    <div className="col-span-2! relative! group!">
                      <div className={`absolute! left-4! top-1/2! -translate-y-1/2! w-4.5! h-4.5! flex! items-center! justify-center! ${isAdmin ? 'text-red-500!' : ''}`}>🏛️</div>
                      <input
                        placeholder="Nama Sekolah"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        className={`w-full! pl-11! pr-4! py-3.5! border-2! bg-slate-50! dark:bg-white/5! rounded-2xl! font-bold! text-sm! outline-none! transition-all! ${inputStyles}`}
                      />
                    </div>

                    <div className="col-span-2! relative! group!">
                      <Mail className={`absolute! left-4! top-1/2! -translate-y-1/2! w-4.5! h-4.5! transition-colors! ${iconColor}`} />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full! pl-11! pr-4! py-3.5! border-2! bg-slate-50! dark:bg-white/5! rounded-2xl! font-bold! text-sm! outline-none! transition-all! ${inputStyles}`}
                      />
                    </div>

                    <div className="relative! group!">
                      <Lock className={`absolute! left-4! top-1/2! -translate-y-1/2! w-4.5! h-4.5! transition-colors! ${iconColor}`} />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full! pl-11! pr-4! py-3.5! border-2! bg-slate-50! dark:bg-white/5! rounded-2xl! font-bold! text-sm! outline-none! transition-all! ${inputStyles}`}
                      />
                    </div>
                    <div className="relative! group!">
                      <Lock className={`absolute! left-4! top-1/2! -translate-y-1/2! w-4.5! h-4.5! transition-colors! ${iconColor}`} />
                      <input
                        type="password"
                        placeholder="Konfirmasi"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full! pl-11! pr-4! py-3.5! border-2! bg-slate-50! dark:bg-white/5! rounded-2xl! font-bold! text-sm! outline-none! transition-all! ${inputStyles}`}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Primary Action Button */}
              <Button
                type="submit"
                className="w-full! py-5! rounded-2xl! flex! items-center! justify-center! gap-3! font-black! uppercase! text-xs! tracking-[0.2em]! bg-linear-to-r! from-violet-600! to-blue-600! hover:scale-[1.02]! text-white! shadow-lg! shadow-violet-500/30! transition-all! duration-500! group/btn"
              >
                {isLogin ? "INITIALIZE ACCESS" : "GENERATE IDENTITY"}
                <ArrowRight className="w-5! h-5! group-hover/btn:translate-x-1! transition-transform!" />
              </Button>
            </form>

            {/* Toggle Mode Navigation (V4.9 - Separated Link) */}
            <div className="mt-8! text-center! flex! items-center! justify-center! gap-2!">
              {/* Teks Pertanyaan (Gak bisa diklik, gak ada hover) */}
              <span className="text-[10px]! font-black! uppercase! tracking-widest! text-slate-500! pointer-events-none!">
                {isLogin ? "Need an account?" : "ALREADY ENROLLED?"}
              </span>

              {/* Teks Aksi (Cuma ini yang Link & Ada Hover) */}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className={`${toggleLinkColor} text-[10px]! font-black! uppercase! tracking-widest! underline! hover:text-blue-400! transition-all! duration-300! cursor-pointer!`}
              >
                {isLogin ? "Create Account" : "Next The Login"}
              </button>
            </div>
          </div>

          {/* Premium Footer */}
          <div className="border-t! border-slate-100! dark:border-white/5! bg-slate-50/50! dark:bg-white/2! p-6! flex! items-center! justify-between! rounded-b-[2.5rem]!">
            <div className="flex! items-center! gap-3!">
              <div className={`w-2.5! h-2.5! rounded-full! animate-pulse! ${isAdmin ? 'bg-red-500! shadow-[0_0_10px_rgba(239,68,68,0.5)]!' : 'bg-green-500! shadow-[0_0_10_px_rgba(34,197,94,0.5)]!'}`} />
              <span className="text-[9px]! font-black! text-slate-400! uppercase! tracking-[0.3em]!">AUTHENTICATION SYSTEM V4.4</span>
            </div>
            <div className="flex! items-center! gap-4!">
              <span className="text-[9px]! font-black! text-slate-400! uppercase! tracking-widest!">SECURE</span>
              <div className="w-px! h-3! bg-slate-200! dark:bg-white/10!" />
              <span className="text-[9px]! font-black! text-slate-400! uppercase! tracking-widest!">ENCRYPTED</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
// ========================ini code app/authentication/page.tsx (V4.4)======


