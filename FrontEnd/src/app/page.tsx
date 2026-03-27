"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, BookOpen, Cpu, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/ui/Logo";

export default function LandingPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 min-h-[80vh] flex flex-col items-center justify-center py-12 md:py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="text-center max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="flex items-center gap-3 mb-3 pr-2 overflow-visible">
            <Image
              src="/images/LogoStruQlibrium.png"
              alt="StruQlibrium Logo"
              width={64}
              height={64}
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
            <Logo size="text-2xl md:text-3xl" />
          </div>
          <div className="inline-flex items-center gap-2 bg-violet-500/10 text-slate-600 dark:text-slate-400 px-4 py-2 rounded-full font-bold text-sm border border-violet-500/20">
            <span>PKM-RSH PROJECT 2026</span>
          </div>
        </motion.div>

        <h1 className="font-outfit text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-6 md:mb-8 leading-[0.9]">
          KUASAI STATIKA DENGAN <span className="gradient-text">GAYA BARU.</span>
        </h1>

        <p className="text-xl font-bold mb-12 max-w-2xl mx-auto leading-relaxed">
          Platform pembelajaran gamifikasi untuk siswa SMK Konstruksi.
          Pelajari mekanika teknik dengan pengalaman visual yang premium dan interaktif.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/authentication">
            <Button size="lg" className="w-full sm:w-auto">
              MULAI OPERASI <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/storage">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-300 dark:border-white/10 shadow-sm font-bold">
              <span className="text-slate-950 dark:text-white">PELAJARI MODUL</span>
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-16 md:mt-32 w-full max-w-4xl mx-auto px-4">
        {[
          {
            icon: <BookOpen />,
            title: "Knowledge Storage",
            desc: "Simpan dan pelajari materi statika dengan ringkas.",
            color: "from-violet-500 to-purple-600",
            href: "/storage" // Rute tujuan
          },
          {
            icon: <Trophy />,
            title: "Battlefield",
            desc: "Uji kemampuanmu di arena kuis dengan sistem koin.",
            color: "from-blue-500 to-cyan-600",
            href: "/battlefield" // Rute tujuan
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }} // Pake whileInView biar animasi jalan pas kelihatan
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -5 }} // Efek angkat dikit pas hover
            className="h-full"
          >
            <Link href={feature.href} className="block h-full group">
              <Card className="h-full cursor-pointer hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 border-white/5 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md p-6 sm:p-8">
                <div className={`bg-linear-to-br ${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-black/10 group-hover:rotate-12 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="font-outfit text-xl sm:text-2xl font-black mb-3 tracking-tight text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="font-bold leading-relaxed text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  {feature.desc}
                </p>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
