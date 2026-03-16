// ========================ini code app/storage/page.tsx======
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StorageRootHub() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirecting to the Materi Catalog as the primary Hub entrance
    router.replace("/storage/materi");
  }, [router]);

  return (
    <div className="fixed! inset-0! flex! items-center! justify-center! bg-white! dark:bg-slate-950!">
       <div className="flex! flex-col! items-center! gap-4!">
          <div className="w-12! h-12! border-4! border-violet-600! border-t-transparent! rounded-full! animate-spin!" />
          <p className="font-black! text-[10px]! text-slate-400! uppercase! tracking-[0.3em]!">Initializing Storage Hub...</p>
       </div>
    </div>
  );
}
// ==========================ini code app/storage/page.tsx selesai ==============
