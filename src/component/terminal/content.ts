export type Lang = "en" | "id";

export const text = {
  en: {
    welcome: "Welcome to my portfolio. (Version 1.0.0)",
    hint: "Type `help` for a list of available commands.",
    about:
      "Hi, I’m Steve. I graduated in Informatics from STMIK LIKMI, Bandung, and I have interned as a Full Stack Developer (Laravel) and as an SEO Analyst. I build mobile apps with Flutter and web apps with Laravel and Next.js.",
    langSet: "Language set to English.",
    langUsage: "Usage: lang en | lang id",
    notFound: (c: string) => `command not found: ${c}. Type \`help\`.`,
  },
  id: {
    welcome: "Selamat datang di portofolio terminal saya. (Versi 1.0.0)",
    hint: "Ketik `help` untuk melihat daftar perintah.",
    about:
      "Halo, saya Steve. Lulusan Informatika STMIK LIKMI Bandung, pernah magang sebagai Full Stack Developer (Laravel) dan SEO Analyst. Saya membuat aplikasi mobile dengan Flutter dan aplikasi web dengan Laravel dan Next.js.",
    langSet: "Bahasa diubah ke Indonesia.",
    langUsage: "Penggunaan: lang en | lang id",
    notFound: (c: string) => `perintah tidak ditemukan: ${c}. Ketik \`help\`.`,
  },
};

export const help = [
  ["help", "show this list"],
  ["about", "who I am"],
  ["projects", "things I have built"],
  ["skills", "tech stack"],
  ["contact", "how to reach me"],
  ["lang <en|id>", "switch language"],
  ["clear", "clear the screen"],
];

export const projects = [
  {
    name: "aplikasi-kasir",
    tag: "APP",
    en: "Cashier app from order to payment, integrated with warehouse stock.",
    id: "Aplikasi kasir dari pesanan hingga pembayaran, terintegrasi stok gudang.",
  },
  {
    name: "aplikasi-tahura",
    tag: "APP",
    en: "Visitor app with gamification, maps, ticketing, and a shop.",
    id: "Aplikasi pengunjung dengan gamifikasi, maps, tiket, dan toko.",
  },
  {
    name: "toko-komputer",
    tag: "WEB",
    en: "Computer store site with a PC-build simulator and price estimate.",
    id: "Website toko komputer dengan simulasi rakit PC dan estimasi harga.",
  },
  {
    name: "streamdex",
    tag: "WEB",
    en: "Multi-platform livestream monitoring dashboard.",
    id: "Dashboard pemantauan livestream multi-platform.",
  },
  {
    name: "panelia",
    tag: "WEB",
    en: "Comic reading site with an admin panel (Next.js).",
    id: "Website baca komik dengan admin panel (Next.js).",
  },
];

export const skills: Record<string, string[]> = {
  framework: ["Flutter", "Laravel", "Next.js"],

  programming: [
    "HTML",
    "CSS",
    "php",
    "JavaScript",
    "TypeScript",
    "Dart",
  ],

  design: [
    "Canva",
    "Adobe Photoshop",
    "CorelDRAW",
    "Adobe Illustrator",
    "Adobe Animate",
  ],

  videoEditing: [
    "Adobe After Effects",
    "Adobe Premiere Pro",
    "Alight Motion",
    "CapCut",
  ],

  productivity: [
    "Microsoft Word",
    "Microsoft Excel",
    "Microsoft PowerPoint",
    "Microsoft Visio",
    "Microsoft Project",
  ],

  languages: ["Indonesian", "English", "Japanese (JLPT N5)"],
};

export const contact = {
  email: "johs9021@gmail.com",
  github: "https://github.com/SteveJohanes",
  linkedin: "https://linkedin.com/in/steve-johanes",
};

type Txt = { en: string; id: string };

