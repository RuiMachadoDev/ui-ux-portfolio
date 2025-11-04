import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ME = {
  name: "Rui Machado",
  title: "UI/UX Designer",
  pitch: "Passionate about Web & Mobile design",
  email: "ola@ruimachado.design",
  location: "Portugal",
  about:
    "Hey, I’m Rui, a passionate UI/UX designer based in Porto. With over two years of experience in the web industry. I specialize in creating user-friendly web sites and web products that not only look good but also provide a intuitive user experience and user interface. My journey in design began with a fascination for how things work and a desire to improve the way people interact with technology. Since then, I’ve honed skills in user research, wireframing, prototyping, and visual design, working on projects that challenged and inspired me. I also build simple design systems and component libraries using variables and design tokens, keeping the UI consistent and easy to hand off to developers.",
  photo: "/img/rui-machado.png",
  cvUrl: "/resume/resume.pdf",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rui-machado-0b7903192", key: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/m.a.c.h.a.d.o?igsh=Zmg4ZnQ3a2tmZHc=", key: "instagram" },
    { label: "Behance", href: "https://www.behance.net/RuiMachado_Design", key: "behance" },
  ],
};

const PROJECTS = [
  {
    id: "quinta-menu",
    client: "Hotel Rural Casa de Samaiões (Chaves, Portugal)",
    title: "Online Menu",
    subtitle: "Give customers the possibility of accessing a digital menu",
    role: "UI & UX",
    year: "2023",
    tags: ["Case Study", "Hotel", "Menu", "Figma"],
    href: "/project/quinta-menu",
    images: ["/img/image_1.png", "/img/image_2.png"],
  },
  {
    id: "pizzeria",
    client: "Pizzeria (fictional web project)",
    title: "Pizzeria Website",
    subtitle: "Menu, delivery CTA & reservations — web",
    role: "UI/UX",
    year: "2024",
    tags: ["Case Study", "Web", "Figma"],
    href: "/project/pizzeria",
    images: ["/img/image_10.png"],
  },
  {
    id: "tokens-case-study",
    client: "Design System (variables & tokens)",
    title: "Variables & Tokens — Case Study",
    subtitle: "Card with image, price and CTA — auto light/dark & PT/EN via variables/tokens",
    role: "UI/UX",
    year: "2025",
    tags: ["Case Study", "Design System", "Variables", "Tokens", "Figma"],
    href: "/project/tokens-case-study",
    images: ["/img/image_19.png"],
  },
];

const CAREER = [
  {
    company: "CEiiA",
    role: "UI/UX Designer + Frontend Developer",
    period: "2023—2024",
    notes: [
      "User flows, wireframing, components creation with variables and responsive layouts, frontend implementation (React, Vue, Tailwind)",
    ],
  },
  {
    company: "CEiiA",
    role: "UI/UX Designer + Frontend Developer",
    period: "2024—2025",
    notes: [
      "Design System, components, variables, tokens, wireframing,frontend implementation (React, Vue, Tailwind)",
    ],
  },
  {
    company: "Brightnow",
    role: "UI/UX Designer + Fullstack Developer",
    period: "2025—2026",
    notes: [
      "Design System, components, variables, tokens, wireframing frontend & backend implementation (React, Vue, Tailwind, Node, PHP)",
    ],
  },
];

