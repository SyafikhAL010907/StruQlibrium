export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const UJI_QUESTIONS: Question[] = [
  {
    id: "uj1",
    question: "Apa tujuan utama dari analisis struktur pada bangunan?",
    options: ["Menghitung biaya bahan", "Memastikan keamanan dan stabilitas", "Memperindah tampilan", "Mengurangi jumlah pekerja"],
    correctAnswer: "Memastikan keamanan dan stabilitas"
  },
  {
    id: "uj2",
    question: "Gaya yang bekerja tegak lurus terhadap sumbu batang disebut?",
    options: ["Gaya Normal", "Gaya Geser", "Momen Lentur", "Gaya Torsi"],
    correctAnswer: "Gaya Geser"
  },
  {
    id: "uj3",
    question: "Satuan standar internasional (SI) untuk momen adalah?",
    options: ["Newton (N)", "Newton meter (Nm)", "Pascal (Pa)", "Kilogram (kg)"],
    correctAnswer: "Newton meter (Nm)"
  },
  {
    id: "uj4",
    question: "Tumpuan yang dapat menahan gaya vertikal, horizontal, dan momen adalah?",
    options: ["Sendi", "Rol", "Jepit", "Pendel"],
    correctAnswer: "Jepit"
  },
  {
    id: "uj5",
    question: "Pada balok sederhana, momen maksimum terjadi saat gaya geser bernilai?",
    options: ["Maksimum", "Nol", "Sama dengan beban", "Negatif"],
    correctAnswer: "Nol"
  },
  {
    id: "uj6",
    question: "Hukum Hooke menyatakan hubungan linear antara tegangan dan?",
    options: ["Regangan", "Gaya", "Massa", "Suhu"],
    correctAnswer: "Regangan"
  },
  {
    id: "uj7",
    question: "Rangka batang (Truss) dianggap hanya menerima gaya?",
    options: ["Geser", "Aksial", "Torsi", "Lentur"],
    correctAnswer: "Aksial"
  },
  {
    id: "uj8",
    question: "Konsep keseimbangan menyatakan bahwa jumlah gaya pada arah X harus sama dengan?",
    options: ["Satu", "Nol", "Gaya Y", "Momen"],
    correctAnswer: "Nol"
  },
  {
    id: "uj9",
    question: "Modulus elastisitas baja umumnya berkisar pada angka?",
    options: ["200,000 MPa", "20,000 MPa", "2,000 MPa", "200 MPa"],
    correctAnswer: "200,000 MPa"
  },
  {
    id: "uj10",
    question: "Beban yang besarnya tetap dan posisinya tidak berubah disebut beban?",
    options: ["Hidup", "Mati", "Angin", "Gempa"],
    correctAnswer: "Mati"
  },
  {
    id: "uj11",
    question: "Gaya yang berusaha memutar suatu benda disebut?",
    options: ["Inersia", "Momen", "Frekuensi", "Amplitudo"],
    correctAnswer: "Momen"
  },
  {
    id: "uj12",
    question: "Titik berat sebuah persegi panjang berada pada?",
    options: ["Pojok kiri", "Tengah-tengah diagonal", "Sisi terpanjang", "Sisi terpendek"],
    correctAnswer: "Tengah-tengah diagonal"
  },
  {
    id: "uj13",
    question: "Sambungan yang dianggap tidak mengizinkan rotasi disebut sambungan?",
    options: ["Sendi", "Kaku (Rigid)", "Geser", "Baut"],
    correctAnswer: "Kaku (Rigid)"
  },
  {
    id: "uj14",
    question: "Perbandingan antara tegangan geser dan regangan geser disebut?",
    options: ["Modulus Young", "Modulus Geser", "Rasio Poisson", "Batas Elastis"],
    correctAnswer: "Modulus Geser"
  },
  {
    id: "uj15",
    question: "Fenomena melengkungnya batang tekan akibat beban aksial disebut?",
    options: ["Defleksi", "Tekuk (Buckling)", "Retak", "Luluh"],
    correctAnswer: "Tekuk (Buckling)"
  },
  {
    id: "uj16",
    question: "Beban yang bekerja pada satu titik tertentu disebut?",
    options: ["Beban Terbagi Rata", "Beban Terpusat", "Beban Trapesium", "Beban Segitiga"],
    correctAnswer: "Beban Terpusat"
  },
  {
    id: "uj17",
    question: "Dalam analisis statika, benda dianggap sebagai benda?",
    options: ["Elastis", "Kaku", "Cair", "Gas"],
    correctAnswer: "Kaku"
  },
  {
    id: "uj18",
    question: "Arah momen positif biasanya didefinisikan sebagai?",
    options: ["Searah jarum jam", "Berlawanan arah jarum jam", "Ke atas", "Ke bawah"],
    correctAnswer: "Berlawanan arah jarum jam"
  },
  {
    id: "uj19",
    question: "Rumus tegangan normal (sigma) adalah gaya dibagi?",
    options: ["Panjang", "Volume", "Luas Penampang", "Massa"],
    correctAnswer: "Luas Penampang"
  },
  {
    id: "uj20",
    question: "Faktor keamanan digunakan untuk mengantisipasi?",
    options: ["Ketidakpastian beban", "Kelebihan biaya", "Waktu kerja", "Jumlah alat"],
    correctAnswer: "Ketidakpastian beban"
  }
];
