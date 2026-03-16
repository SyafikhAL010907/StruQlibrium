// ========================ini code src/data/materials.ts======
import { Material, Subject } from "@/types";

export const subjects: Subject[] = [
  {
    id: "mekanika-teknik-1",
    title: "Mekanika Teknik I",
    description: "Dasar-dasar mekanika teknik, analisis gaya, tumpuan, dan keseimbangan struktur statis tertentu.",
    moduleCount: 6
  },
  {
    id: "analisis-struktur",
    title: "Analisis Struktur",
    description: "Pemahaman mendalam tentang gaya dalam, deformasi, dan metode analisis struktur tingkat lanjut.",
    moduleCount: 6
  },
  {
    id: "ilmu-bahan",
    title: "Ilmu Bahan Bangunan",
    description: "Karakteristik material konstruksi seperti beton, baja, kayu, dan komposit dalam struktur.",
    moduleCount: 6
  },
  {
    id: "hidrologi",
    title: "Hidrologi Teknik",
    description: "Analisis siklus air, curah hujan, dan pemodelan aliran sungai untuk infrastruktur air.",
    moduleCount: 6
  },
  {
    id: "manajemen-konstruksi",
    title: "Manajemen Konstruksi",
    description: "Perencanaan, penjadwalan, dan pengendalian proyek konstruksi agar efisien dan tepat waktu.",
    moduleCount: 6
  },
  {
    id: "rekayasa-fondasi",
    title: "Rekayasa Fondasi",
    description: "Analisis daya dukung tanah dan desain sistem perletakan bawah untuk berbagai jenis struktur.",
    moduleCount: 6
  }
];

