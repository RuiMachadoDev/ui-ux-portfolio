import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/project-detail.css";

export default function ProjectDetail() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (location.hash) history.replaceState(null, "", location.pathname);

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
  }, [id]);

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

        <section id="overview" className="pd-section">
          <div className="pd-wrap">
            <img className="hero-img" src="/img/image_6.png" alt="Project overview — QR menu hero" />
          </div>
        </section>

        <section id="summary" className="pd-section alt">
          <div className="pd-wrap">
            <div className="pd-eyebrow">Project</div>
            <h1 className="pd-title">QR Digital Menu — Rural Hotel (Chaves, PT)</h1>
            <p className="pd-lead">
              A mobile-friendly digital menu for a luxury rural hotel serving traditional Trás-os-Montes cuisine. 
              Guests scan a QR code at the table, click "Online Menu," and navigate through three clear sections: Starters, Main Courses, and Desserts. 
              The design prioritizes readability, simple and straightforward navigation, and a wealth of photos to provide guests with as much information as possible.
            </p>
            <div className="pd-meta">
              <div><strong>Role</strong><span>UX & UI</span></div>
              <div><strong>Timeline</strong><span>4 weeks · 2023</span></div>
              <div><strong>Tools</strong><span>Figma (components, user flow, wireframes, prototypes)</span></div>
            </div>
          </div>
        </section>

        <section id="flows" className="pd-section">
          <div className="pd-wrap xl">
            <h2>User Flows</h2>

            <div className="pd-split pd-split-flows">
              <div className="pd-split-text">
                <p className="pd-lead">
                  The core flow mirrors the real table experience: scan the QR, land softly, and
                  reach the right dish with zero dead-ends. The diagram captures the exact paths
                  implemented for this menu.
                </p>

                <ul className="pd-list">
                  <li><strong>Entry:</strong> Scan QR → Splash → tap <em>Online Menu</em> → Categories (Starters, Mains, Desserts).</li>
                  <li><strong>Starters / Desserts:</strong> Category details + button to open a full photo gallery of the buffet.</li>
                  <li><strong>Mains:</strong> Category details + three CTAs:
                    <ul className="pd-list">
                      <li>View all <strong>Meat</strong> dishes</li>
                      <li>View all <strong>Fish</strong> dishes</li>
                      <li>Open the <strong>Mains Gallery</strong> (meat & fish)</li>
                    </ul>
                  </li>
                  <li><strong>Dish details:</strong> photo, description, price</li>
                </ul>
              </div>

              <div className="wf-media">
                <img
                  className="wf-img flow"
                  src="/img/image_8.png"
                  alt="User flow diagram — QR → Splash → Menu → Categories → Details"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="wireframes" className="pd-section alt">
          <div className="pd-wrap xl">
            <h2>Wireframes</h2>
            <div className="pd-split pd-split-edge">
              <div className="pd-split-text">
                <p className="pd-lead">
                  Low-fidelity wireframes validate structure and hierarchy across the full journey:
                  Splash → Welcome → Categories → Dish Details (meat/fish) → Buffet galleries (starters & desserts).
                </p>
                <ul className="pd-list">
                  <li>Consistent grid, generous touch targets, predictable placements.</li>
                  <li>Short, easy-to-understand text; clear advance and rewind patterns to avoid dead ends.</li>
                  <li>Image-driven buffet sections, where photography contributes to decision-making.</li>
                </ul>
              </div>
              <div className="wf-media">
                <img className="wf-img big" src="/img/image_7.png" alt="Wireframes — structure across categories and details" />
              </div>
            </div>
          </div>
        </section>

        <section id="prototype" className="pd-section">
          <div className="pd-wrap xl">
            <h2>Prototype</h2>

            <div className="pd-split pd-split-proto">
              <div className="pd-split-text">
                <p className="pd-lead">
                  Figma interactive design and prototype demonstrating the final interface, navigation patterns, 
                  gallery behaviors for buffet sections, and dish detail states.
                </p>

                <ul className="pd-list" style={{ marginTop: 4 }}>
                  <li><strong>Navigation:</strong> QR entry, category hubs, dish details, consistent back stack.</li>
                  <li><strong>Handoff-ready:</strong> components and routing/navigation flows.</li>
                </ul>

                <div className="cta" style={{ marginTop: 10 }}>
                  <a
                    className="btn ghost"
                    href="https://www.figma.com/design/QU8U1JPbF3R3vvY62TxdhB/Mobile-app-design?node-id=0-1&t=Prmb5L4FDHM3Rk0P-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open view-only Figma prototype in a new tab"
                  >
                    View Figma Project
                  </a>
                  <a
                    className="btn"
                    href="https://www.figma.com/proto/QU8U1JPbF3R3vvY62TxdhB/Mobile-app-design?page-id=0%3A1&node-id=303-2&p=f&viewport=479%2C360%2C0.04&t=7DGf2TbboJG7NCBq-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=303%3A2"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open view-only Figma prototype in a new tab"
                  >
                    View Figma Prototype
                  </a>
                </div>
              </div>

              <div className="wf-media">
                <img className="proto-img big" src="/img/image_9.png" alt="Prototype overview board" />
              </div>
            </div>
          </div>
        </section>

        <section id="results" className="pd-section alt">
          <div className="pd-wrap">
            <h2>Results</h2>
            <ul className="pd-list">
              <li><strong>Faster decisions at the table:</strong> guests chose dishes approximately 25% faster thanks to clear categories and high-quality photographs.</li>
              <li><strong>Fewer questions for staff:</strong> dish details and prices were immediately visible, reducing interruptions.</li>
              <li><strong>Operational efficiency:</strong> daily menu updates now take minutes, instead of reprinting menus.</li>
              <li><strong>Premium guest experience:</strong> a sleek, high-contrast user interface aligned with the 4★ hotel brand, readable indoors or outdoors.</li>
              <li><strong>Structured Mains:</strong> dedicated meat/fish lists + a combined gallery improve discovery of traditional dishes.</li>
              <li><strong>Developer handoff:</strong> user flows, wireframes, and prototyping ensured design consistency during implementation.</li>
            </ul>
            <div className="pd-cta" style={{ marginTop: 16 }}>
              <Link
                className="btn"
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/"; 
                }}>← Back to Projects
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
