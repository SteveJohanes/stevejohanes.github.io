export type Lang = 'en' | 'id';

export const text = {
  en: {
    welcome: 'Welcome to my terminal portfolio. (Version 1.0.0)',
    hint: 'Type `help` for a list of available commands.',
    about:
      'Hi, I’m Steve. I graduated in Informatics from STMIK LIKMI, Bandung, and I have interned as a Full Stack Developer (Laravel) and as an SEO Analyst. I build mobile apps with Flutter and web apps with Laravel and Next.js.',
    langSet: 'Language set to English.',
    langUsage: 'Usage: lang en | lang id',
    notFound: (c: string) => `command not found: ${c}. Type \`help\`.`,
  },
  id: {
    welcome: 'Selamat datang di portofolio terminal saya. (Versi 1.0.0)',
    hint: 'Ketik `help` untuk melihat daftar perintah.',
    about:
      'Halo, saya Steve. Lulusan Informatika STMIK LIKMI Bandung, pernah magang sebagai Full Stack Developer (Laravel) dan SEO Analyst. Saya membuat aplikasi mobile dengan Flutter dan aplikasi web dengan Laravel dan Next.js.',
    langSet: 'Bahasa diubah ke Indonesia.',
    langUsage: 'Penggunaan: lang en | lang id',
    notFound: (c: string) => `perintah tidak ditemukan: ${c}. Ketik \`help\`.`,
  },
};

export const help = [
  ['help', 'show this list'],
  ['about', 'who I am'],
  ['projects', 'things I have built'],
  ['skills', 'tech stack'],
  ['contact', 'how to reach me'],
  ['lang <en|id>', 'switch language'],
  ['clear', 'clear the screen'],
];

export const projects = [
  { name: 'aplikasi-kasir', tag: 'APP', en: 'Cashier app from order to payment, integrated with warehouse stock.', id: 'Aplikasi kasir dari pesanan hingga pembayaran, terintegrasi stok gudang.' },
  { name: 'aplikasi-tahura', tag: 'APP', en: 'Visitor app with gamification, maps, ticketing, and a shop.', id: 'Aplikasi pengunjung dengan gamifikasi, maps, tiket, dan toko.' },
  { name: 'toko-komputer', tag: 'WEB', en: 'Computer store site with a PC-build simulator and price estimate.', id: 'Website toko komputer dengan simulasi rakit PC dan estimasi harga.' },
  { name: 'streamdex', tag: 'WEB', en: 'Multi-platform livestream monitoring dashboard.', id: 'Dashboard pemantauan livestream multi-platform.' },
  { name: 'panelia', tag: 'WEB', en: 'Comic reading site with an admin panel (Next.js).', id: 'Website baca komik dengan admin panel (Next.js).' },
];

export const skills: Record<string, string[]> = {
  mobile: ['Flutter'],
  backend: ['Laravel', 'PHP'],
  frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  seo: ['SEO Analysis'],
};

export const contact = {
  email: 'johs9021@gmail.com',
  github: 'https://github.com/SteveJohanes',
  linkedin: 'https://linkedin.com/in/steve-johanes',
};