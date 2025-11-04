import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/project-detail-pizzeria.css";

export default function ProjectDetailPizzeria() {
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

    const byId = Object.fromEntries(links.map((l) => [l.getAttribute("href").slice(1), l]));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const secId = en.target.id;
            links.forEach((l) => l.classList.remove("active"));
            byId[secId]?.classList.add("active");
          }
        });
      },
      { threshold: 0.6, rootMargin: "0px 0px -10% 0px" }
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
        <nav aria-label="On-page sections">
          <a href="#overview" className="active">Overview</a>
          <a href="#summary">Summary</a>
          <a href="#flows">User Flows</a>
          <a href="#wireframes">Wireframes</a>
          <a href="#prototype">Prototype</a>
          <a href="#results">Results</a>
        </nav>
      </aside>

      <main className="pd-content">
        {/* OVERVIEW */}
        <section id="overview" className="pd-section">
          <div className="pd-wrap xl">
            <img
              className="hero-img"
              src="/img/image_10.png"
              alt="Pasta & Noodles landing page — overview hero"
            />
          </div>
        </section>

        {/* SUMMARY */}
        <section id="summary" className="pd-section alt">
          <div className="pd-wrap">
            <div className="pd-eyebrow">Project (Fictional)</div>
            <h1 className="pd-title">Pasta & Noodles — Marketing Website (Figma)</h1>
            <p className="pd-lead">
              A fictional landing page for a pasta/noodles shop. The focus is a clear homepage,
              visual menu, prominent delivery/call CTAs, and a simple contact/reservation option.
              Designed in Figma using simple components for consistency and smooth developer handoff.
            </p>
            <div className="pd-meta">
              <div><strong>Role</strong><span>UX & UI</span></div>
              <div><strong>Timeline</strong><span>2024</span></div>
              <div><strong>Tools</strong><span>Figma (components, colors, user flow, wireframe, mockup/prototype)</span></div>
            </div>
          </div>
        </section>

        {/* FLOWS */}
        <section id="flows" className="pd-section">
          <div className="pd-wrap xl">
            <h2>User Flows</h2>
            <div className="pd-split pd-split-flows">
              <div className="pd-split-text">
                <p className="pd-lead">
                  Core flows are optimized to quickly discover the menu and trigger the right action
                  (contact/place an order).
                </p>
                <ul className="pd-list">
                  <li><strong>Entry:</strong> Home → Menu (pastas).</li>
                  <li><strong>Quick CTAs:</strong> “Call to order”, “Contact”.</li>
                  <li><strong>Product:</strong> Menu with all products, price.</li>
                  <li><strong>Reservation/Contact:</strong> Home → Contact → submit.</li>
                </ul>
              </div>
              <div className="wf-media">
                {/* TROCA: pizza-flow.png -> image_14.png */}
                <img
                  className="wf-img flow"
                  src="/img/image_14.png"
                  alt="User flow — pasta & noodles website"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WIREFRAMES */}
        <section id="wireframes" className="pd-section alt">
          <div className="pd-wrap xl">
            <h2>Wireframes</h2>
            <div className="pd-split pd-split-edge">
              <div className="pd-split-text">
                <p className="pd-lead">
                  Low-fi wireframes to validate hierarchy, product cards, social proof (reviews) and
                  simple flows for ordering/calling/booking.
                </p>
                <ul className="pd-list">
                  <li>Light header with navigation: Home, Pastas, About, Contact.</li>
                  <li>Product cards with pricing and variations.</li>
                  <li>“Special offers” and “Top noodles & pastas” highlighted on the homepage.</li>
                </ul>
              </div>
              <div className="wf-media">
                <img
                  className="wf-img big"
                  src="/img/image_12.png"
                  alt="Additional wireframe — pasta & noodles website"
                  style={{ width:"60%" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* PROTOTYPE */}
        <section id="prototype" className="pd-section">
          <div className="pd-wrap xl">
            <h2>Prototype</h2>
            <div className="pd-split pd-split-proto">
              <div className="pd-split-text">
                <p className="pd-lead">
                  Desktop and mobile navigation with emphasis on CTAs (delivery/contact) and the
                  “choose your pasta” flow.
                </p>
                <ul className="pd-list" style={{ marginTop: 4 }}>
                  <li><strong>Navigation:</strong> Home → Pastas → Product → Action (order/call/contact).</li>
                  <li><strong>Handoff:</strong> components + variables + tokens prepared.</li>
                </ul>
                <div className="cta" style={{ marginTop: 10 }}>
                  <a
                    className="btn ghost"
                    href="https://www.figma.com/design/kENDAjOg5TAJhxqknJDtZG/Web-app-design?node-id=0-1&t=WxYfEmQ5Iu4vN8kk-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Figma project in a new tab"
                  >
                    View Figma Project
                  </a>
                  <a
                    className="btn"
                    href="https://www.figma.com/proto/kENDAjOg5TAJhxqknJDtZG/Web-app-design?page-id=0%3A1&node-id=27-301&p=f&viewport=556%2C489%2C0.04&t=cbklJ6zw10TjBgp3-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=27%3A301"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Figma prototype in a new tab"
                  >
                    View Figma Prototype
                  </a>
                </div>
              </div>

              <div className="wf-media">
                <img
                  className="prototype-img"
                  src="/img/image_13.png"
                  alt="Additional prototype screen — pasta & noodles website"
                  style={{ marginTop: "16px" }}
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
              <li>Faster discovery of specials and best-sellers.</li>
              <li>Clear CTAs (order/call/contact) across key sections.</li>
              <li>Solid base to evolve seasonal promos, reviews and content.</li>
            </ul>
            <div className="pd-cta" style={{ marginTop: 16 }}>
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
