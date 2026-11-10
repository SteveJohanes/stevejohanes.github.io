export type L = { en: string; id: string };

type Base = { no: string; title: L };

export type AboutSection =
  | (Base & { kind: "text"; body: L[] })
  | (Base & { kind: "list"; items: L[] })
  | (Base & {
      kind: "education";
      items: { school: string; degree: L; period: string; note?: L }[];
    })
  | (Base & {
      kind: "experience";
      items: { role: L; org: string; period: string; points: L[] }[];
    })
  | (Base & { kind: "timeline"; items: { period: string; text: L }[] });

export const aboutSections: AboutSection[] = [
  {
    no: "01",
    kind: "text",
    title: { en: "Personal Introduction", id: "Perkenalan Diri" },
    body: [
      {
        en: "Informatics graduate from STMIK LIKMI with experience in web and mobile application development. A quick learner, adaptable, and interested in exploring new technologies. Looking forward to applying my technical skills, contributing to the team, and continuing to grow professionally.",
        id: "Lulusan Informatika STMIK LIKMI dengan pengalaman dalam pengembangan aplikasi web dan mobile. Cepat belajar, mudah beradaptasi, dan tertarik mengeksplorasi teknologi baru. Siap menerapkan kemampuan teknis, berkontribusi dalam tim, dan terus berkembang secara profesional.",
      },
    ],
  },
  {
    no: "02",
    kind: "text",
    title: {
      en: "Background & Early Interest",
      id: "Latar Belakang & Awal Ketertarikan",
    },
    body: [
      {
        en: "It all started with games. While playing, I wanted to build the games I had in mind myself, which led me to a vocational high school (SMK) majoring in Informatics. There I discovered web development and became drawn to design and editing. After graduating, I continued my studies in Informatics at STMIK LIKMI to broaden my skills. That mix of logic and design still shapes how I build web and mobile products today.",
        id: "Semuanya berawal dari game. Saat bermain, saya ingin membuat sendiri game yang saya bayangkan, dan itu membawa saya masuk SMK jurusan Informatika. Di sana saya mulai tertarik pada pembuatan website, juga pada desain dan editing. Setelah lulus, saya melanjutkan pendidikan Informatika di STMIK LIKMI untuk memperluas kemampuan saya. Perpaduan logika dan desain itu masih memengaruhi cara saya membuat produk web dan mobile sampai sekarang.",
      },
    ],
  },
  {
    no: "03",
    kind: "education",
    title: { en: "Education", id: "Pendidikan" },
    items: [
      {
        school: "STMIK LIKMI, Bandung",
        degree: { en: "Bachelor of Informatics", id: "Informatika (S1)" },
        period: "2022–2026",
        note: {
          en: "Thesis: “Rancang Bangun Prototipe Estimasi Tingkat Kebisingan Menggunakan Sensor MAX9814 Berbasis Arduino”. ",
          id: "Skripsi: “Rancang Bangun Prototipe Estimasi Tingkat Kebisingan Menggunakan Sensor MAX9814 Berbasis Arduino”.",
        },
      },
      {
        school: "SMK Gracia Bandung",
        degree: {
          en: "Vocational High School (SMK), Informatics",
          id: "SMK, Jurusan Informatika",
        },
        period: "2019-2022",
      },
    ],
  },
  {
    no: "04",
    kind: "experience",
    title: { en: "Professional Experience", id: "Pengalaman Profesional" },
    items: [
      {
        role: { en: "SEO Analyst (Intern)", id: "SEO Analyst (Magang)" },
        org: "Megasatria Hiciter",
        period: "juni 2024 - agustus 2024",
        points: [
          {
            en: "Worked as an SEO analyst, responsible for optimizing domain performance.",
            id: "Bekerja sebagai SEO analyst dengan tugas mengoptimalkan performa domain.",
          },
        ],
      },
    ],
  },
  {
    no: "05",
    kind: "list",
    title: { en: "Interests & Personal Values", id: "Minat & Nilai Pribadi" },
    items: [
      {
        en: "Design & editing: I’m interested in design and editing, an interest that started in vocational school.",
        id: "Desain & editing: saya tertarik pada desain dan editing, minat yang mulai tumbuh sejak di SMK.",
      },
      {
        en: "Programming: I enjoy building websites, apps, and games. Right now I’m building Kiln (Streamdex), a livestream companion app that brings YouTube, TikTok, Twitch, and Kick into one dashboard.",
        id: "Programming: saya suka membuat website, aplikasi, dan game. Saat ini saya sedang mengembangkan Kiln (Streamdex), aplikasi pendamping livestreaming yang menyatukan YouTube, TikTok, Twitch, dan Kick dalam satu dashboard.",
      },
      {
        en: "Cybersecurity: I’m exploring it to expand my knowledge of application security and secure software development.",
        id: "Cybersecurity: saya sedang mendalaminya untuk memperluas pengetahuan tentang keamanan aplikasi dan pengembangan software yang aman.",
      },
    ],
  },
  {
    no: "06",
    kind: "text",
    title: { en: "Career Goals", id: "Tujuan Karier" },
    body: [
      {
        en: "I’m currently looking for a position that fits my skills, where I can contribute to development.",
        id: "Saat ini saya sedang mencari posisi yang sesuai dengan kemampuan saya, tempat saya dapat berkontribusi dalam pengembangan.",
      },
    ],
  },
];
