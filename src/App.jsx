import './index.css'
import './App.css'

const NAV_LINKS = [
  { label: 'What we do', href: '#what-we-do' },
  { label: 'Who we serve', href: '#who-we-serve' },
  { label: 'Contact', href: '#contact' },
]

const PROBLEMS = [
  {
    id: '01',
    title: 'Data is locked away',
    body: 'Governments and enterprises hold valuable datasets — health records, logistics data, geospatial feeds — but lack the legal, technical, and commercial infrastructure to make them accessible.',
  },
  {
    id: '02',
    title: 'AI labs need fuel',
    body: 'Foundation model teams and AI researchers need domain-specific, high-quality data to build capable systems. Sourcing it ethically, legally, and at scale is one of their hardest problems.',
  },
  {
    id: '03',
    title: 'The gap has no neutral bridge',
    body: 'Bilateral deals are slow, opaque, and rarely structured for reuse. There is no independent intermediary that both sides trust to facilitate access fairly.',
  },
]

const AUDIENCES = [
  {
    tag: 'For data holders',
    title: 'Monetize your data. Maintain control.',
    points: [
      'Structured licensing frameworks you retain full approval over',
      'Compliance and governance handled end to end',
      'Revenue share models built around your risk appetite',
    ],
  },
  {
    tag: 'For AI teams',
    title: 'Access the data you actually need.',
    points: [
      'Curated datasets across government, healthcare, logistics, and more',
      'Clean provenance, usage rights, and audit trails included',
      'Faster path from data request to model training',
    ],
  },
]

export default function App() {
  return (
    <div className="app">
      {/* NAV */}
      <nav className="nav">
        <a href="/" className="nav-logo">Neptune Data</a>
        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <p className="hero-eyebrow">Neutral data infrastructure</p>
          <h1 className="hero-headline">
            The bridge between<br />
            <em>institutional data</em> and<br />
            AI that needs it.
          </h1>
          <p className="hero-sub">
            Neptune Data connects governments and enterprises with AI labs through structured, 
            compliant, and commercially fair data access agreements.
          </p>
          <a href="#contact" className="btn-primary">Get in touch</a>
        </div>
        <div className="hero-rule" />
      </section>

      {/* WHAT WE DO — PROBLEM */}
      <section className="section" id="what-we-do">
        <div className="container">
          <p className="section-eyebrow">The problem</p>
          <h2 className="section-heading">
            Valuable data exists.<br />Access to it doesn't.
          </h2>
          <div className="problem-grid">
            {PROBLEMS.map(p => (
              <div key={p.id} className="problem-card">
                <span className="problem-id">{p.id}</span>
                <h3 className="problem-title">{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="full-rule" />

      {/* WHAT WE DO — SOLUTION */}
      <section className="section section-tinted">
        <div className="container">
          <p className="section-eyebrow">Our role</p>
          <h2 className="section-heading">
            We act as the neutral party<br />both sides can rely on.
          </h2>
          <p className="solution-body">
            Neptune Data sits between data holders and AI teams as a structured intermediary. 
            We design the access framework, negotiate the terms, ensure compliance, and manage 
            the ongoing relationship — so neither side has to navigate unfamiliar territory alone.
          </p>
          <div className="flow-row">
            <div className="flow-node">Data Holder</div>
            <div className="flow-arrow">
              <span className="flow-label">licensed access</span>
              <div className="arrow-line"><div className="arrow-head" /></div>
            </div>
            <div className="flow-node flow-node-accent">Neptune Data</div>
            <div className="flow-arrow">
              <span className="flow-label">curated datasets</span>
              <div className="arrow-line"><div className="arrow-head" /></div>
            </div>
            <div className="flow-node">AI Team</div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="section" id="who-we-serve">
        <div className="container">
          <p className="section-eyebrow">Who we serve</p>
          <h2 className="section-heading">Built for both sides of the table.</h2>
          <div className="audience-grid">
            {AUDIENCES.map(a => (
              <div key={a.tag} className="audience-card">
                <span className="audience-tag">{a.tag}</span>
                <h3 className="audience-title">{a.title}</h3>
                <ul className="audience-points">
                  {a.points.map(pt => (
                    <li key={pt}>
                      <span className="check">✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section section-contact" id="contact">
        <div className="container contact-inner">
          <h2 className="contact-heading">Interested in working with us?</h2>
          <p className="contact-sub">
            Whether you hold data or need it, reach out and we will figure out if there's a fit.
          </p>
          <a href="mailto:sanchit@neptunedata.ai" className="btn-primary btn-large">
            sanchit@neptunedata.ai
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-logo">Neptune Data</span>
          <span className="footer-copy">© {new Date().getFullYear()} Neptune Data. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