export default function App() {
  const yearRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (yearRef.current) yearRef.current.textContent = String(new Date().getFullYear());

    // reveal on view
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          if (e.target.classList.contains("stagger")) {
            [...e.target.children].forEach((child, i) => child.style.setProperty("--i", i));
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .stagger").forEach((el) => io.observe(el));

    // smooth anchor scroll
    const click = (e) => {
      const a = e.target.closest("a[href^='#']");
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", click);

    // horizontal scroll
    const track = trackRef.current;
    const getPanels = () => Array.from(track.querySelectorAll(".project-panel"));
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const getActiveIndex = () => {
      const panels = getPanels();
      const left = track.scrollLeft;
      let idx = 0;
      let best = Infinity;
      panels.forEach((p, i) => {
        const d = Math.abs(p.offsetLeft - left);
        if (d < best) { best = d; idx = i; }
      });
      return idx;
    };

    const snapTo = (index) => {
      const panels = getPanels();
      const i = clamp(index, 0, panels.length - 1);
      track.scrollTo({ left: panels[i].offsetLeft, behavior: "smooth" });
    };

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
      clearTimeout(onWheel._t);
      onWheel._t = setTimeout(() => snapTo(getActiveIndex()), 120);
    };

    if (track) {
      track.addEventListener("wheel", onWheel, { passive: false });
    }

    return () => {
      document.removeEventListener("click", click);
      io.disconnect();
      if (track) track.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <>
      <header className="hdr">
        <div className="wrap nav">
          <div className="brand">{ME.name}</div>
          <nav className="menu" aria-label="Primary">
            <a href="#hero">Home</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#cv">CV</a>
          </nav>
        </div>
      </header>

      <section className="section vh" id="hero" data-section>
        <div className="wrap">
          <div className="center">
            <h1 className="hXL reveal">{ME.title}</h1>
            <p className="lead reveal" style={{ transitionDelay: ".08s" }}>{ME.pitch}</p>
            <div className="cta reveal" style={{ transitionDelay: ".16s" }}>
              <a className="btn" href="#projects">See work</a>
              <a className="btn ghost" href="#cv">View CV</a>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS (horizontal scroll) */}
      <section className="section vh alt" id="projects" data-section>
        <div className="wrap" style={{ position: "relative" }}>
          <div className="projects-track" ref={trackRef}>
            {PROJECTS.map((p, i) => (
              <article className="project-panel reveal" key={p.id} style={{ "--i": i }}>
                <div className="pp-left">
                  <div className="pp-client">{p.client}</div>
                  <h3 className="pp-title">{p.title}</h3>
                  <p className="pp-sub">{p.subtitle}</p>
                  <div className="pp-tags">
                    {p.tags.map((t) => (<span className="ptag" key={t}>{t}</span>))}
                  </div>
                  <div className="cta" style={{ marginTop: 12 }}>
                    <Link className="btn solid" to={`/project/${p.id}`}>View project</Link>
                  </div>
                </div>
                <div
                  className="pp-right"
                  style={{ gridTemplateColumns: p.images.length > 1 ? "1fr 1fr" : "1fr" }}
                >
                  {p.images.map((src, idx) => (
                    <div className={`mock${idx === 1 ? " second" : ""}`} key={idx}>
                      <img src={src} alt={`${p.title} mockup ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="p-hint">Swipe or scroll horizontally to browse projects</div>
        </div>
      </section>

      <section className="section vh" id="about" data-section>
        <div className="wrap">
          <h2 className="eyebrow">About</h2>
          <div className="grid-2">
            <div className="reveal" data-reveal="left">
              <h3 className="hL">Who I am</h3>
              <p className="lead">{ME.about}</p>
              <ul className="bullets">
                <li>Clarity and consistency</li>
                <li>Measurable outcomes</li>
                <li>Partnering product × engineering</li>
              </ul>
              <div className="cta about-actions">
                <a className="btn tiny" href={`mailto:${ME.email}`}>Email</a>
                {ME.socials.map((s) => (
                  <a key={s.key} className="btn tiny ghost" href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
                ))}
              </div>
            </div>
            <div className="card reveal portrait-card" data-reveal="right">
              <img className="portrait" src={ME.photo} alt={ME.name} />
            </div>
          </div>
        </div>
      </section>

      <section className="section vh alt" id="cv" data-section>
        <div className="wrap">
          <h2 className="eyebrow">CV</h2>
          <div className="cv-teaser reveal">
            <div className="cv-left">
              {CAREER.map((c, i) => (
                <article key={`${c.company}-${c.period}`} className="cvm-item" style={{ "--i": i }}>
                  <div className="cvm-left">
                    <div className="cvm-dot" aria-hidden="true" />
                    <div className="cvm-line" aria-hidden="true" />
                  </div>
                  <div className="cvm-content">
                    <div className="cvm-when">{c.period}</div>
                    <h3 className="cvm-title">{c.role} · {c.company}</h3>
                    <p className="cvm-note">{c.notes[0]}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="cv-right">
              <div className="cv-card">
                <div className="cvk">Snapshot</div>
                <ul className="cv-list">
                  <li>Component library creation (with variables & tokens)</li>
                  <li>Design System maintenance</li>
                  <li>Design tokens and variables</li>
                  <li>User flows</li>
                  <li>Mockups design</li>
                  <li>Prototype design</li>
                  <li>Documentation</li>
                </ul>
                <div className="stack">
                  <span className="chip">Figma</span>
                  <span className="chip">Miro</span>
                  <span className="chip">Notion</span>
                  <span className="chip">HTML</span>
                  <span className="chip">CSS</span>
                  <span className="chip">JavaScript</span>
                </div>
              </div>
              <div className="cv-card">
                <div className="cvk">Education</div>
                <div className="edu">
                  <div className="edu-line">
                    <span className="edu-title">Bachelor's Degree in Communication and Multimedia</span>
                    <span className="edu-when">2021-2023</span>
                  </div>
                  <div className="edu-note">University of Trás os Montes and Alto Douro</div>
                </div>
              </div>
              <div className="cv-cta">
                <div className="cv-hook">Full story, metrics and references in the PDF.</div>
                <div className="cta">
                  <a className="btn" href={ME.cvUrl} download>Download CV</a>
                  <a className="btn ghost" href={ME.cvUrl} target="_blank" rel="noreferrer">Open CV</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap foot-wrap">
          <div className="foot-role">{ME.title}</div>
          <div className="foot-socials">
            {ME.socials.map((s) => (
              <a
                key={s.key}
                data-key={s.key}
                className={`sicon si-${s.key}`}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">{s.label}</span>
              </a>
            ))}
          </div>
          <div className="foot-brand">© <span ref={yearRef} /> {ME.name}</div>
        </div>
      </footer>
    </>
  );
}
