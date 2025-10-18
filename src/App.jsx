import { useEffect, useRef, useState } from "react";

/* ===== Conteúdo (edita) ===== */
const ME = {
  name: "Rui Machado",
  title: "UI/UX & Product Designer",
  pitch:
    "Desenho produtos claros, consistentes e medíveis. Reduzo interfaces ao essencial — sem perder o que importa ao negócio.",
  email: "ola@ruimachado.design",
  location: "Portugal",
  links: [
    { label: "LinkedIn", href: "#" },
    { label: "Behance", href: "#" },
  ],
  about:
    "Sou designer de produto com experiência em fintech, health e SaaS. Trabalho lado a lado com estratégia e engenharia para transformar requisitos em experiências legíveis, previsíveis e escaláveis.",
};

const PROJECTS = [
  {
    title: "E-commerce B2C — Checkout sem fricção",
    role: "Product Design",
    year: "2025",
    impact: "−31% tempo de entrega · +12% checkouts concluídos",
    href: "#",
    bullets: [
      "Design system (tokens tipográficos, spacing e grelha fluida)",
      "Estados de erro e validação previsíveis",
      "Fluxos encurtados (−4 ecrãs) e micro-copy orientada à ação",
    ],
  },
  {
    title: "Analytics Dashboard — decisão mais rápida",
    role: "UI/UX",
    year: "2024",
    impact: "+22% rapidez de decisão",
    href: "#",
    bullets: [
      "3 métricas essenciais e hierarquia tipográfica",
      "Dark/Light AA e performance otimizada",
      "Guidelines de componentes e estados",
    ],
  },
  {
    title: "Saúde Digital — onboarding claro",
    role: "UX",
    year: "2024",
    impact: "+18% conversão",
    href: "#",
    bullets: [
      "Micro-copy e feedback imediato",
      "Prototipagem hi-fi e testes moderados (5–7 utilizadores)",
      "Ciclos semanais orientados a métricas",
    ],
  },
];

const CAREER = [
  {
    company: "Acme Fintech",
    role: "Product Designer",
    period: "2024—2025",
    notes: [
      "Onboarding +18% conv.",
      "Design System unificado",
      "Testes quinzenais",
    ],
  },
  {
    company: "Healthify",
    role: "UI/UX Designer",
    period: "2022—2024",
    notes: ["Dashboard (3 KPIs)", "Dark/Light AA", "Performance +30%"],
  },
  {
    company: "Studio XYZ",
    role: "Product/Visual",
    period: "2020—2022",
    notes: ["Web minimal", "Guia de marca", "SEO técnico"],
  },
];

/* ===== Processo — Double Diamond, entregáveis e critérios reais ===== */
/* Descobrir, Definir, Desenvolver, Validar (UX) */
const PROCESS_UX = [
  {
    h: "Descobrir (Discovery)",
    p: "Entendo o problema no contexto: objetivos, riscos, utilizadores, tarefas e métricas de sucesso.",
    d: "Brief alinhado · mapa de stakeholders · JTBD · cenários · métricas alvo",
  },
  {
    h: "Pesquisa (Light Research)",
    p: "Entrevistas curtas e análise de dados existentes; mapeio dores, oportunidades e hipóteses.",
    d: "Roteiro · notas codificadas · achados priorizados (ICE) · hipóteses",
  },
  {
    h: "Definir (Problem Framing)",
    p: "Fecho escopo, tarefas críticas e critérios de saída para seguir para design.",
    d: "Tarefas críticas · fluxos AS-IS/TO-BE · critérios de saída · riscos",
  },
  {
    h: "Prototipagem",
    p: "Wireframes → protótipos clicáveis de média/alta fidelidade consoante o risco.",
    d: "Protótipos · spec de interações · microcopy inicial",
  },
  {
    h: "Validar",
    p: "Testes moderados (5–7), tarefas guiadas; recolho taxa de sucesso, tempo, erros e feedback.",
    d: "Roteiro · gravações · relatório com decisões · backlog de iteração",
  },
];