export type ProjectDetail = {
  name: string;
  title?: string;
  tag: "APP" | "WEB";
  status?: Txt;
  summary: Txt;
  description?: Txt;
  goals?: Txt[];
  features: Txt[];
  stack: string[];
  stackGroups?: { label: Txt; items: string[] }[];
  stackNote?: Txt;
  link?: string;
  images?: { src: string; alt: Txt }[];
};

export const projectDetails: ProjectDetail[] = [
  {
    name: "aplikasi-kasir",
    title: "SuperCart POS",
    tag: "APP",
    summary: {
      en: "SuperCart POS: cashier and warehouse stock management app with real-time sales reports.",
      id: "SuperCart POS: aplikasi kasir dan manajemen stok gudang dengan laporan penjualan real-time.",
    },
    description: {
      en: "SuperCart POS helps cashiers process transactions quickly and accurately while staying connected to the warehouse stock management system. With a simple interface and complete features, it makes sales management, stock monitoring, and reporting easier in real time.",
      id: "SuperCart POS membantu kasir memproses transaksi dengan cepat dan akurat, sekaligus terhubung langsung dengan sistem manajemen stok gudang. Dengan antarmuka yang sederhana dan fitur lengkap, aplikasi ini mempermudah pengelolaan penjualan, pemantauan stok, dan pelaporan secara real-time.",
    },
    goals: [
      {
        en: "Make the checkout process easier.",
        id: "Mempermudah proses transaksi di kasir.",
      },
      {
        en: "Automate stock recording for supermarket goods.",
        id: "Mengotomatisasi pencatatan stok barang supermarket.",
      },
      {
        en: "Improve the store’s operational efficiency.",
        id: "Meningkatkan efisiensi operasional toko.",
      },
      {
        en: "Provide accurate sales reports for store owners.",
        id: "Menyediakan laporan penjualan yang akurat untuk pemilik toko.",
      },
    ],
    features: [
      {
        en: "User login with Cashier and Warehouse roles",
        id: "Login user dengan role Kasir dan Gudang",
      },
      { en: "Warehouse stock management", id: "Manajemen stok gudang" },
      { en: "Cashier transactions", id: "Transaksi kasir" },
      { en: "Summary dashboard", id: "Dashboard ringkasan" },
      { en: "Sales reports", id: "Laporan penjualan" },
    ],
    stack: [],
    stackGroups: [
      {
        label: { en: "Framework", id: "framework" },
        items: ["Flutter", "Dart"],
      },
      { label: { en: "back-end", id: "back-end" }, items: ["Express JS"] },
      {
        label: { en: "database", id: "database" },
        items: ["PostgreSQL", "Supabase"],
      },
      { label: { en: "storage", id: "storage" }, items: ["Cloudflare R2"] },
      { label: { en: "deployment", id: "deployment" }, items: ["Vercel"] },
    ],
    stackNote: {
      en: "Back-end built with Express JS and deployed on Vercel. Database: PostgreSQL on Supabase. Storage bucket: Cloudflare R2. All deployment servers run on free plans.",
      id: "Back-end menggunakan Express JS yang dideploy di Vercel. Database PostgreSQL di Supabase. Storage bucket menggunakan Cloudflare R2. Semua server deployment yang digunakan gratis tanpa berbayar.",
    },
    images: [
      {
        src: "/assets/supercart-pos.jpg",
        alt: {
          en: "SuperCart POS app preview",
          id: "Pratinjau aplikasi SuperCart POS",
        },
      },
    ],
  },
  {
    name: "aplikasi-tahura",
    title: "Explore Tahura Adventure",
    tag: "APP",
    summary: {
      en: "Explore Tahura Adventure: a mobile app that makes visiting Tahura interactive and educational, with maps, gamification, and online ticketing.",
      id: "Explore Tahura Adventure: aplikasi mobile yang membuat kunjungan ke Tahura lebih interaktif dan edukatif, dengan peta, gamifikasi, dan tiket online.",
    },
    description: {
      en: "Explore Tahura Adventure is a mobile app that gives visitors of Taman Hutan Raya (Tahura) an interactive and educational experience. It combines information, navigation, safety features, and game elements, so visitors can explore the area in a more fun way while learning about its flora, fauna, and history.",
      id: "Explore Tahura Adventure adalah aplikasi mobile yang memberikan pengalaman interaktif dan edukatif bagi pengunjung Taman Hutan Raya (Tahura). Aplikasi ini menggabungkan informasi, navigasi, fitur keselamatan, dan elemen permainan, sehingga pengunjung dapat menjelajahi kawasan dengan cara yang lebih menyenangkan sambil belajar tentang flora, fauna, dan sejarahnya.",
    },
    goals: [
      {
        en: "Provide educational information about Tahura’s flora, fauna, and history.",
        id: "Memberikan informasi edukatif tentang flora, fauna, dan sejarah Tahura.",
      },
      {
        en: "Increase visitor engagement through gamification.",
        id: "Meningkatkan keterlibatan pengunjung melalui gamifikasi.",
      },
      {
        en: "Make navigation easier with an interactive map.",
        id: "Mempermudah navigasi dengan peta interaktif.",
      },
      {
        en: "Improve visitor safety with emergency assistance.",
        id: "Meningkatkan keselamatan pengunjung dengan bantuan darurat.",
      },
    ],
    features: [
      {
        en: "Login, registration, and user profile with visit history and achievements",
        id: "Login, registrasi, dan profil pengguna dengan riwayat kunjungan dan pencapaian",
      },
      {
        en: "Online ticket and merchandise ordering with a QR e-ticket",
        id: "Pemesanan tiket dan merchandise online dengan e-ticket QR",
      },
      {
        en: "QR check-in and QR scanning to learn about flora and fauna",
        id: "Check-in QR dan pemindaian QR untuk mempelajari flora dan fauna",
      },
      {
        en: "Digital flora and fauna cards, leaderboard, and badges",
        id: "Kartu digital flora dan fauna, leaderboard, dan badge",
      },
      {
        en: "Interactive map with real-time GPS navigation",
        id: "Peta interaktif dengan navigasi GPS real-time",
      },
      {
        en: "Challenges and missions that earn points",
        id: "Tantangan dan misi yang memberikan poin",
      },
      {
        en: "Emergency button and safety information",
        id: "Tombol darurat dan informasi keselamatan",
      },
      {
        en: "Notifications, feedback, and issue reporting",
        id: "Notifikasi, umpan balik, dan laporan masalah",
      },
    ],
    stack: [],
    stackGroups: [
      { label: { en: "Framework", id: "framework" }, items: ["Flutter"] },
      {
        label: { en: "database", id: "database" },
        items: ["PostgreSQL", "Supabase"],
      },
      { label: { en: "storage", id: "storage" }, items: ["Cloudflare R2"] },
    ],
    stackNote: {
      en: "Mobile app built with Flutter. Database: PostgreSQL on Supabase. Storage bucket: Cloudflare R2.",
      id: "Aplikasi mobile dibuat dengan Flutter. Database PostgreSQL di Supabase. Storage bucket menggunakan Cloudflare R2.",
    },
    images: [
      {
        src: "/assets/tahuraapp.jpg",
        alt: {
          en: "Explore Tahura Adventure",
          id: "Explore Tahura Adventure",
        },
      },
    ],
  },

  {
    name: "toko-komputer",
    title: "ReseKomputer",
    tag: "WEB",
    summary: {
      en: "ReseKomputer: a computer store website with an interactive PC builder that helps users select components, check compatibility, and estimate their PC build cost before purchasing.",
      id: "ReseKomputer: website toko komputer dengan fitur simulasi rakit PC interaktif yang membantu pengguna memilih komponen, memeriksa kompatibilitas, dan memperkirakan biaya rakitan sebelum membeli.",
    },
    description: {
      en: "ReseKomputer is a computer store website designed to make it easier for users to explore PC components and plan their own PC builds. It provides product information, component selection, compatibility checking, and price estimation in one place, helping users make better purchasing decisions based on their needs and budget.",
      id: "ReseKomputer adalah website toko komputer yang dirancang untuk memudahkan pengguna menjelajahi komponen PC dan merencanakan rakitan komputer mereka sendiri. Website ini menyediakan informasi produk, pemilihan komponen, pemeriksaan kompatibilitas, dan estimasi harga dalam satu tempat, sehingga pengguna dapat membuat keputusan pembelian yang lebih sesuai dengan kebutuhan dan anggaran.",
    },
    goals: [
      {
        en: "Provide an organized catalog of computer components and product information.",
        id: "Menyediakan katalog komponen komputer dan informasi produk yang terorganisir.",
      },
      {
        en: "Help users plan their PC builds by selecting individual components.",
        id: "Membantu pengguna merencanakan rakitan PC dengan memilih setiap komponen.",
      },
      {
        en: "Reduce component compatibility issues through compatibility checking.",
        id: "Mengurangi masalah ketidakcocokan komponen melalui pemeriksaan kompatibilitas.",
      },
      {
        en: "Provide estimated total build costs to help users plan their budgets.",
        id: "Menyediakan estimasi total biaya rakitan untuk membantu pengguna merencanakan anggaran.",
      },
    ],
    features: [
      {
        en: "Computer component catalog with product details",
        id: "Katalog komponen komputer dengan detail produk",
      },
      {
        en: "Product categories and component filtering",
        id: "Kategori produk dan penyaringan komponen",
      },
      {
        en: "Interactive PC-build simulator",
        id: "Simulasi rakit PC interaktif",
      },
      {
        en: "Component compatibility checking",
        id: "Pemeriksaan kompatibilitas antar komponen",
      },
      {
        en: "Automatic PC build price estimation",
        id: "Estimasi harga rakitan PC secara otomatis",
      },
      {
        en: "Product images and detailed specifications",
        id: "Gambar produk dan spesifikasi secara terperinci",
      },
    ],
    stack: [],
    stackGroups: [
      {
        label: { en: "Backend", id: "backend" },
        items: ["Laravel", "PHP"],
      },
      {
        label: { en: "Database", id: "database" },
        items: ["PostgreSQL", "Supabase"],
      },
      {
        label: { en: "Storage", id: "storage" },
        items: ["Supabase Storage"],
      },
      {
        label: { en: "Frontend", id: "frontend" },
        items: ["HTML", "CSS", "JavaScript", "Blade"],
      },
    ],
    stackNote: {
      en: "Web application developed with Laravel and PHP. Database: PostgreSQL hosted on Supabase.",
      id: "Aplikasi web dikembangkan menggunakan Laravel dan PHP. Database PostgreSQL di-host menggunakan Supabase.",
    },
    images: [
      {
        src: "/assets/rese1.png",
        alt: {
          en: "ReseKomputer computer store website",
          id: "Website toko komputer ReseKomputer",
        },
      },
    ],
  },

  {
    name: "panelia",
    tag: "WEB",
    status: { en: "in progress", id: "sedang dikembangkan" },
    summary: {
      en: "Comic reading website with a comic-panel-inspired home page.",
      id: "Website baca komik dengan halaman depan bergaya panel komik.",
    },
    features: [
      {
        en: "Comic cards with poster, status, rating, genres, and episode count",
        id: "Kartu komik dengan poster, status, rating, genre, dan jumlah episode",
      },
      {
        en: "Admin panel for comics, genres, and announcements",
        id: "Admin panel untuk komik, genre, dan pemberitahuan",
      },
      { en: "Admin login", id: "Login admin" },
    ],
    stack: ["Next.js", "React", "Firebase", "Cloudinary"],
  },
];
