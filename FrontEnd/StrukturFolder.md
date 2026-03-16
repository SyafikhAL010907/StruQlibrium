# 🏗️ Arsitektur Proyek: StruQlibrium (PKM-RSH Edition)

Selamat datang di "jeroan" StruQlibrium. Sebagai instruksi dari Senior Fullstack Architect, dokumen ini dirancang agar siapa pun yang membaca—baik rekan tim maupun juri—bisa langsung paham hubungan antar komponen dan alur logisnya.

## 📂 Directory Tree & Penjelasan Substantif

Berikut adalah peta struktur folder kita. Fokusnya adalah **clean architecture** dan **modularitas**.

```plaintext
struqlibrium/
├── FrontEnd/
│   ├── src/
│   │   ├── app/                    <= [HEART] PUSAT KONTROL (App Router Next.js)
│   │   │   ├── (auth)/             <= Login/Register (Separasi logika autentikasi)
│   │   │   ├── battlefield/        <= [ARENA] Gamifikasi & Kuis interaktif
│   │   │   │   ├── game/           <= Mekanika kuis (pintu masuk ke QuizArena)
│   │   │   │   └── page.tsx        <= Lobby Battlefield (Selection Level)
│   │   │   ├── dashboard/          <= [MISSION CONTROL] Hub utama pengguna
│   │   │   ├── storage/            <= [KNOWLEDGE STORAGE] Library materi statika
│   │   │   │   ├── [id]/           <= Dynamic Route (Detail modul per topik)
│   │   │   │   └── page.tsx        <= Katalog Modul Statika
│   │   │   ├── globals.css         <= CSS Variables (Theme & Global Styles)
│   │   │   ├── layout.tsx          <= Boneka Utama (Navbar, Footer, Context Providers)
│   │   │   └── page.tsx            <= Landing Page (The "Wow" Entrance)
│   │   ├── components/             <= [BUILDING BLOCKS] UI Reusable
│   │   │   ├── ui/                 <= Basic UI (Button, Card, Modal, ThemeToggle)
│   │   │   ├── game/               <= Game Logic UI (CoinDisplay, QuizArena)
│   │   │   ├── GameProvider.tsx    <= State Management (Koin & Progres)
│   │   │   └── ThemeProvider.tsx   <= Theme Engine (Dark/Light Switcher)
│   │   ├── data/                   <= [CORE DATA] Static Database (Materials & Questions)
│   │   ├── hooks/                  <= Custom Logic (useGameState, dll)
│   │   └── types/                  <= TypeScript Definitions (Kontrak data)
│   ├── tailwind.config.ts          <= Desain Sistem (Palette warna & Glow effects)
│   └── next.config.ts              <= Konfigurasi Mesin Next.js
```

---

## 🌊 Alur Aplikasi (The User Journey)
*"Eksplorasi, Belajar, dan Bertarung"*

Sebuah sistem gamifikasi tidak akan jalan tanpa alur yang menarik. Begini cara user "hidup" di dalam StruQlibrium:

1.  **The Initiation (Landing Page)**:
    User disambut oleh visual premium yang memperkenalkan value proposisi: *Kuasai Statika dengan Gaya Baru*. User kemudian login/start untuk masuk ke Dashboard.
    
2.  **The Mission Control (Dashboard)**:
    Ini adalah "rumah" bagi user. Di sini tersaji ringkasan status: Berapa koin yang dimiliki? Apa level pencapaiannya? Dari sini, user punya dua pilihan jalur: *Belajar* atau *Uji Nyali*.

3.  **The Knowledge Path (Storage)**:
    Biasanya user akan ke sini dulu. Mereka memilih modul (misal: "Statika Dasar"). Di dalam detail modul, materi disajikan dengan visual yang bersih dan fokus. User bisa beralih ke *Dark Mode* jika ingin membaca lebih nyaman di malam hari.

4.  **The Battlefield (Testing Loop)**:
    Setelah merasa paham, user masuk ke Battlefield. Mereka memilih level kesulitan (Easy/Medium/Hard). Di sinilah gamifikasi terjadi:
    - Menjawab soal hitungan teknik yang presisi.
    - Menggunakan koin untuk *Hint* jika terjebak.
    - Mendapatkan reward (Koin/XP) jika berhasil mengeksekusi datax dengan benar.

5.  **The Feedback Loop (Retention)**:
    Setiap keberhasilan di Battlefield akan tercatat kembali di Dashboard. User merasa ada progres nyata, memicu keinginan untuk membuka modul yang lebih sulit di Storage.

---

## 💡 Logika Hubungan Halaman (Untuk Presentasi)

Jika ditanya juri, jelaskan hubungannya begini:

> "StruQlibrium menggunakan **Circular Engagement Model**. `Dashboard` berfungsi sebagai *anchor point*. `Storage` adalah input pengetahuan (learning input), dan `Battlefield` adalah validasi kompetensi (output validation). Ketiganya diikat oleh `GameProvider` yang memastikan koin dan statistik user tersinkronisasi secara real-time di seluruh halaman tanpa perlu refresh."

---

*Tertanda,*
**Senior Fullstack Architect @ StruQlibrium Team**


kalo mau login Syafikh@gmail.com pw nya 123456



Constraint Khusus:

Gunakan pembatas kode di setiap file yang diubah:
========================ini code [nama file]======
[Isi Kode]
==========================ini code [nama file] selesai ==============