/* UI: Fundamentos → Componentes → Estados → Acessibilidade → Handoff */
const PROCESS_UI = [
  {
    h: "Fundamentos",
    p: "Escala tipográfica modular, grelha fluida e tokens (spacing, raio, sombras).",
    d: "Tokens tipográficos · grid responsivo · kit de espaço",
  },
  {
    h: "Cores & Contraste",
    p: "Paleta P&B + acentos; contraste AA/AAA; modos light/dark consistentes.",
    d: "Escalas de cinza · pares de contraste · tema light/dark",
  },
  {
    h: "Componentes",
    p: "Componentizo padrões (inputs, botões, listas, vazios) com variantes e estados.",
    d: "Biblioteca de componentes · guidelines de uso",
  },
  {
    h: "Estados & Motion",
    p: "Foco, erro e sucesso explícitos; motion 150–250ms para feedback e hierarquia.",
    d: "Tabela de estados · tokens de motion · transições",
  },
  {
    h: "Acessibilidade & Handoff",
    p: "Semântica, navegação por teclado e rótulos; specs e tokens exportáveis.",
    d: "Checklist WCAG 2.1 AA · specs Figma/Inspect · tokens JSON",
  },
];

/* ===== App ===== */
export default function App() {
  const yearRef = useRef(null);
  const tlWrap = useRef(null);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (yearRef.current)
      yearRef.current.textContent = String(new Date().getFullYear());

    // Reveal + Stagger
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          el.classList.add("in");
          if (el.classList.contains("stagger")) {
            [...el.children].forEach((child, i) =>
              child.style.setProperty("--i", i)
            );
          }
        });
      },
      { threshold: 0.15 }
    );
    document
      .querySelectorAll(".reveal, .stagger, .tl, .proc")
      .forEach((el) => io.observe(el));

    // Sticky timeline progress + anos ativos
    const onTL = () => {
      const sec = tlWrap.current;
      if (!sec) return;
      const rail = sec.querySelector(".tl-rail");
      const years = sec.querySelectorAll(".tl-year");

      const r = sec.getBoundingClientRect();
      const total = r.height || 1;
      const visible = Math.min(Math.max(innerHeight - r.top, 0), total);
      const p = Math.max(0, Math.min(1, visible / total)); // 0..1 progresso

      rail.style.setProperty("--tlp", `${Math.round(p * 100)}%`);

      let closestIdx = 0,
        closestDist = 1e9;
      const railRect = rail.getBoundingClientRect();
      years.forEach((y, i) => {
        const pos = parseFloat(y.dataset.pos || "0") / 100; // 0..1
        const top = railRect.top + pos * railRect.height;
        y.style.top = `${top - r.top}px`;
        const d = Math.abs(pos - p);
        if (d < closestDist) {
          closestDist = d;
          closestIdx = i;
        }
      });
      years.forEach((y, i) => y.classList.toggle("active", i === closestIdx));
    };
    addEventListener("scroll", onTL, { passive: true });
    addEventListener("resize", onTL);
    onTL();

    // Scroll-Spy
    const sections = document.querySelectorAll("[data-section]");
    const links = document.querySelectorAll(".menu a");
    const byId = {};
    links.forEach((a) => (byId[a.getAttribute("href")] = a));
    const spy = new IntersectionObserver(
      (ents) => {
        ents.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting) return;
          links.forEach((a) => a.classList.remove("active"));
          byId[`#${target.id}`]?.classList.add("active");
        });
      },
      { rootMargin: `-${76 + 24}px 0px -55% 0px`, threshold: 0.2 }
    );
    sections.forEach((s) => spy.observe(s));

    // Smooth scroll
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

    return () => {
      io.disconnect();
      removeEventListener("scroll", onTL);
      removeEventListener("resize", onTL);
      document.removeEventListener("click", click);
    };
  }, []);

  // envio do formulário (mailto)
  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") || "";
    const email = fd.get("email") || "";
    const subject = encodeURIComponent(`Contacto de ${name}`);
    const body = encodeURIComponent(
      `Nome: ${name}\nEmail: ${email}\n\n${fd.get("message") || ""}`
    );
    const mail = `mailto:${ME.email}?subject=${subject}&body=${body}`;

    setSending(true);
    setTimeout(() => {
      window.location.href = mail;
      setSending(false);
      setMsg("Obrigado! Abri o teu gestor de email com a mensagem preparada.");
      e.currentTarget.reset();
    }, 250);
  }

  return (
    <>
      {/* HEADER */}
      <header className="hdr">
        <div className="wrap nav">
          <div className="brand">{ME.name}</div>
          <nav className="menu" aria-label="Principal">
            <a href="#hero">Início</a>
            <a href="#sobre">Sobre</a>
            <a href="#projetos">Projetos</a>
            <a href="#percurso">Percurso</a>
            <a href="#processo">Processo</a>
            <a href="#ferramentas">Ferramentas</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      {/* HERO (100vh) */}
      <section className="section" id="hero" data-section>
        <div className="wrap">
          <h1 className="hXL reveal">{ME.title}</h1>
          <p className="lead reveal" style={{ transitionDelay: ".08s" }}>
            {ME.pitch}
          </p>
          <div className="cta reveal" style={{ transitionDelay: ".16s" }}>
            <a className="btn" href="#projetos">Ver projetos</a>
            <a className="btn ghost" href="#contacto">Contactar</a>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="section alt" id="sobre" data-section>
        <div className="wrap">
          <h2 className="eyebrow">Sobre mim</h2>
          <div className="grid-2">
            <div className="reveal" data-reveal="left">
              <h3 className="hL">Quem sou</h3>
              <p className="lead">{ME.about}</p>
              <ul className="bullets">
                <li>Força: <strong>clareza + consistência</strong></li>
                <li>Foco: <strong>impacto mensurável</strong></li>
                <li>Colaboração: <strong>produto × engenharia</strong></li>
              </ul>
            </div>
            <div className="card reveal" data-reveal="right">
              <h3 className="hM">O que entrego</h3>
              <ul className="bullets">
                <li>Interfaces legíveis, previsíveis e acessíveis</li>
                <li>Processo visível (decisões, trade-offs, métricas)</li>
                <li>Handoff limpo e design system escalável</li>
              </ul>
              <p className="small" style={{ marginTop: "8px" }}>Disponível · {ME.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section className="section" id="projetos" data-section>
        <div className="wrap">
          <h2 className="eyebrow">Projetos</h2>
          <div className="cards-3 stagger">
            {PROJECTS.map((p, i) => (
              <a key={p.title} className="p-card" href={p.href} target="_blank" rel="noreferrer" style={{ "--i": i }}>
                <div className="p-head">
                  <div className="p-title">{p.title}</div>
                  <div className="meta">{p.role} · {p.year}</div>
                </div>
                <ul className="bullets">{p.bullets.map((b, idx) => (<li key={idx}>{b}</li>))}</ul>
                <div className="impact">{p.impact}</div>
                <div className="go">abrir estudo →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PERCURSO — Timeline */}
      <section className="section alt" id="percurso" data-section ref={tlWrap}>
        <div className="wrap tl-wrap">
          <h2 className="eyebrow">Percurso</h2>

          <div className="tl reveal in">
            <div className="tl-rail" aria-hidden="true"></div>

            <div className="tl-years" aria-hidden="true">
              <div className="tl-year" data-pos="10">2020</div>
              <div className="tl-year" data-pos="45">2022</div>
              <div className="tl-year" data-pos="75">2024</div>
              <div className="tl-year" data-pos="92">2025</div>
            </div>

            {CAREER.map((c, idx) => {
              const side = idx % 2 === 0 ? "tl-left" : "tl-right";
              const dir = idx % 2 === 0 ? "left" : "right";
              return (
                <article key={c.company} className={`tl-item ${side} reveal`} data-reveal={dir}>
                  <span className="dot" aria-hidden="true"></span>
                  <div className="when">{c.period}</div>
                  <h3 className="what">{c.role} · {c.company}</h3>
                  <ul className="notes">{c.notes.map((n, i) => (<li key={i}>{n}</li>))}</ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESSO — UX & UI com animações e “diferenciação” */}
      <section className="section" id="processo" data-section>
        <div className="wrap">
          <h2 className="eyebrow">Processo</h2>

          <div className="proc reveal">
            {/* Coluna UX */}
            <div className="proc-col">
              <div className="proc-head">
                <div className="proc-tag">UX</div>
                <h3 className="hM">Como preparo o trabalho de UX</h3>
                <p className="meta">Double Diamond: descobrir → definir → desenvolver → validar. Critérios de saída claros antes de avançar.</p>
              </div>

              <ol className="steps stagger">
                {PROCESS_UX.map((s, i) => (
                  <li key={i} className="step" style={{"--i":i}}>
                    <div className="badge">{String(i + 1).padStart(2, "0")}</div>
                    <div className="step-body">
                      <div className="step-top">
                        <h4 className="step-title">{s.h}</h4>
                        <div className="pulse" aria-hidden="true" />
                      </div>
                      <p className="step-p">{s.p}</p>
                      <div className="deliver">
                        <span className="chip">Deliverables</span>
                        <span className="small">{s.d}</span>
                      </div>
                      <div className="bar" aria-hidden="true" />
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Coluna UI */}
            <div className="proc-col">
              <div className="proc-head">
                <div className="proc-tag alt">UI</div>
                <h3 className="hM">Como sistematizo a UI após UX</h3>
                <p className="meta">Fundamentos → componentes → estados → acessibilidade → handoff. Escala via tokens e guidelines.</p>
              </div>

              <ol className="steps stagger">
                {PROCESS_UI.map((s, i) => (
                  <li key={i} className="step" style={{"--i":i}}>
                    <div className="badge">{String(i + 1).padStart(2, "0")}</div>
                    <div className="step-body">
                      <div className="step-top">
                        <h4 className="step-title">{s.h}</h4>
                        <div className="stripes-mini" aria-hidden="true">
                          <span /><span /><span /><span />
                        </div>
                      </div>
                      <p className="step-p">{s.p}</p>
                      <div className="deliver">
                        <span className="chip">Deliverables</span>
                        <span className="small">{s.d}</span>
                      </div>
                      <div className="bar" aria-hidden="true" />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* FERRAMENTAS */}
      <section className="section alt" id="ferramentas" data-section>
        <div className="wrap">
          <h2 className="eyebrow">Ferramentas</h2>
          <div className="tools stagger">
            {["Figma", "FigJam", "Framer", "Notion", "Linear", "HTML/CSS/JS"].map(
              (t, i) => (
                <div key={t} className="tool" style={{ "--i": i }}>
                  {t}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* FOOTER — branco, arejado e organizado (3 colunas) */}
      <footer className="section ftr" id="contacto" data-section>
        <div className="wrap">
          <div className="fgrid fgrid-3">
            {/* Coluna 1 — Marca & sumário */}
            <div className="fcol">
              <div className="fbrand">{ME.name}</div>
              <p className="meta">UI/UX & Product · {ME.location}</p>
              <p className="small kicker">
                Disponível para colaboração em produtos digitais focados em clareza,
                consistência e resultados.
              </p>
            </div>

            {/* Coluna 2 — Formulário */}
            <div className="fcol divide">
              <h4>Mensagem</h4>
              <form className="form" onSubmit={onSubmit}>
                <div className="row">
                  <input className="inp" name="name" type="text" placeholder="Nome" required />
                  <input className="inp" name="email" type="email" placeholder="Email" required />
                </div>
                <textarea className="txt" name="message" placeholder="Fala-me do teu projeto..." required />
                <div className="actions">
                  <button className="btn micro" type="submit" disabled={sending}>{sending ? "A preparar…" : "Enviar"}</button>
                  {msg && <span className="meta small">{msg}</span>}
                </div>
              </form>
            </div>

            {/* Coluna 3 — Navegação & Contactos */}
            <div className="fcol divide">
              <div className="fcols">
                <div>
                  <h4>Navegação</h4>
                  <ul className="flist">
                    <li><a className="link" href="#hero">Início</a></li>
                    <li><a className="link" href="#projetos">Projetos</a></li>
                    <li><a className="link" href="#percurso">Percurso</a></li>
                    <li><a className="link" href="#processo">Processo</a></li>
                    <li><a className="link" href="#ferramentas">Ferramentas</a></li>
                  </ul>
                </div>
                <div>
                  <h4>Contactos</h4>
                  <ul className="flist">
                    {ME.links.map((l) => (
                      <li key={l.label}><a className="link" href={l.href} target="_blank" rel="noreferrer">{l.label}</a></li>
                    ))}
                    <li><a className="link" href={`mailto:${ME.email}`}>{ME.email}</a></li>
                  </ul>
                  <div className="contact-row">
                    <a className="btn micro ghost" href={`mailto:${ME.email}?subject=Projeto&body=Olá Rui, ...`}>Enviar email</a>
                    <button className="btn micro ghost" onClick={()=>navigator.clipboard?.writeText(ME.email)}>Copiar email</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="fbar">
            <div>© <span ref={yearRef} /> {ME.name}</div>
            <div className="meta">Disponível · Freelance/Contrato</div>
          </div>
        </div>
      </footer>
    </>
  );
}
