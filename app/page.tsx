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
const RotatingText: any = dynamic(() => import("./component/rotatingtext"), {
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
            { label: "Contact", href: "#contact" },
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

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Laravel",
                    "PHP",
                    "MySQL",
                    "SEO",
                    "JavaScript",
                    "WordPress",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1.5 rounded-md bg-neutral-900/60 backdrop-blur-sm text-neutral-500 border border-neutral-800 tracking-wide"
                    >
                      {skill}
                    </span>
                  ))}
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
            {/* LEFT — ProfileCard */}
            <div className="col-span-5 flex justify-center">
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
            </div>

            {/* RIGHT — teks about + SplitText */}
            <div className="col-span-7 flex flex-col gap-8">
              {/* SplitText heading */}
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

              {/* SplitText deskripsi — font lebih kecil, delay lebih lambat agar tidak bentrok */}
              <SplitText
                text="A final semester Information Technology student at STMIK LIKMI with a passion for 
                learning and personal growth. Possesses strong adaptability, problem solving skills, 
                and the ability to quickly acquire new knowledge. Driven to deliver high quality results, 
                work effectively in diverse environments, and continuously improve through feedback and experience."
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

              {/* Stats */}
              {/* Skill grid — icons per kategori */}
              <div className="flex flex-col gap-4 mt-4">
                {/* Baris 1 — Programming Languages */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-[0.15em] uppercase text-neutral-600 font-medium">
                    Languages
                  </span>
                  <div className="flex gap-3 flex-wrap">
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
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-neutral-600 transition-colors duration-300 w-16"
                      >
                        <img src={s.icon} alt={s.label} className="w-7 h-7" />
                        <span className="text-[10px] text-neutral-500 tracking-wide">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Baris 2 — Frameworks */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-[0.15em] uppercase text-neutral-600 font-medium">
                    Frameworks
                  </span>
                  <div className="flex gap-3 flex-wrap">
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
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-neutral-600 transition-colors duration-300 w-16"
                      >
                        <img src={s.icon} alt={s.label} className="w-7 h-7" />
                        <span className="text-[10px] text-neutral-500 tracking-wide">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Baris 3 — Design Tools */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-[0.15em] uppercase text-neutral-600 font-medium">
                    Design Tools
                  </span>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      {
                        label: "Canva",
                        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
                      },
                      {
                        label: "Photoshop",
                        icon: "https://www.svgrepo.com/show/452149/adobe-photoshop.svg",
                      },
                      {
                        label: "CorelDRAW",
                        icon: "https://cdn.worldvectorlogo.com/logos/coreldraw.svg",
                      },
                      {
                        label: "Illustrator",
                        icon: "https://www.svgrepo.com/show/452147/adobe-illustrator.svg",
                      },
                      {
                        label: "Animate",
                        icon: "https://cdn.worldvectorlogo.com/logos/adobe-animate.svg",
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-neutral-600 transition-colors duration-300 w-16"
                      >
                        <img src={s.icon} alt={s.label} className="w-7 h-7" />
                        <span className="text-[10px] text-neutral-500 tracking-wide text-center">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Baris 4 — Languages Spoken */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-[0.15em] uppercase text-neutral-600 font-medium">
                    Languages
                  </span>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      { label: "Indonesia", flag: "🇮🇩" },
                      { label: "English", flag: "🇬🇧" },
                      { label: "Japanese", flag: "🇯🇵" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-neutral-600 transition-colors duration-300 w-24"
                      >
                        <span className="text-2xl">{s.flag}</span>
                        <span className="text-[10px] text-neutral-500 tracking-wide">
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
          {/* Label section */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-neutral-500 font-medium">
              03 — Projects
            </span>
            <div className="flex-1 h-px bg-neutral-800" />
          </div>

          {/* Project cards */}
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                title: "Zoo Website",
                desc: "Full-stack web application for zoo information and ticketing system.",
                stack: ["Laravel", "MySQL", "Blade"],
              },
              {
                title: "SPP Payment System",
                desc: "School payment management system with role-based access control.",
                stack: ["Laravel", "PHP", "MySQL"],
              },
              {
                title: "E-Commerce Platform",
                desc: "Frontend development for a full-featured online store.",
                stack: ["JavaScript", "CSS", "Laravel"],
              },
            ].map((project) => (
              <div
                key={project.title}
                className="flex flex-col gap-4 p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-neutral-600 transition-colors duration-300"
              >
                <div className="w-8 h-px bg-neutral-600" />
                <h3 className="text-lg font-light text-neutral-100 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed flex-1">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-neutral-600 tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
