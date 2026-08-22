"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const projects = [
  { title: "Currency in Motion", type: "Motion design", file: 1 },
  { title: "Systems, Simplified", type: "Visual explainer", file: 2 },
  { title: "Ideas That Land", type: "Kinetic type", file: 3 },
  { title: "Validated", type: "Social campaign", file: 4 },
  { title: "Product, Reframed", type: "Product reel", file: 5 },
  { title: "History in a Frame", type: "Editorial motion", file: 6 },
  { title: "Inside the Mind", type: "Visual storytelling", file: 7 },
  { title: "Health, Recut", type: "Branded content", file: 8 },
  { title: "Failure / Forward", type: "Short-form story", file: 9 },
];

const tickerItems = [
  "SHORT-FORM",
  "MOTION DESIGN",
  "BRANDED CONTENT",
  "VISUAL STORIES",
];

export default function Home() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const muteAll = useCallback(() => {
    videoRefs.current.forEach((video) => {
      if (video) video.muted = true;
    });
    setActiveIndex(null);
  }, []);

  const toggleAudio = useCallback(
    (index: number) => {
      if (activeIndex === index) {
        muteAll();
        return;
      }

      videoRefs.current.forEach((video, videoIndex) => {
        if (!video) return;
        video.muted = videoIndex !== index;
        if (videoIndex === index) void video.play();
      });
      setActiveIndex(index);
    },
    [activeIndex, muteAll],
  );

  useEffect(() => {
    const handleOutsidePress = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-video-card]")) {
        return;
      }
      muteAll();
    };

    document.addEventListener("pointerdown", handleOutsidePress);
    return () => document.removeEventListener("pointerdown", handleOutsidePress);
  }, [muteAll]);

  const handleHeroPointer = (event: React.PointerEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    hero.style.setProperty("--shift-x", `${x * 22}px`);
    hero.style.setProperty("--shift-y", `${y * 18}px`);
  };

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Machado home">
          MACHADO<span>®</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="availability" href="https://wa.me/message/6SDEI4XK35X5H1" target="_blank" rel="noreferrer">
          <i /> Available for projects
        </a>
      </header>

      <section
        ref={heroRef}
        onPointerMove={handleHeroPointer}
        id="top"
        className="hero"
      >
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">Video editor · Brasília / Worldwide</p>
          <h1>
            Stories,
            <span>
              cut with
              <br />
              intent.
            </span>
          </h1>
          <p className="hero-intro">
            Turning raw footage into sharp, rhythmic and visually unforgettable
            stories.
          </p>
          <a className="primary-cta" href="#work">
            <span>Play the work</span>
            <b aria-hidden="true">↘</b>
          </a>
        </div>

        <div className="hero-portrait" aria-hidden="true">
          <div className="portrait-orbit">09 SELECTED CUTS · SOUND ON CLICK ·</div>
          <img src="/media/lucas-hero.png" alt="" />
        </div>

        <div className="hero-index" aria-hidden="true">
          <span>2026</span>
          <span>PORTFOLIO / 01</span>
        </div>
      </section>

      <div className="ticker" aria-label="Editing services">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-group" aria-hidden="true" key={copy}>
              {Array.from({ length: 5 }).map((_, cycle) =>
                tickerItems.map((item) => (
                  <span className="ticker-item" key={`${copy}-${cycle}-${item}`}>
                    <b>{item}</b><i>✦</i>
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
      </div>

      <section id="about" className="about section-shell">
        <div className="section-number">01 / ABOUT</div>
        <div className="about-statement">
          <p>THE EDIT ISN&apos;T THE LAST STEP.</p>
          <h2>It&apos;s where the story finally becomes clear.</h2>
        </div>

        <div className="about-grid">
          <div className="about-copy">
            <p className="lead">
              I&apos;m Lucas Machado, a video editor focused on rhythm, emotion
              and clean visual communication.
            </p>
            <p>
              I turn raw footage into engaging, dynamic work with purpose. From
              the first cut to final delivery, every choice is made to hold
              attention and make the message land.
            </p>
            <div className="services">
              <span>01 / REELS</span>
              <span>02 / MOTION</span>
              <span>03 / STORYTELLING</span>
            </div>
          </div>

          <div className="about-visuals">
            <figure className="portrait-card portrait-card-main">
              <img src="/media/lucas-editing.webp" alt="Lucas editing at his desk" />
              <figcaption>LUCAS MACHADO / VIDEO EDITOR</figcaption>
            </figure>
            <figure className="portrait-card portrait-card-small" aria-hidden="true">
              <img src="/media/lucas-studio.webp" alt="" />
            </figure>
            <span className="vertical-type" aria-hidden="true">FRAME BY FRAME</span>
          </div>
        </div>
      </section>

      <section id="work" className="work section-shell">
        <div className="work-heading">
          <div className="section-number">02 / SELECTED WORK</div>
          <h2>Motion that earns attention.</h2>
          <p>All films are playing. Click one to bring its sound forward.</p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <article
              className={activeIndex === index ? "portfolio-card is-active" : "portfolio-card"}
              data-video-card
              key={project.file}
              onClick={() => toggleAudio(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggleAudio(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={activeIndex === index}
              aria-label={`${activeIndex === index ? "Mute" : "Hear"} ${project.title}`}
            >
              <div className="project-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{project.type}</span>
              </div>
              <div className="video-shell">
                <video
                  ref={(node) => { videoRefs.current[index] = node; }}
                  autoPlay
                  loop
                  muted={activeIndex !== index}
                  playsInline
                  preload="metadata"
                  poster={`/posters/reel-${project.file}.webp`}
                >
                  <source src={`/media/reel-${project.file}.mp4`} type="video/mp4" />
                </video>
                <span className="sound-toggle">
                  {activeIndex === index ? "SOUND ON" : "HEAR IT"}
                </span>
              </div>
              <h3>{project.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-topline">
          <span>03 / CONTACT</span>
          <span>OPEN FOR SELECT PROJECTS — 2026</span>
        </div>

        <div className="contact-title">
          <span>LET&apos;S CUT</span>
          <span>SOMETHING</span>
          <span>GREAT.</span>
        </div>

        <div className="contact-grid">
          <p>
            Have footage, an idea or a story that needs shape? Send the brief.
            Let&apos;s make every frame earn its place.
          </p>

          <a
            className="contact-orbit"
            href="https://wa.me/message/6SDEI4XK35X5H1"
            target="_blank"
            rel="noreferrer"
          >
            <span>START A PROJECT</span>
            <b aria-hidden="true">↗</b>
          </a>

          <div className="contact-links">
            <a href="mailto:editor.de.videos.18@gmail.com">
              <small>EMAIL</small>
              <span>editor.de.videos.18@gmail.com ↗</span>
            </a>
            <a href="tel:+5561998444096">
              <small>PHONE / WHATSAPP</small>
              <span>+55 (61) 9 9844-4096 ↗</span>
            </a>
            <a
              href="https://www.instagram.com/machad0_18?igsh=MWhtN2dxcWd0dmx5eQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
            >
              <small>INSTAGRAM</small>
              <span>@machad0_18 ↗</span>
            </a>
          </div>
        </div>

        <footer className="final-footer">
          <span>© 2026 MACHADO — ALL RIGHTS RESERVED</span>
          <a href="#top">BACK TO TOP ↑</a>
          <a
            href="https://www.instagram.com/edson_webdev/"
            target="_blank"
            rel="noreferrer"
          >
            DEVELOPED BY EDSONDEV
          </a>
        </footer>
      </section>

      <div className={activeIndex === null ? "sound-status" : "sound-status is-live"}>
        <i /> {activeIndex === null ? "ALL MUTED" : `PLAYING 0${activeIndex + 1}`}
      </div>
    </main>
  );
}
