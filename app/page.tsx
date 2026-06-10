"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Lanyard from "./component/Lanyard";

const SplitText: any = dynamic(() => import("./component/SplitText"), {
  ssr: false,
});
const ProfileCard: any = dynamic(() => import("./component/ProfileCard"), {
  ssr: false,
});
const PillNav: any = dynamic(() => import("./component/PillNav"), {
  ssr: false,
});
const ShapeGrid: any = dynamic(() => import("./component/ShapeGrid"), {
  ssr: false,
});
const RotatingText: any = dynamic(() => import("./component/RotatingText"), {
  ssr: false,
});
const VariableProximity: any = dynamic(
  () => import("./component/VariableProximity"),
  { ssr: false },
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Callback setelah animasi SplitText selesai
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
        <PillNav
          items={[
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Projects", href: "#projects" },
          ]}
          activeHref=""
          ease="power2.easeOut"
          baseColor="#1a1a1a"
          pillColor="#3a3a3a"
          pillTextColor="#a3a3a3"
          hoveredPillTextColor="#ffffff"
          initialLoadAnimation={false}
        />
      </div>

      {/* ── HOME ── */}
      <section id="home" className="relative h-screen overflow-hidden">
        {/* Background ShapeGrid hanya di section home */}
        <div className="absolute inset-0 z-0">
          <ShapeGrid
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor="#2F293A"
            hoverFillColor="#222"
            shape="square"
            hoverTrailAmount={0}
            hoverColor="#222222"
            size={40}
          />
        </div>

        {/* Konten home */}
        <div className="relative z-10 container mx-auto h-full">
          <div className="grid grid-cols-12 h-full">
            {/* LEFT — hero text */}
            <div className="col-span-6 flex items-center justify-center px-16">
              <div className="flex flex-col gap-10 w-full max-w-lg">
                {/* Nama & title */}
                <div ref={containerRef} style={{ position: "relative" }}>
                  <VariableProximity
                    label={
                      "Hi, I'm Steve Johanes Lesmana \nA Full Stack Developer"
                    }
                    className="variable-proximity-demo"
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={containerRef}
                    radius={120}
                    falloff="linear"
                    style={{
                      fontSize: "3rem",
                      lineHeight: 1.1,
                      letterSpacing: "-0.03em",
                      fontWeight: 400,
                      color: "inherit",
                      cursor: "default",
                      whiteSpace: "pre-line",
                    }}
                  />
                </div>

                {/* Rotating text */}
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-lg font-semibold text-neutral-400">
                    I'm ready as a
                  </span>
                  <RotatingText
                    texts={[
                      "Web Developer",
                      "SEO & Web Performance",
                      "UI/UX Designer",
                    ]}
                    mainClassName="px-4 py-1.5 bg-neutral-800/80 text-neutral-100 text-base font-medium overflow-hidden rounded-lg min-w-[240px] justify-center border border-neutral-700 backdrop-blur-sm"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2200}
                    splitBy="characters"
                    auto
                    loop
                  />
                </div>
              </div>
            </div>

            {/* RIGHT — Lanyard 3D */}
            <div className="col-span-6 flex items-center justify-center">
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        className="relative min-h-screen flex items-center py-32"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-16 items-center">
            {/* LEFT — ProfileCard + Contact */}
            <div className="col-span-5 flex flex-col items-center gap-4">
              <ProfileCard
                name="Steve Johanes Lesmana"
                title="Full Stack Developer"
                handle="javicodes"
                status="Online"
                contactText="Contact Me"
                avatarUrl="assets/lanyard/foto1.png"
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log("Contact clicked")}
                behindGlowColor="rgba(125, 190, 255, 0.67)"
                iconUrl="/assets/demo/iconpattern.png"
                behindGlowEnabled
                innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
              />

              {/* Contact Info */}
              <div className="flex flex-col gap-2 w-full max-w-xs">
                <a className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors duration-200 group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-[11px] text-neutral-400 group-hover:text-neutral-200 transition-colors duration-200">
                    +62 858-7142-4750
                  </span>
                </a>

                <a className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors duration-200 group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="text-[11px] text-neutral-400 group-hover:text-neutral-200 transition-colors duration-200">
                    johs9021@gmail.com
                  </span>
                </a>
              </div>
            </div>

            {/* RIGHT — teks about + SplitText */}
            <div className="col-span-7 flex flex-col gap-8">
              <SplitText
                text="Building digital experiences that matter."
                className="text-4xl font-light text-neutral-100 leading-tight tracking-tight"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
                onLetterAnimationComplete={handleAnimationComplete}
              />

              <SplitText
                text="A final semester Information Technology student at STMIK LIKMI with a passion for learning and personal growth. Possesses strong adaptability, problem solving skills, and the ability to quickly acquire new knowledge. Driven to deliver high quality results, work effectively in diverse environments, and continuously improve through feedback and experience."
                className="text-sm text-neutral-500 leading-relaxed"
                delay={15}
                duration={0.8}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />

              <div className="flex flex-col gap-3 mt-4">
                {/* Programming Languages */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] tracking-[0.14em] uppercase text-neutral-500 font-medium">
                    Programming Languages
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      {
                        label: "PHP",
                        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg",
                      },
                      {
                        label: "JavaScript",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg",
                      },
                      {
                        label: "HTML",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg",
                      },
                      {
                        label: "CSS",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg",
                      },
                      {
                        label: "Java",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
                      },
                      {
                        label: "Dart",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-plain.svg",
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors duration-200"
                      >
                        <img
                          src={s.icon}
                          alt={s.label}
                          className="w-3.5 h-3.5"
                        />
                        <span className="text-[11px] text-neutral-400 whitespace-nowrap">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] tracking-[0.14em] uppercase text-neutral-500 font-medium">
                    Frameworks
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      {
                        label: "Laravel",
                        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg",
                      },
                      {
                        label: "React",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                      },
                      {
                        label: "Next.js",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                      },
                      {
                        label: "Flutter",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors duration-200"
                      >
                        <img
                          src={s.icon}
                          alt={s.label}
                          className="w-3.5 h-3.5"
                        />
                        <span className="text-[11px] text-neutral-400 whitespace-nowrap">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Design Tools */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] tracking-[0.14em] uppercase text-neutral-500 font-medium">
                    Design Tools
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      {
                        label: "Canva",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
                      },
                      {
                        label: "Adobe Photoshop",
                        icon: "https://www.svgrepo.com/show/452149/adobe-photoshop.svg",
                      },
                      {
                        label: "CorelDRAW",
                        icon: "https://cdn.worldvectorlogo.com/logos/coreldraw.svg",
                      },
                      {
                        label: "Adobe Illustrator",
                        icon: "https://www.svgrepo.com/show/452147/adobe-illustrator.svg",
                      },
                      {
                        label: "Adobe Animate",
                        icon: "https://cdn.worldvectorlogo.com/logos/adobe-animate.svg",
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors duration-200"
                      >
                        <img
                          src={s.icon}
                          alt={s.label}
                          className="w-3.5 h-3.5"
                        />
                        <span className="text-[11px] text-neutral-400 whitespace-nowrap">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spoken Languages */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] tracking-[0.14em] uppercase text-neutral-500 font-medium">
                    Spoken Languages
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      { label: "Indonesian" },
                      { label: "English" },
                      { label: "Japanese" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors duration-200"
                      >
                        <span className="text-[11px] text-neutral-400 whitespace-nowrap">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="about"
        className="relative min-h-screen flex items-center py-32"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-16 items-center">
            {/* LEFT — ProfileCard + Contact */}
            <div className="col-span-5 flex flex-col items-center gap-4">
              <ProfileCard
                name="Steve Johanes Lesmana"
                title="Full Stack Developer"
                handle="javicodes"
                status="Online"
                contactText="Contact Me"
                avatarUrl="assets/lanyard/foto1.png"
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log("Contact clicked")}
                behindGlowColor="rgba(125, 190, 255, 0.67)"
                iconUrl="/assets/demo/iconpattern.png"
                behindGlowEnabled
                innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
              />

              {/* Contact Info */}
              <div className="flex flex-col gap-2 w-full max-w-xs">
                <a
                  href="tel:+6285871424750"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors duration-200 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-[11px] text-neutral-400 group-hover:text-neutral-200 transition-colors duration-200">
                    +62 858-7142-4750
                  </span>
                </a>

                <a
                  href="mailto:johs9021@gmail.com"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors duration-200 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="text-[11px] text-neutral-400 group-hover:text-neutral-200 transition-colors duration-200">
                    johs9021@gmail.com
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/stevejohanes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors duration-200 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-200"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span className="text-[11px] text-neutral-400 group-hover:text-neutral-200 transition-colors duration-200">
                    linkedin.com/in/stevejohanes
                  </span>
                </a>
              </div>
            </div>

            {/* RIGHT — teks about + SplitText */}
            <div className="col-span-7 flex flex-col gap-8">
              <SplitText
                text="Building digital experiences that matter."
                className="text-4xl font-light text-neutral-100 leading-tight tracking-tight"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
                onLetterAnimationComplete={handleAnimationComplete}
              />

              <SplitText
                text="A final semester Information Technology student at STMIK LIKMI with a passion for learning and personal growth. Possesses strong adaptability, problem solving skills, and the ability to quickly acquire new knowledge. Driven to deliver high quality results, work effectively in diverse environments, and continuously improve through feedback and experience."
                className="text-sm text-neutral-500 leading-relaxed"
                delay={15}
                duration={0.8}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />

              <div className="flex flex-col gap-3 mt-4">
                {/* Programming Languages */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] tracking-[0.14em] uppercase text-neutral-500 font-medium">
                    Programming Languages
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      {
                        label: "PHP",
                        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg",
                      },
                      {
                        label: "JavaScript",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg",
                      },
                      {
                        label: "HTML",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg",
                      },
                      {
                        label: "CSS",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg",
                      },
                      {
                        label: "Java",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
                      },
                      {
                        label: "Dart",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-plain.svg",
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors duration-200"
                      >
                        <img
                          src={s.icon}
                          alt={s.label}
                          className="w-3.5 h-3.5"
                        />
                        <span className="text-[11px] text-neutral-400 whitespace-nowrap">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] tracking-[0.14em] uppercase text-neutral-500 font-medium">
                    Frameworks
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      {
                        label: "Laravel",
                        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg",
                      },
                      {
                        label: "React",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                      },
                      {
                        label: "Next.js",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                      },
                      {
                        label: "Flutter",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors duration-200"
                      >
                        <img
                          src={s.icon}
                          alt={s.label}
                          className="w-3.5 h-3.5"
                        />
                        <span className="text-[11px] text-neutral-400 whitespace-nowrap">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Design Tools */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] tracking-[0.14em] uppercase text-neutral-500 font-medium">
                    Design Tools
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      {
                        label: "Canva",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
                      },
                      {
                        label: "Adobe Photoshop",
                        icon: "https://www.svgrepo.com/show/452149/adobe-photoshop.svg",
                      },
                      {
                        label: "CorelDRAW",
                        icon: "https://cdn.worldvectorlogo.com/logos/coreldraw.svg",
                      },
                      {
                        label: "Adobe Illustrator",
                        icon: "https://www.svgrepo.com/show/452147/adobe-illustrator.svg",
                      },
                      {
                        label: "Adobe Animate",
                        icon: "https://cdn.worldvectorlogo.com/logos/adobe-animate.svg",
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors duration-200"
                      >
                        <img
                          src={s.icon}
                          alt={s.label}
                          className="w-3.5 h-3.5"
                        />
                        <span className="text-[11px] text-neutral-400 whitespace-nowrap">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spoken Languages */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] tracking-[0.14em] uppercase text-neutral-500 font-medium">
                    Spoken Languages
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      { label: "Indonesian" },
                      { label: "English" },
                      { label: "Japanese" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-colors duration-200"
                      >
                        <span className="text-[11px] text-neutral-400 whitespace-nowrap">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        className="relative min-h-screen flex items-center"
      >
        <div className="container mx-auto w-full py-32">
          {/* Project cards */}
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                title: "SuperCart POS System",
                desc: "Mobile POS application for sales and inventory management built with Flutter.",
                stack: ["Flutter", "Dart"],
                year: "2025",
                gif: "/assets/POS.png",
              },
              {
                title: "Tahura App",
                desc: "Mobile guide app for TAHURA nature tourism with gamification features and an integrated online store, built with Flutter.",
                stack: ["Flutter", "Dart"],
                year: "2024",
                gif: "/assets/tahura3.png",
              },
              {
                title: "E-Commerce Platform",
                desc: "Full-stack e-commerce platform with product management, cart, and order system.",
                stack: ["Laravel"],
                year: "2026",
                gif: "/assets/rese.gif",
                demo: "https://resecomputer.davidbeckhamkho.my.id/",
              },
              {
                title: "Zoo Website",
                desc: "Full-stack web application for zoo information",
                stack: ["Laravel"],
                year: "2021",
                gif: "/assets/zoo.jpeg",
              },
              {
                title: "SPP Payment System",
                desc: "School payment management system with role-based access control.",
                stack: ["Laravel"],
                year: "2022",
                gif: "/assets/spp.jpg",
              },
            ].map((project) => (
              <div
                key={project.title}
                className="group flex flex-col rounded-xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-neutral-600 transition-colors duration-300 overflow-hidden"
              >
                <div className="relative w-full h-44 bg-neutral-950 overflow-hidden">
                  <img
                    src={project.gif}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  {/* overlay gradient bawah */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                  {/* year badge */}
                  <span className="absolute top-3 right-3 text-[10px] text-neutral-400 bg-neutral-900/80 border border-neutral-700 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {project.year}
                  </span>
                </div>

                <div className="flex flex-col gap-3 p-5 flex-1">
                  <div className="w-6 h-px bg-neutral-600" />
                  <h3 className="text-base font-light text-neutral-100 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed flex-1">
                    {project.desc}
                  </p>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-800">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] text-neutral-500 tracking-wide px-2 py-0.5 rounded-full border border-neutral-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 border-t border-neutral-800">
                  <a
                    href={project.demo}
                    className="flex items-center gap-1.5 text-[11px] text-neutral-400 hover:text-neutral-100 transition-colors duration-200"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
