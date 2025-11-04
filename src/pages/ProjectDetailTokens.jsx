import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/project-detail-tokens.css";

export default function ProjectDetailTokens() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (window.location.hash) window.history.replaceState(null, "", window.location.pathname);

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

    const links = Array.from(document.querySelectorAll(".side-nav a"));
    links.forEach((l) => l.classList.remove("active"));
    document.querySelector('.side-nav a[href="#overview"]')?.classList.add("active");

    const byId = Object.fromEntries(
      links.map((l) => [l.getAttribute("href").slice(1), l])
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const sec = en.target.id;
            links.forEach((l) => l.classList.remove("active"));
            byId[sec]?.classList.add("active");
          }
        });
      },
      { threshold: 0.6 }
    );

    document.querySelectorAll(".pd-section").forEach((s) => io.observe(s));

    return () => {
      document.removeEventListener("click", click);
      io.disconnect();
    };
  }, []);

  return (
    <div className="project-detail">
      <aside className="side-nav">
        <nav>
          <a href="#overview" className="active">Overview</a>
          <a href="#summary">Summary</a>
          <a href="#flows">How It Works</a>
          <a href="#tokens">Variables &Tokens</a>
          <a href="#interactive">Interactive</a>
          <a href="#results">Results</a>
        </nav>
      </aside>

      <main className="pd-content">

        {/* OVERVIEW */}
        <section id="overview" className="pd-section">
          <div className="pd-wrap xl">
            <img
              className="hero-img"
              src="/img/image_17.png"
              alt="Design tokens — multi-theme and multi-language card overview"
            />
          </div>
        </section>

        {/* SUMMARY */}
        <section id="summary" className="pd-section alt">
          <div className="pd-wrap">
            <div className="pd-eyebrow">Case Study</div>

            <h1 className="pd-title">
              Design Tokens & Variables — Multi-Theme / Multi-Language Product Card
            </h1>

            <p className="pd-lead">
              This case study shows how a single product card can behave like a 
              <strong> mini design system</strong>. Through the use of 
              <strong> Figma Variables</strong> and <strong> semantic design tokens</strong>, 
              the card automatically adapts to <strong>light/dark themes</strong> and switches 
              between <strong>Portuguese and English</strong> — all without duplicating the component 
              or editing overrides. Dragging the same instance between frames applies a full, token-driven restyle.
            </p>

            <div className="pd-meta">
              <div><strong>Role</strong><span>UI & UX</span></div>
              <div><strong>Timeline</strong><span>2025</span></div>
              <div><strong>Tools</strong><span>Figma (variables, tokens, components)</span></div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="flows" className="pd-section">
          <div className="pd-wrap xl">
            <h2>How It Works</h2>

            <div className="pd-split pd-split-flows">
              <div className="pd-split-text">
                <p className="pd-lead">
                  The objective was to design a component capable of adapting itself automatically,
                  behaving like a small, scalable design system. A single card updates according to
                  the frame it is placed in:
                </p>

                <ul className="pd-list">
                  <li><strong>Palette switching:</strong> Light/Dark via color tokens.</li>
                  <li><strong>Language switching:</strong> EN ↔ PT via string variables.</li>
                  <li><strong>Adaptive layout:</strong> Auto Layout + responsive constraints.</li>
                  <li><strong>Token-driven:</strong> no raw values — everything uses semantic tokens.</li>
                </ul>
              </div>

              <div className="wf-media">
                <img
                  className="wf-img flow"
                  src="/img/image_18.png"
                  alt="Diagram showing theme and language switching"
                />
              </div>
            </div>
          </div>
        </section>

        {/* TOKENS */}
        <section id="tokens" className="pd-section alt">
            <div className="pd-wrap xl">
                <h2>Variables & Tokens</h2>

                {/* Palettes section — LEFT text / RIGHT image */}
                <div className="pd-split pd-split-edge">
                <div className="pd-split-text">
                    <p className="pd-lead">
                    The color system is built using three foundations — <strong>Blue</strong>,
                    <strong> Gray</strong>, and <strong>Base</strong>.  
                    These palettes feed directly into semantic tokens such as 
                    <em> surface-primary</em>, <em> text-primary</em>, and <em> button-background-primary</em>.  
                    Every UI element in the card references these semantic tokens instead of raw hex values.
                    </p>

                    <ul className="pd-list">
                    <li>Blue scale (50 → 950) for brand + CTA</li>
                    <li>Gray scale (50 → 950) for backgrounds, borders, text</li>
                    <li>Base colors → White / Black foundations</li>
                    <li>All values mapped into semantic roles</li>
                    </ul>
                </div>

                <div className="wf-media">
                    <img
                    className="wf-img big"
                    src="/img/image_16.png"
                    alt="Complete color palettes: Blue, Gray and Base"
                    />
                </div>
                </div>

                {/* Token Table — LEFT text / RIGHT image */}
                <div className="pd-split pd-split-edge" style={{ marginTop: "42px" }}>
                <div className="pd-split-text">
                    <h3 style={{ marginBottom: "12px" }}>Token Structure Overview</h3>

                    <p className="pd-lead" style={{ marginBottom: "18px" }}>
                    This table shows the actual token architecture inside Figma:  
                    semantic color roles linked to Light and Dark modes, and a unified spacing + radius scale.  
                    The component uses these roles exclusively — no manual color overrides.
                    </p>

                    <ul className="pd-list">
                    <li>Semantic tokens for light/dark themes</li>
                    <li>Spacing scale (none → xl) for padding and gaps</li>
                    <li>Radius tokens for consistent corner rounding</li>
                    <li>Fully token-driven structure (no raw hex or px)</li>
                    </ul>
                </div>

                <div className="wf-media">
                    <img
                    className="wf-img big"
                    src="/img/image_15.png"
                    alt="Figma variables table showing semantic tokens and spacing system"
                    />
                </div>
                </div>

            </div>
        </section>

        {/* INTERACTIVE COMPONENT */}
        <section id="interactive" className="pd-section">
          <div className="pd-wrap xl">
            <h2>Interactive Component</h2>

            <div className="pd-split pd-split-proto">
              <div className="pd-split-text">
                <p className="pd-lead">
                  This is not a click-through prototype.  
                  It’s an <strong>interactive variables-driven component</strong>.  
                  Dragging the same instance between frames triggers:
                </p>

                <ul className="pd-list">
                  <li>Theme swap (Light ↔ Dark)</li>
                  <li>Language swap (PT ↔ EN)</li>
                  <li>CTA/background/text recoloring via tokens</li>
                  <li>Layout and spacing adaptation</li>
                </ul>

                <div className="cta" style={{ marginTop: 10 }}>
                    <a
                        className="btn"
                        href="https://www.figma.com/design/stHVEIW4vriCYePZZpWexM/Variables---Tokens--case-study-?node-id=23-2&t=qTxq30s6pewPZ8Gw-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Show project on Figma →
                    </a>
                </div>
              </div>
              <div className="wf-media">
                <video
                    className="proto-img big"
                    src="/video/prototype.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
              </div>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="pd-section alt">
          <div className="pd-wrap">
            <h2>Results</h2>

            <ul className="pd-list">
              <li>One component → multiple themes and languages</li>
              <li>Zero duplicated components or overrides</li>
              <li>Single-source-of-truth through semantic tokens</li>
              <li>Scalable for full design system usage</li>
              <li>Predictable, developer-friendly structure</li>
            </ul>

            <div className="pd-cta">
              <Link
                className="btn"
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/";
                }}
              >
                ← Back to Projects
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