export const materials: Material[] = [
  // Subject: Mekanika Teknik I
  {
    id: "gaya",
    subjectId: "mekanika-teknik-1",
    title: "Gaya",
    description: "Belajar tentang konsep dasar gaya, besaran (magnitude), dan arah (direction) dalam mekanika teknik.",
    content: "## Pengenalan Gaya\nGaya adalah besaran vektor yang memiliki nilai dan arah. Dalam teknik sipil, pemahaman gaya sangat krusial untuk memastikan kestabilan gedung.",
    image: "/images/topic-gaya.png"
  },
  {
    id: "beban",
    subjectId: "mekanika-teknik-1",
    title: "Beban",
    description: "Memahami berbagai jenis pembebanan pada struktur seperti beban terpusat dan beban merata.",
    content: "## Jenis Pembebanan\nBeban adalah aksi gaya luar yang bekerja pada struktur.",
    image: "/images/topic-beban.png"
  },
  {
    id: "tumpuan",
    subjectId: "mekanika-teknik-1",
    title: "Tumpuan",
    description: "Mengenal jenis-jenis tumpuan (perletakan) yang menyokong struktur agar tetap dalam kondisi statis.",
    content: "## Perletakan Struktur\nTanpa tumpuan yang benar, struktur tidak akan memiliki titik reaksi terhadap gaya luar.",
    image: "/images/topic-tumpuan.png"
  },
  {
    id: "momen",
    subjectId: "mekanika-teknik-1",
    title: "Momen",
    description: "Konsep tendensi gaya untuk memutar sebuah benda terhadap titik tertentu (titik rotasi).",
    content: "## Konsep Momen Gaya\nMomen terjadi ketika sebuah gaya bekerja pada jarak tertentu dari titik pusat koordinat.",
    image: "/images/topic-momen.png"
  },
  {
    id: "sambungan",
    subjectId: "mekanika-teknik-1",
    title: "Sambungan",
    description: "Mempelajari bagaimana elemen-elemen struktur disambung menggunakan baut atau las.",
    content: "## Integritas Sambungan\nTitik paling lemah dalam sebuah struktur seringkali berada pada sambungannya.",
    image: "/images/topic-sambungan.png"
  },
  {
    id: "keseimbangan",
    subjectId: "mekanika-teknik-1",
    title: "Keseimbangan",
    description: "Prinsip dasar kesetimbangan statis benda tegar dalam ruang dua dimensi.",
    content: "## Hukum Statika\nΣF = 0 dan ΣM = 0 adalah dasar dari semua analisis statis.",
    image: "/images/topic-keseimbangan.png"
  },

  // Subject: Analisis Struktur
  {
    id: "truss",
    subjectId: "analisis-struktur",
    title: "Rangka Batang",
    description: "Analisis gaya dalam pada struktur rangka batang menggunakan metode Join atau Potongan.",
    content: "Content dummy untuk Rangka Batang.",
    image: "/images/topic-truss.png"
  },
  {
    id: "frame",
    subjectId: "analisis-struktur",
    title: "Portal",
    description: "Mempelajari analisis struktur portal dengan memperhatikan gaya aksial, geser, dan momen.",
    content: "Content dummy untuk Portal.",
    image: "/images/topic-frame.png"
  },
  {
    id: "garis-pengaruh",
    subjectId: "analisis-struktur",
    title: "Garis Pengaruh",
    description: "Analisis beban bergerak pada jembatan menggunakan konsep garis pengaruh.",
    content: "Content dummy untuk Garis Pengaruh.",
    image: "/images/topic-garis-pengaruh.png"
  },
  {
    id: "deformasi",
    subjectId: "analisis-struktur",
    title: "Deformasi",
    description: "Menghitung lendutan dan kemiringan pada balok menggunakan metode integrasi.",
    content: "Content dummy untuk Deformasi.",
    image: "/images/topic-deformasi.png"
  },
  {
    id: "statis-tak-tentu",
    subjectId: "analisis-struktur",
    title: "Statis Tak Tentu",
    description: "Dasar analisis untuk struktur yang memiliki reaksi perletakan lebih dari tiga.",
    content: "Content dummy untuk Statis Tak Tentu.",
    image: "/images/topic-statis-tak-tentu.png"
  },
  {
    id: "matriks",
    subjectId: "analisis-struktur",
    title: "Metode Matriks",
    description: "Pendekatan komputasi untuk menganalisis struktur kompleks menggunakan matriks kekakuan.",
    content: "Content dummy untuk Metode Matriks.",
    image: "/images/topic-matriks.png"
  },

  // Subject: Ilmu Bahan (Dummy)
  { id: "beton", subjectId: "ilmu-bahan", title: "Teknologi Beton", description: "Sifat fisik dan mekanis beton sebagai material utama konstruksi.", content: "Dummy.", image: "/images/topic-beton.png" },
  { id: "baja", subjectId: "ilmu-bahan", title: "Material Baja", description: "Karakteristik baja profil dan tulangan dalam menahan beban tarik.", content: "Dummy.", image: "/images/topic-baja.png" },
  { id: "kayu", subjectId: "ilmu-bahan", title: "Konstruksi Kayu", description: "Pemanfaatan kayu sebagai material struktural yang ramah lingkungan.", content: "Dummy.", image: "/images/topic-kayu.png" },
  { id: "aspal", subjectId: "ilmu-bahan", title: "Material Aspal", description: "Campuran perkerasan jalan untuk berbagai kelas beban lalu lintas.", content: "Dummy.", image: "/images/topic-aspal.png" },
  { id: "tanah", subjectId: "ilmu-bahan", title: "Mekanika Tanah", description: "Sifat-sifat indeks dan klasifikasi tanah untuk konstruksi.", content: "Dummy.", image: "/images/topic-tanah.png" },
  { id: "komposit", subjectId: "ilmu-bahan", title: "Material Komposit", description: "Inovasi material baru hasil gabungan dua atau lebih bahan dasar.", content: "Dummy.", image: "/images/topic-komposit.png" },

  // Subject: Hidrologi (Dummy)
  { id: "presipitasi", subjectId: "hidrologi", title: "Presipitasi", description: "Analisis data curah hujan untuk perencanaan drainase.", content: "Dummy.", image: "/images/topic-presipitasi.png" },
  { id: "evapotranspirasi", subjectId: "hidrologi", title: "Evapotranspirasi", description: "Proses hilangnya air dari permukaan tanah dan tanaman.", content: "Dummy.", image: "/images/topic-evapotranspirasi.png" },
  { id: "infiltrasi", subjectId: "hidrologi", title: "Infiltrasi", description: "Kemampuan tanah dalam menyerap air permukaan ke dalam tanah.", content: "Dummy.", image: "/images/topic-infiltrasi.png" },
  { id: "run-off", subjectId: "hidrologi", title: "Limpasan Permukaan", description: "Perhitungan aliran air yang mengalir di atas permukaan tanah.", content: "Dummy.", image: "/images/topic-run-off.png" },
  { id: "hidrograf", subjectId: "hidrologi", title: "Hidrograf Satuan", description: "Model respon daerah aliran sungai terhadap hujan.", content: "Dummy.", image: "/images/topic-hidrograf.png" },
  { id: "waduk", subjectId: "hidrologi", title: "Perencanaan Waduk", description: "Optimasi penampungan air untuk irigasi dan PLTA.", content: "Dummy.", image: "/images/topic-waduk.png" },

  // Subject: Manajemen Konstruksi (Dummy)
  { id: "scheduling", subjectId: "manajemen-konstruksi", title: "Penjadwalan", description: "Metode CPM dan PERT untuk efisiensi waktu proyek.", content: "Dummy.", image: "/images/topic-scheduling.png" },
  { id: "costing", subjectId: "manajemen-konstruksi", title: "RAB", description: "Penyusunan rencana anggaran biaya secara detail.", content: "Dummy.", image: "/images/topic-costing.png" },
  { id: "k3", subjectId: "manajemen-konstruksi", title: "K3 Konstruksi", description: "Keselamatan dan kesehatan kerja di lingkungan proyek.", content: "Dummy.", image: "/images/topic-k3.png" },
  { id: "qhse", subjectId: "manajemen-konstruksi", title: "QHSE", description: "Standar kualitas dan lingkungan dalam pembangunan.", content: "Dummy.", image: "/images/topic-qhse.png" },
  { id: "legal", subjectId: "manajemen-konstruksi", title: "Kontrak Hukum", description: "Aspek hukum dan administrasi dalam industri konstruksi.", content: "Dummy.", image: "/images/topic-legal.png" },
  { id: "supply-chain", subjectId: "manajemen-konstruksi", title: "Logistik Proyek", description: "Manajemen rantai pasok material dan alat berat.", content: "Dummy.", image: "/images/topic-supply-chain.png" },

  // Subject: Rekayasa Fondasi (Dummy)
  { id: "dangkal", subjectId: "rekayasa-fondasi", title: "Fondasi Dangkal", description: "Desain fondasi telapak dan memanjang untuk beban ringan.", content: "Dummy.", image: "/images/topic-dangkal.png" },
  { id: "dalam", subjectId: "rekayasa-fondasi", title: "Fondasi Dalam", description: "Analisis tiang pancang dan bore pile untuk gedung tinggi.", content: "Dummy.", image: "/images/topic-dalam.png" },
  { id: "lateral", subjectId: "rekayasa-fondasi", title: "Tekanan Tanah", description: "Analisis tekanan tanah aktif dan pasif pada dinding penahan.", content: "Dummy.", image: "/images/topic-lateral.png" },
  { id: "settlement", subjectId: "rekayasa-fondasi", title: "Penurunan Tanah", description: "Prediksi penurunan struktur akibat konsolidasi tanah.", content: "Dummy.", image: "/images/topic-settlement.png" },
  { id: "perbaikan", subjectId: "rekayasa-fondasi", title: "Perbaikan Tanah", description: "Metode geotekstil dan sand drain untuk tanah lunak.", content: "Dummy.", image: "/images/topic-perbaikan.png" },
  { id: "instrumentasi", subjectId: "rekayasa-fondasi", title: "Monitoring Fondasi", description: "Penggunaan inklinometer dan piezometer di lapangan.", content: "Dummy.", image: "/images/topic-instrumentasi.png" }
];
// ==========================ini code src/data/materials.ts selesai ==============
