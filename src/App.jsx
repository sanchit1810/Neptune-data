import ContactForm from "./ContactForm.jsx";
import { categoryContent } from "./content.jsx";
import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";

const email = "sanchit@neptunedata.ai";
const mail = (subject) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}`;
const Arrow = () => <span aria-hidden="true">↗</span>;
function Brand() {
  return (
    <a className="brand" href="/" aria-label="Neptune Data home">
      <img src="/brand-mark.svg" alt="" width="32" height="32" />
      <span>Neptune Data</span>
    </a>
  );
}
function Header({ path }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="header">
      <div className="nav-wrap">
        <Brand />
        <button
          className="menu-button"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="main-nav"
          aria-label="Main navigation"
          className={open ? "is-open" : ""}
        >
          <a
            href="/customer-service/"
            aria-current={path === "/customer-service" ? "page" : undefined}
          >
            Customer service
          </a>
          <a
            href="/healthcare/"
            aria-current={path === "/healthcare" ? "page" : undefined}
          >
            Healthcare
          </a>
          <a href="/#approach" onClick={() => setOpen(false)}>
            Our approach
          </a>
          <a
            href={
              path === "/" ||
              path === "/customer-service" ||
              path === "/healthcare"
                ? "#contact"
                : "/#contact"
            }
            className="nav-contact"
            onClick={() => setOpen(false)}
          >
            Get in touch <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}
function Hero() {
  return (
    <>
      <section className="hero wrap">
        <div className="eyebrow">
          <span className="short-rule" />
          Proprietary data for AI
        </div>
        <div className="hero-grid">
          <h1>
            Real-world data.
            <br />
            <span>For what comes next.</span>
          </h1>
          <div className="hero-aside">
            <p>
              Better models need the context public datasets leave out. Neptune
              Data works with institutions to source and license data for AI
              training and evaluation.
            </p>
            <a className="text-link" href="#focus">
              Explore our focus <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>
      <div className="hero-art wrap">
        <img
          src="/data-layers.webp"
          alt="Sculptural layers of blue optical glass, a study in the depth and structure of data"
          fetchPriority="high"
          width="1536"
          height="1024"
        />
        <div className="art-copy">
          <span className="eyebrow">Depth matters.</span>
          <p>
            The record.
            <br />
            The context.
            <br />
            The permission.
          </p>
        </div>
        <div className="art-caption">
          <span>From institutional records to model-ready data</span>
          <span>Neptune Data / 01</span>
        </div>
      </div>
    </>
  );
}
function Footer() {
  return (
    <footer className="footer wrap">
      <Brand />
      <p>© {new Date().getFullYear()} Neptune Data</p>
      <a href={`mailto:${email}`}>
        Email us <Arrow />
      </a>
    </footer>
  );
}
const focusAreas = [
  {
    id: "01",
    label: "Customer service",
    path: "/customer-service/",
    title: "The conversation.\nAnd what happened next.",
    body: "Customer-service speech, linked context, and outcomes for voice and conversational AI.",
    tags: ["Speech", "Conversation", "Outcomes"],
    kind: "voice",
  },
  {
    id: "02",
    label: "Healthcare",
    path: "/healthcare/",
    title: "The clinical record.\nWith its context intact.",
    body: "Specialist clinical data for training and evaluating AI in the settings where it will be used.",
    tags: ["Clinical records", "Imaging", "Expert review"],
    kind: "clinical",
  },
];
function Signal({ compact = false }) {
  const bars = Array.from({ length: 84 }, (_, i) =>
    Math.round(5 + Math.abs(Math.sin(i * 0.79) * Math.cos(i * 0.21)) * 54),
  );
  return (
    <div
      className={`signal ${compact ? "compact" : ""}`}
      aria-label="Illustrative conversation structure"
    >
      <div className="signal-label">
        <span>Conversation structure</span>
        <span>Illustrative</span>
      </div>
      <div className="signal-track">
        <span className="track-label">Speaker A</span>
        <svg
          viewBox="0 0 520 90"
          role="img"
          aria-label="Schematic speech waveform for the first speaker"
        >
          {bars.map((h, i) => (
            <line
              key={i}
              x1={i * 6 + 8}
              x2={i * 6 + 8}
              y1={45 - h / 2}
              y2={45 + h / 2}
              stroke="currentColor"
              strokeWidth="2"
              opacity={i > 36 && i < 51 ? 0.17 : 1}
            />
          ))}
        </svg>
      </div>
      <div className="signal-track second">
        <span className="track-label">Speaker B</span>
        <svg
          viewBox="0 0 520 90"
          role="img"
          aria-label="Schematic speech waveform for the second speaker"
        >
          {bars.map((h, i) => (
            <line
              key={i}
              x1={i * 6 + 8}
              x2={i * 6 + 8}
              y1={45 - h * 0.38}
              y2={45 + h * 0.38}
              stroke="currentColor"
              strokeWidth="2"
              opacity={i < 32 || i > 60 ? 0.2 : 1}
            />
          ))}
        </svg>
      </div>
      <div className="signal-axis">
        <span>Intent</span>
        <span>Interaction</span>
        <span>Resolution</span>
      </div>
    </div>
  );
}
function ClinicalDiagram({ compact = false }) {
  return (
    <div
      className={`clinical-diagram ${compact ? "compact" : ""}`}
      aria-label="Illustrative clinical data structure"
    >
      <div className="signal-label">
        <span>Clinical context</span>
        <span>Illustrative</span>
      </div>
      <div className="record-line">
        <span className="record-index">01</span>
        <strong>Source record</strong>
        <span>Images · reports</span>
      </div>
      <div className="record-line">
        <span className="record-index">02</span>
        <strong>Expert judgement</strong>
        <span>Annotations · edits</span>
      </div>
      <div className="record-line">
        <span className="record-index">03</span>
        <strong>Linked context</strong>
        <span>Timepoints · outcomes</span>
      </div>
      <div className="clinical-caption">
        The value is in the relationship between records.
      </div>
    </div>
  );
}
function Focus() {
  return (
    <section id="focus" className="section wrap">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Our focus</p>
          <h2>
            Two domains.
            <br />A deeper view of data.
          </h2>
        </div>
        <p>
          We focus on records created through real interactions and specialist
          work, where context matters as much as the record itself.
        </p>
      </div>
      <div className="focus-grid">
        {focusAreas.map((f) => (
          <a className="focus-card" href={f.path} key={f.id}>
            <div className="focus-top">
              <span className="eyebrow">
                {f.id} / {f.label}
              </span>
              <span className="circle-arrow">
                <Arrow />
              </span>
            </div>
            {f.kind === "voice" ? (
              <Signal compact />
            ) : (
              <ClinicalDiagram compact />
            )}
            <h3>
              {f.title.split("\n").map((s, i) => (
                <span key={i}>
                  {s}
                  <br />
                </span>
              ))}
            </h3>
            <p>{f.body}</p>
            <div className="tags">
              {f.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <span className="card-link">
              Explore {f.label.toLowerCase()} <Arrow />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
const steps = [
  [
    "Define the learning need",
    "Start with the model task, the missing records, and how you will judge whether the data is useful.",
  ],
  [
    "Assess the source",
    "Examine provenance, coverage, linked context, preparation needs, and the authority to permit the intended use.",
  ],
  [
    "Evaluate a scoped sample",
    "Agree a sample and review criteria with the relevant parties before committing to a broader dataset.",
  ],
  [
    "Structure licensed access",
    "Define permitted uses, delivery, access restrictions, and commercial terms around the agreed scope.",
  ],
];
function Approach() {
  return (
    <section id="approach" className="approach">
      <div className="wrap approach-grid">
        <div className="approach-intro">
          <p className="eyebrow">How we work</p>
          <h2>
            Useful data starts
            <br />
            with the right
            <br />
            questions.
          </h2>
          <p>
            From a learning requirement to an access decision. Each engagement
            is shaped by the source and the intended use.
          </p>
        </div>
        <ol className="steps">
          {steps.map(([title, body], i) => (
            <li key={title}>
              <span className="step-num">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
function Partners() {
  return (
    <section id="who-we-serve" className="partners section wrap">
      <div>
        <p className="eyebrow">For data partners</p>
        <h2>
          The data stays yours.
          <br />
          The terms start with you.
        </h2>
      </div>
      <div className="partner-body">
        <p>
          Research records, customer interactions, and institutional archives
          can support new AI use cases. A partnership starts by establishing
          what can be considered for licensing and who can authorise it.
        </p>
        <ul>
          <li>Which records and uses are in scope</li>
          <li>Who can receive or access the data</li>
          <li>What approvals and preparation are required</li>
        </ul>
        <a className="text-link" href={mail("Explore a data partnership")}>
          Discuss a data partnership <Arrow />
        </a>
      </div>
    </section>
  );
}
function Contact({ kind = "general" }) {
  const voice = kind === "voice",
    clinical = kind === "clinical";
  return (
    <section className="contact wrap" id="contact">
      <div>
        <p className="eyebrow">Start a conversation</p>
        <h2>
          {voice
            ? "What does your voice model need to hear?"
            : clinical
              ? "What does your clinical model need to learn?"
              : "What is missing from your training data?"}
        </h2>
        <p>
          {voice
            ? "Tell us about your task, the conversations you need, and how you will evaluate fit."
            : clinical
              ? "Tell us about your research task, the records you need, and the clinical context that matters."
              : "Tell us what your model needs to learn, or what data your organisation holds."}
        </p>
      </div>
      <ContactForm kind={kind} />
    </section>
  );
}

function Category({ data }) {
  return (
    <>
      <section className="category-hero wrap">
        <a href="/" className="back-link">
          ← Back to overview
        </a>
        <p className="eyebrow">{data.eyebrow}</p>
        <div className="hero-grid">
          <h1>{data.title}</h1>
          <div className="hero-aside">
            <p>{data.intro}</p>
            <a className="text-link" href="#contact">
              Discuss your requirement <Arrow />
            </a>
          </div>
        </div>
      </section>
      <section className={`category-feature ${data.kind}`}>
        <div className="wrap feature-grid">
          <div>
            <p className="eyebrow">The data in context</p>
            <h2>{data.lead}</h2>
            <p>{data.explanation}</p>
          </div>
          <div className="diagram-frame">
            {data.kind === "voice" ? <Signal /> : <ClinicalDiagram />}
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <h2>
            {data.sectionTitle.split("\n").map((s, i) => (
              <span key={i}>
                {s}
                <br />
              </span>
            ))}
          </h2>
          <p>
            Examples of data requirements we can scope with you. The final
            specification follows source and permissions review.
          </p>
        </div>
        <div className="requirements">
          {data.groups.map(([title, body, tags], i) => (
            <article key={title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <span className="requirement-tags">{tags}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="brief-section">
        <div className="wrap brief-grid">
          <div>
            <p className="eyebrow">
              {data.kind === "voice"
                ? "Scoping a dataset"
                : "An area of exploration"}
            </p>
            <h2>{data.briefTitle}</h2>
            <p className="brief-note">{data.note}</p>
          </div>
          <dl>
            {data.brief.map(([term, desc], i) => (
              <div key={term}>
                <dt>
                  <span>0{i + 1}</span>
                  {term}
                </dt>
                <dd>{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="section wrap faq">
        <div>
          <p className="eyebrow">Before we begin</p>
          <h2>
            A few useful
            <br />
            questions.
          </h2>
        </div>
        <div>
          {data.faq.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="category-partner wrap">
        <div>
          <p className="eyebrow">For institutions & data holders</p>
          <h3>
            {data.kind === "voice"
              ? "Work with customer-service records?"
              : "Hold specialist clinical records?"}
          </h3>
          <p>
            Start with a description of the records and who has authority to
            approve their use.
          </p>
        </div>
        <a
          className="text-link"
          href={mail(
            data.kind === "voice"
              ? "Customer-service data partnership"
              : "Healthcare data partnership",
          )}
        >
          Explore a partnership <Arrow />
        </a>
      </section>
      <Contact kind={data.kind} />
    </>
  );
}

function Missing() {
  return (
    <section className="section wrap missing">
      <p className="eyebrow">Page not found</p>
      <h1>
        Let’s get you
        <br />
        back to the data.
      </h1>
      <a className="text-link" href="/">
        Return to the overview <Arrow />
      </a>
    </section>
  );
}

export default function App({
  path = typeof window === "undefined" ? "/" : window.location.pathname,
}) {
  const normalized = path.replace(/\/$/, "") || "/";
  const data = categoryContent[normalized];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header path={normalized} />
      <main id="main">
        {data ? (
          <Category data={data} />
        ) : normalized === "/" ? (
          <>
            <Hero />
            <div id="what-we-do">
              <Focus />
            </div>
            <Approach />
            <Partners />
            <Contact />
          </>
        ) : (
          <Missing />
        )}
      </main>
      <Footer />
    </>
  );
}
