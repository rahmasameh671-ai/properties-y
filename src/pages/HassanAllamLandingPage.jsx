import React, { useState } from 'react';
import '../../hassan-allam.css';

/**
 * Hassan Allam Properties Portfolio Landing Page Component
 * Route: /hassan-allam strictly under properties-y.com domain architecture
 * Final Live URL: https://properties-y.com/hassan-allam/
 * Branding: 'By properties-y' | Independent Real Estate Consultancy
 * Aesthetic: Avant-Garde Editorial Luxury (High-Fashion Magazine meets Real Estate)
 * Color Palette: Strictly Midnight & Porcelain (ZERO Gold, ZERO Bronze, ZERO Yellow)
 * Global WhatsApp: +201277752731 (Solid Vibrant Green #25D366, min 48px tap height)
 */

const COUNTRIES = [
  { name: 'Egypt', code: 'EG', dial: '+20', flag: '🇪🇬', priority: true },
  { name: 'Saudi Arabia', code: 'SA', dial: '+966', flag: '🇸🇦', priority: true },
  { name: 'United Arab Emirates', code: 'AE', dial: '+971', flag: '🇦🇪', priority: true },
  { name: 'Kuwait', code: 'KW', dial: '+965', flag: '🇰🇼', priority: true },
  { name: 'Qatar', code: 'QA', dial: '+974', flag: '🇶🇦', priority: true },
  { name: 'Oman', code: 'OM', dial: '+968', flag: '🇴🇲', priority: true },
  { name: 'Bahrain', code: 'BH', dial: '+973', flag: '🇧🇭', priority: true },
  { name: 'Jordan', code: 'JO', dial: '+962', flag: '🇯🇴', priority: true },
  { name: 'United Kingdom', code: 'GB', dial: '+44', flag: '🇬🇧', priority: true },
  { name: 'United States', code: 'US', dial: '+1', flag: '🇺🇸', priority: true },
  { name: 'Canada', code: 'CA', dial: '+1', flag: '🇨🇦', priority: true },
  { name: 'Germany', code: 'DE', dial: '+49', flag: '🇩🇪' },
  { name: 'France', code: 'FR', dial: '+33', flag: '🇫🇷' },
  { name: 'Italy', code: 'IT', dial: '+39', flag: '🇮🇹' },
  { name: 'Spain', code: 'ES', dial: '+34', flag: '🇪🇸' },
  { name: 'Switzerland', code: 'CH', dial: '+41', flag: '🇨🇭' },
  { name: 'Netherlands', code: 'NL', dial: '+31', flag: '🇳🇱' },
  { name: 'Australia', code: 'AU', dial: '+61', flag: '🇦🇺' },
  { name: 'Lebanon', code: 'LB', dial: '+961', flag: '🇱🇧' },
  { name: 'Iraq', code: 'IQ', dial: '+964', flag: '🇮🇶' },
  { name: 'Libya', code: 'LY', dial: '+218', flag: '🇱🇾' },
  { name: 'Morocco', code: 'MA', dial: '+212', flag: '🇲🇦' },
  { name: 'Tunisia', code: 'TN', dial: '+216', flag: '🇹🇳' },
  { name: 'Turkey', code: 'TR', dial: '+90', flag: '🇹🇷' }
];

export default function HassanAllamLandingPage() {
  const WHATSAPP_NUMBER = '201277752731';

  // Lead Form States
  const [fullName, setFullName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalWhatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20I%20have%20just%20submitted%20my%20inquiry%20for%20Hassan%20Allam%20Properties%20on%20properties-y.com%20and%20would%20like%20to%20receive%20the%20brochures%20and%20availability%20right%20away`;

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      c.dial.includes(searchQuery.trim()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Form Submission Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      alert('Please fill in your full name.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 6) {
      alert('Please enter a valid phone number.');
      return;
    }

    const fullPhone = `${selectedCountry.dial} ${phoneNumber.trim()}`;
    const clientName = fullName.trim();
    setSubmittedName(clientName);
    setIsSubmitting(true);

    // Save Lead Locally
    try {
      const stored = JSON.parse(localStorage.getItem('properties_y_hassan_allam_leads') || '[]');
      stored.push({
        name: clientName,
        phone: fullPhone,
        timestamp: new Date().toISOString(),
        portfolio: 'Hassan Allam Properties Portfolio',
        consultancy: 'properties-y.com Independent Real Estate Consultancy'
      });
      localStorage.setItem('properties_y_hassan_allam_leads', JSON.stringify(stored));
    } catch (err) {
      console.warn('Storage notice:', err);
    }

    // Google Tag Conversion Event Tracking
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'conversion', {
          send_to: 'AW-18564830215/A7t2CIvYnLYdEIeos5RF',
          value: 1.0,
          currency: 'EGP'
        });
        window.gtag('event', 'conversion', {
          send_to: 'AW-18125180547/AZcICJes-qQcEIOd4cJD',
          value: 1.0,
          currency: 'EGP'
        });
        window.gtag('event', 'generate_lead', {
          event_category: 'form',
          event_label: 'Hassan Allam Lead Inquiry'
        });
      } catch (err) {
        console.warn('Gtag notice:', err);
      }
    }

    // Dispatch to Zapier Webhook
    try {
      await fetch('https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/', {
        method: 'POST',
        body: JSON.stringify({
          fullName: clientName,
          phoneNumber: fullPhone,
          portfolio: 'Hassan Allam Properties',
          landingPageUrl: typeof window !== 'undefined' ? window.location.href : 'https://properties-y.com/hassan-allam/',
          submissionDate: new Date().toISOString()
        })
      });
    } catch (err) {
      console.warn('Zapier notice:', err);
    }

    // Email Dispatch (Backup)
    try {
      fetch('https://formsubmit.co/ajax/Rahma@irtkaz.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: clientName,
          phone: fullPhone,
          source: 'Hassan Allam Properties Portfolio – properties-y.com',
          consultancy: 'properties-y.com Independent Real Estate Consultancy',
          _replyto: 'Rahma@irtkaz.com',
          _cc: 'Mostafa.a.ashmawy@gmail.com,Mostafa.ashmawy@irtkaz.com',
          _subject: `New Lead: Hassan Allam - ${clientName} (${fullPhone}) [properties-y.com]`,
          _template: 'table'
        })
      }).catch((err) => console.warn('Dispatch notice:', err));
    } catch (err) {
      console.warn('Transmission notice:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(true);

      // Attempt immediate WhatsApp handoff
      try {
        window.open(modalWhatsappLink, '_blank', 'noopener,noreferrer');
      } catch {
        // Handled via modal CTA
      }

      setFullName('');
      setPhoneNumber('');
    }, 450);
  };

  return (
    <div className="hap-editorial-wrap">
      {/* =========================================================================
           IN-HERO EDITORIAL MASTHEAD (STARTS DIRECTLY AT TOP: 0)
           ========================================================================= */}
      <header className="hap-masthead-bar">
        <div className="container masthead-inner">
          <div className="masthead-brand-group">
            <img
              src="/images/hassan-allam/hap-crest-white.svg"
              alt="Hassan Allam Properties Crest"
              className="hap-logo-mark"
              width="170"
              height="42"
            />
            <div className="masthead-brand-text">
              <span className="masthead-title">Editorial Portfolio</span>
              <div className="masthead-signature-label">
                <span className="signature-by">By properties-y</span>
                <span className="signature-bullet">•</span>
                <span className="signature-role">Independent Real Estate Consultancy</span>
              </div>
            </div>
          </div>

          <nav className="masthead-nav-pills" aria-label="Editorial Index Navigation">
            <a href="#park-central">01 Park Central</a>
            <a href="#the-valleys">02 The Valleys</a>
            <a href="#xchange">03 Xchange</a>
            <a href="#swanlake-residence">04 Swanlake Residence</a>
            <a href="#ampm">05 AM:PM</a>
            <a href="#encore-elgouna">06 Encore El Gouna</a>
          </nav>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20am%20inquiring%20about%20the%20Hassan%20Allam%20Properties%20portfolio.`}
            target="_blank"
            rel="noopener noreferrer"
            className="masthead-contact-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
            </svg>
            +201277752731
          </a>
        </div>
      </header>

      {/* =========================================================================
           1. HERO SECTION (STARTS DIRECTLY AT TOP: 0, CINEMATIC LAYOUT)
           ========================================================================= */}
      <section className="hap-hero-section" id="hero">
        <div className="hero-backdrop-layer">
          <img
            src="/images/hassan-allam/hero-hap-cinematic.jpg"
            alt="Hassan Allam Properties Cinematic Master Portfolio"
            className="hero-backdrop-img"
          />
          <div className="hero-backdrop-gradient" />
        </div>

        <div className="container hero-editorial-grid">
          {/* Left Column */}
          <div className="hero-editorial-column">
            <div className="hero-meta-strip">
              <span className="hero-kicker-tag">CURATED DOSSIER • 2026</span>
              <span className="hero-edition-tag">Hassan Allam Properties Selection</span>
            </div>

            <h1 className="hero-display-headline">
              The Hassan Allam
              <span className="italicized">Properties Portfolio</span>
            </h1>

            <p className="hero-lead-narrative">
              An avant-garde exploration of Egypt’s premier residential and executive addresses. From Mostakbal City’s Park Central, The Valleys, and Xchange, to the crown of New Cairo at Swanlake Residence, corporate prestige at AM:PM, and coastal sanctuary at Encore El Gouna. Presented with absolute objectivity by properties-y, Independent Real Estate Consultancy.
            </p>

            <div className="hero-action-cluster">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20would%20like%20to%20consult%20on%20the%20Hassan%20Allam%20portfolio.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-whatsapp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                </svg>
                <span>Direct WhatsApp Advisory</span>
              </a>
              <a href="#park-central" className="btn-hero-secondary">
                <span>Explore Portfolio ↓</span>
              </a>
            </div>
          </div>

          {/* Right Column: Lead Dossier Card */}
          <div className="hero-dossier-card">
            <div className="dossier-card-masthead">
              <span className="dossier-card-kicker">PRIVATE DOSSIER INQUIRY</span>
              <h2 className="dossier-card-title">Direct Advisor Dispatch</h2>
              <p className="dossier-card-subtitle">Receive full price sheets, floor plans & unit availability.</p>
            </div>

            {/* FORM: NO PLACEHOLDERS, SPLIT PHONE WITH UTF-8 FLAGS */}
            <form onSubmit={handleFormSubmit}>
              <div className="editorial-form-group">
                <label htmlFor="reactLeadFullName" className="form-editorial-label">
                  FULL NAME
                </label>
                <input
                  type="text"
                  id="reactLeadFullName"
                  className="editorial-input"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div className="editorial-form-group">
                <label htmlFor="reactLeadPhone" className="form-editorial-label">
                  PHONE NUMBER
                </label>
                <div className="split-phone-container">
                  {/* Country Trigger */}
                  <button
                    type="button"
                    className="country-code-trigger-btn"
                    aria-expanded={isDropdownOpen}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="trigger-flag-icon">{selectedCountry.flag}</span>
                    <span className="trigger-dial-code">{selectedCountry.dial}</span>
                    <svg
                      className="trigger-chevron"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="currentColor"
                      style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none' }}
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Popover */}
                  {isDropdownOpen && (
                    <div className="country-dropdown-popover is-open">
                      <div className="country-search-box">
                        <input
                          type="text"
                          className="country-search-input"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div className="country-options-list">
                        {filteredCountries.length === 0 ? (
                          <div style={{ padding: '12px 14px', fontSize: '0.82rem', color: '#718096' }}>
                            No country found
                          </div>
                        ) : (
                          filteredCountries.map((c) => (
                            <div
                              key={c.code}
                              className={`country-option-item ${c.code === selectedCountry.code ? 'is-selected' : ''}`}
                              onClick={() => {
                                setSelectedCountry(c);
                                setIsDropdownOpen(false);
                                setSearchQuery('');
                              }}
                            >
                              <span className="country-option-flag">{c.flag}</span>
                              <span className="country-option-name">{c.name}</span>
                              <span className="country-option-dial">{c.dial}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Blank Phone Input (NO placeholder) */}
                  <input
                    type="tel"
                    id="reactLeadPhone"
                    className="editorial-input phone-number-field"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <button type="submit" className="btn-editorial-submit" disabled={isSubmitting}>
                <span>{isSubmitting ? 'PROCESSING...' : 'DISPATCH REGISTRATION'}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <p className="form-privacy-note">
                Independent Real Estate Consultancy • Zero Developer Commissions • Strict Confidentiality
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* =========================================================================
           EDITORIAL CURATOR STATEMENT BAR
           ========================================================================= */}
      <section className="editorial-curator-statement">
        <div className="container curator-grid">
          <div className="curator-badge-col">
            <span className="curator-eyebrow">CURATED BY</span>
            <h3 className="curator-brand">properties-y</h3>
            <span className="signature-role">Independent Real Estate Consultancy</span>
          </div>
          <div className="curator-text-col">
            <p>
              We provide impartial, high-conviction strategic real estate advisory across Egypt's landmark developments. As independent consultants, our fiduciary duty belongs entirely to the investor and homebuyer, ensuring genuine access to inventory, transparent payment terms, and unbiased guidance.
            </p>
          </div>
          <div className="curator-fast-facts">
            <div className="fact-item">
              <span className="fact-num">6</span>
              <span className="fact-label">Flagships</span>
            </div>
            <div className="fact-item">
              <span className="fact-num">0%</span>
              <span className="fact-label">Client Fee</span>
            </div>
            <div className="fact-item">
              <span className="fact-num">10 YRS</span>
              <span className="fact-label">Max Installment</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           SECTION 1: PARK CENTRAL (Mostakbal City)
           ========================================================================= */}
      <section className="editorial-project-block block-pure-white" id="park-central">
        <div className="block-watermark-text">PARK CENTRAL</div>

        <div className="container block-inner-relative">
          <div className="editorial-section-header">
            <div className="header-left-cluster">
              <span className="section-editorial-num">COLLECTION 01 / 06</span>
              <h2 className="section-project-title">Park Central</h2>
              <span className="section-location-tag">Mostakbal City • East Cairo Central Park Living • 4 Years Delivery</span>
            </div>
            <div className="header-badge-pills">
              <span className="editorial-badge badge-charcoal">FULLY FINISHED</span>
              <span className="editorial-badge badge-subtle">4 YRS DELIVERY</span>
              <span className="editorial-badge badge-outline">10% OVER 5 YRS</span>
            </div>
          </div>

          <div className="park-central-asymmetry">
            <div className="dossier-visual-frame">
              <img
                src="/images/hassan-allam/park-central-exterior.jpg"
                alt="Park Central Mostakbal City Master Architecture"
                loading="lazy"
              />
              <div className="dossier-floating-caption">
                <span className="caption-subtitle">SIGNATURE LANDSCAPE</span>
                <h3 className="caption-title">Integrated Parklands & Contemporary Architecture</h3>
              </div>
            </div>

            <div className="editorial-specs-column">
              {/* Villas Card */}
              <div className="specs-editorial-card">
                <div className="card-category-kicker">
                  <span>Villas Collection • 4 Years Delivery</span>
                  <span className="finish-tag">Fully Finished</span>
                </div>
                <div className="unit-spec-rows">
                  <div className="unit-spec-row">
                    <div>
                      <div className="unit-type-name">Townhouses</div>
                      <div className="unit-dimension-sub">195 – 200 sqm • Delivery in 4 years</div>
                    </div>
                    <div className="unit-price-metric">
                      <span className="price-main-number">20M – 22.5M</span>
                      <div className="unit-dimension-sub">EGP</div>
                    </div>
                  </div>

                  <div className="unit-spec-row">
                    <div>
                      <div className="unit-type-name">Twin Houses</div>
                      <div className="unit-dimension-sub">210 sqm • Delivery in 4 years</div>
                    </div>
                    <div className="unit-price-metric">
                      <span className="price-main-number">from 25.2M</span>
                      <div className="unit-dimension-sub">EGP</div>
                    </div>
                  </div>

                  <div className="unit-spec-row">
                    <div>
                      <div className="unit-type-name">One-Story Villas</div>
                      <div className="unit-dimension-sub">210 – 275 sqm • Delivery in 4 years</div>
                    </div>
                    <div className="unit-price-metric">
                      <span className="price-main-number">52M – 75M</span>
                      <div className="unit-dimension-sub">EGP</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Apartments Card */}
              <div className="specs-editorial-card">
                <div className="card-category-kicker">
                  <span>Apartments & Duplexes • 4 Years Delivery</span>
                  <span className="finish-tag">Fully Finished</span>
                </div>
                <div className="unit-spec-rows">
                  <div className="unit-spec-row">
                    <div>
                      <div className="unit-type-name">1 to 3 Bedrooms</div>
                      <div className="unit-dimension-sub">81 – 150 sqm • Delivery in 4 years</div>
                    </div>
                    <div className="unit-price-metric">
                      <span className="price-main-number">6.2M – 11.3M</span>
                      <div className="unit-dimension-sub">EGP</div>
                    </div>
                  </div>

                  <div className="unit-spec-row">
                    <div>
                      <div className="unit-type-name">Duplex Residences</div>
                      <div className="unit-dimension-sub">253 sqm • Delivery in 4 years</div>
                    </div>
                    <div className="unit-price-metric">
                      <span className="price-main-number">from 20M</span>
                      <div className="unit-dimension-sub">EGP</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Architecture */}
              <div className="payment-plan-editorial-box">
                <div className="plan-info-left">
                  <span className="plan-kicker">EXCLUSIVE PAYMENT ARCHITECTURE</span>
                  <span className="plan-highlight">10% Down Payment Over 5 Years</span>
                  <span className="plan-note">Extended 10-Year Payment Plan Available for Villas • 4 Years Delivery</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20would%20like%20to%20chat%20about%20Park%20Central%20Mostakbal%20City.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-wa"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                </svg>
                <span>Chat about Park Central</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           SECTION 2: THE VALLEYS (Mostakbal City - Villas Only)
           ========================================================================= */}
      <section className="editorial-project-block block-subtle-grey" id="the-valleys">
        <div className="block-watermark-text">THE VALLEYS</div>

        <div className="container block-inner-relative">
          <div className="editorial-section-header">
            <div className="header-left-cluster">
              <span className="section-editorial-num">COLLECTION 02 / 06</span>
              <h2 className="section-project-title">The Valleys</h2>
              <span className="section-location-tag">Mostakbal City • Pure Villas Enclave • 2 Years Delivery</span>
            </div>
            <div className="header-badge-pills">
              <span className="editorial-badge badge-charcoal">VILLAS ONLY</span>
              <span className="editorial-badge badge-subtle">2 YEARS DELIVERY</span>
              <span className="editorial-badge badge-outline">5% + 5% / 9 YRS</span>
            </div>
          </div>

          <div className="the-valleys-asymmetry">
            <div className="valleys-visual-wrapper">
              <img
                src="/images/hassan-allam/the-valleys-villas.jpg"
                alt="The Valleys Mostakbal City Villas Only Sanctuary"
                className="valleys-panoramic-img"
                loading="lazy"
              />
              <div className="valleys-floating-pill-badge">
                PRIVATE VALLEY MASTERPLAN • VILLAS ONLY
              </div>
            </div>

            <div className="valleys-editorial-column">
              <div className="valleys-quote-block">
                <p className="valleys-quote-text">
                  "An exclusive community curated exclusively for standalone, twin, and townhouse estates enveloped by undulating topography."
                </p>
              </div>

              <div className="valleys-cards-stack">
                <div className="valley-spec-card">
                  <div className="valley-unit-info">
                    <h4>Townhouses</h4>
                    <p>Fully finished luxury townhomes • 2 Yrs Delivery</p>
                  </div>
                  <div className="valley-unit-price">
                    from 29M <span style={{ fontSize: '0.8rem', color: 'var(--slate-muted)' }}>EGP</span>
                  </div>
                </div>

                <div className="valley-spec-card">
                  <div className="valley-unit-info">
                    <h4>Twinhouses</h4>
                    <p>Expansive twin residences with private gardens • 2 Yrs Delivery</p>
                  </div>
                  <div className="valley-unit-price">
                    from 38.6M <span style={{ fontSize: '0.8rem', color: 'var(--slate-muted)' }}>EGP</span>
                  </div>
                </div>

                <div className="valley-spec-card">
                  <div className="valley-unit-info">
                    <h4>Standalone Villas</h4>
                    <p>240 – 300 sqm private estates • Fully finished • 2 Yrs Delivery</p>
                  </div>
                  <div className="valley-unit-price">
                    47M – 55.6M <span style={{ fontSize: '0.8rem', color: 'var(--slate-muted)' }}>EGP</span>
                  </div>
                </div>
              </div>

              <div className="payment-plan-editorial-box">
                <div className="plan-info-left">
                  <span className="plan-kicker">FINANCIAL FRAMEWORK</span>
                  <span className="plan-highlight">5% + 5% after 3 months over 9 years</span>
                  <span className="plan-note">Fully Finished Delivery within 2 Years</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20would%20like%20to%20chat%20about%20The%20Valleys%20Mostakbal%20City.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-wa"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                </svg>
                <span>Chat about The Valleys</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           SECTION 3: XCHANGE (Mostakbal City - Commercial/Offices)
           ========================================================================= */}
      <section className="editorial-project-block block-pure-white" id="xchange">
        <div className="block-watermark-text">XCHANGE</div>

        <div className="container block-inner-relative">
          <div className="editorial-section-header">
            <div className="header-left-cluster">
              <span className="section-editorial-num">COLLECTION 03 / 06</span>
              <h2 className="section-project-title">Xchange</h2>
              <span className="section-location-tag">Mostakbal City • Executive Commercial & Office Destination</span>
            </div>
            <div className="header-badge-pills">
              <span className="editorial-badge badge-charcoal">COMMERCIAL ASSET</span>
              <span className="editorial-badge badge-subtle">CORE & SHELL</span>
              <span className="editorial-badge badge-outline">5% + 5% / 9 YRS</span>
            </div>
          </div>

          <div className="xchange-asymmetry">
            <div className="xchange-info-column">
              <h3 className="xchange-headline-lead">
                The Epicenter of Corporate Influence in East Cairo
              </h3>
              <p className="xchange-description-body">
                Strategically positioned within Mostakbal City’s high-growth urban corridor, Xchange represents Hassan Allam’s flagship business hub, engineered for regional headquarters, boutique financial practices, and multinational executive suites.
              </p>

              <div className="xchange-spec-grid">
                <div className="xchange-metric-box">
                  <span className="metric-box-label">ENTRY OFFICE SPACES</span>
                  <span className="metric-box-value">39 sqm</span>
                  <div style={{ fontSize: '0.82rem', color: 'var(--slate-body)', marginTop: '4px' }}>from 4.7M EGP</div>
                </div>

                <div className="xchange-metric-box">
                  <span className="metric-box-label">EXECUTIVE SUITES</span>
                  <span className="metric-box-value">Up to 155 sqm</span>
                  <div style={{ fontSize: '0.82rem', color: 'var(--slate-body)', marginTop: '4px' }}>up to 21M EGP</div>
                </div>

                <div className="xchange-metric-box">
                  <span className="metric-box-label">DELIVERY HORIZON</span>
                  <span className="metric-box-value">4 Years</span>
                  <div style={{ fontSize: '0.82rem', color: 'var(--slate-body)', marginTop: '4px' }}>Core & Shell Delivery</div>
                </div>

                <div className="xchange-metric-box">
                  <span className="metric-box-label">FINANCING TERM</span>
                  <span className="metric-box-value">9 Years</span>
                  <div style={{ fontSize: '0.82rem', color: 'var(--slate-body)', marginTop: '4px' }}>5% + 5% after 3 mos</div>
                </div>
              </div>

              <div className="payment-plan-editorial-box">
                <div className="plan-info-left">
                  <span className="plan-kicker">COMMERCIAL PAYMENT SCHEME</span>
                  <span className="plan-highlight">5% + 5% after 3 months over 9 years</span>
                  <span className="plan-note">Core & Shell Delivery in 4 Years</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20would%20like%20to%20chat%20about%20Xchange%20Commercial%20Offices.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-wa"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                </svg>
                <span>Chat about Xchange</span>
              </a>
            </div>

            <div className="xchange-visual-card">
              <img
                src="/images/hassan-allam/xchange-commercial.jpg"
                alt="Xchange Commercial Architectural Glass Tower"
                loading="lazy"
              />
              <div className="xchange-overlay-badge">
                <div className="overlay-badge-left">
                  <h4>Xchange Business District</h4>
                  <p>Offices 39 – 155 sqm • Core & Shell</p>
                </div>
                <span className="overlay-plan-tag">5% + 5% / 9 YRS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           SECTION 4: SWANLAKE RESIDENCE (New Cairo)
           ========================================================================= */}
      <section className="editorial-project-block block-subtle-grey" id="swanlake-residence">
        <div className="block-watermark-text">SWANLAKE</div>

        <div className="container block-inner-relative">
          <div className="editorial-section-header">
            <div className="header-left-cluster">
              <span className="section-editorial-num">COLLECTION 04 / 06</span>
              <h2 className="section-project-title">Swanlake Residence</h2>
              <span className="section-location-tag">First Settlement • New Cairo Trophy Estate Community</span>
            </div>
            <div className="header-badge-pills">
              <span className="editorial-badge badge-charcoal">TROPHY ASSET</span>
              <span className="editorial-badge badge-subtle">READY TO MOVE VILLAS</span>
              <span className="editorial-badge badge-outline">5% + 5% / 10 YRS</span>
            </div>
          </div>

          <div className="slr-panoramic-banner">
            <img
              src="/images/hassan-allam/swanlake-residence-apartments.jpg"
              alt="Swanlake Residence New Cairo Panoramic View"
              loading="lazy"
            />
            <div className="slr-banner-overlay">
              <div className="banner-overlay-inner">
                <h3>The Pinnacle of East Cairo Prestige</h3>
                <p>An impeccably situated enclave featuring master-crafted apartments, prestigious Monos, and prime ready-to-move signature estates.</p>
              </div>
            </div>
          </div>

          <div className="swanlake-residence-spread">
            {/* Tier 1 */}
            <div className="slr-tier-card">
              <div>
                <div className="tier-number-tag">TIER 01 • RESIDENCES</div>
                <h3 className="tier-card-heading">Apartments</h3>
                <ul className="tier-specs-list">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>1 to 3 Bedrooms</strong> layout choices</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>Fully Finished</strong> luxury specifications</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>1 Year Delivery</strong> timeline</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>5% + 5% after 3 months</strong> over 10 Years</span>
                  </li>
                </ul>
              </div>
              <div className="tier-price-anchor">
                <span className="tier-price-label">INVESTMENT SPECTRUM</span>
                <span className="tier-price-val">15.5M – 27M <small style={{ fontSize: '0.75rem' }}>EGP</small></span>
              </div>
            </div>

            {/* Tier 2: Monos (Featured Dark) */}
            <div className="slr-tier-card featured-dark">
              <div>
                <div className="tier-number-tag">TIER 02 • ARCHITECTURAL ICON</div>
                <h3 className="tier-card-heading">Monos (G+3)</h3>
                <ul className="tier-specs-list">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>291 sqm</strong> expansive floorplate</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>Ground + 3 Floors</strong> architectural structure</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>Flexi Finish</strong> bespoke interior flexibility</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>3 Years Delivery</strong> • 7 Years installments</span>
                  </li>
                </ul>
              </div>
              <div className="tier-price-anchor">
                <span className="tier-price-label">UNIT VALUATION</span>
                <span className="tier-price-val">59.4M <small style={{ fontSize: '0.75rem' }}>EGP</small></span>
              </div>
            </div>

            {/* Tier 3: Signature Villas */}
            <div className="slr-tier-card">
              <div>
                <div className="tier-number-tag">TIER 03 • PRIVATE ESTATES</div>
                <h3 className="tier-card-heading">Signature Villas</h3>
                <ul className="tier-specs-list">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>Twinhouses:</strong> from 105M EGP (2 yrs delivery)</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>Standalones:</strong> up to 183M EGP (Ready to move)</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>Core & Shell:</strong> authentic architectural canvas</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span><strong>Immediate Handover:</strong> on select standalone estates</span>
                  </li>
                </ul>
              </div>
              <div className="tier-price-anchor">
                <span className="tier-price-label">PRIVATE ESTATE RANGE</span>
                <span className="tier-price-val">105M – 183M <small style={{ fontSize: '0.75rem' }}>EGP</small></span>
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20would%20like%20to%20chat%20about%20Swanlake%20Residence%20New%20Cairo.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial-wa"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
            </svg>
            <span>Chat about Swanlake Residence</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
           SECTION 5: AM:PM (New Cairo - Commercial)
           ========================================================================= */}
      <section className="editorial-project-block block-pure-white" id="ampm">
        <div className="block-watermark-text">AM:PM</div>

        <div className="container block-inner-relative">
          <div className="editorial-section-header">
            <div className="header-left-cluster">
              <span className="section-editorial-num">COLLECTION 05 / 06</span>
              <h2 className="section-project-title">AM:PM</h2>
              <span className="section-location-tag">New Cairo • Prime Commercial & Corporate Suites • 1 Year Delivery</span>
            </div>
            <div className="header-badge-pills">
              <span className="editorial-badge badge-charcoal">CORPORATE FLAGSHIP</span>
              <span className="editorial-badge badge-subtle">1 YR DELIVERY</span>
              <span className="editorial-badge badge-outline">5% + 5% / 7 YRS</span>
            </div>
          </div>

          <div className="ampm-asymmetry">
            <div className="ampm-visual-card">
              <img
                src="/images/hassan-allam/ampm-commercial.jpg"
                alt="AM:PM New Cairo Commercial Development"
                loading="lazy"
              />
              <div className="ampm-floating-badge">
                NEW CAIRO BUSINESS GATEWAY • 1 YR DELIVERY
              </div>
            </div>

            <div className="ampm-info-column">
              <h3 className="ampm-headline-lead">
                A Strategic Commercial Address in the Heart of New Cairo
              </h3>
              <p className="ampm-description-body">
                Engineered for prominent corporate headquarters, financial institutions, and medical practices. AM:PM provides expansive, highly adaptable office plates delivered in core & shell specification with rapid 1-year delivery.
              </p>

              <div className="ampm-metrics-grid">
                <div className="ampm-metric-item">
                  <span className="ampm-metric-label">ENTRY OFFICES</span>
                  <span className="ampm-metric-val">141 sqm</span>
                  <div style={{ fontSize: '0.82rem', color: 'var(--slate-body)', marginTop: '4px' }}>from 40M EGP</div>
                </div>

                <div className="ampm-metric-item">
                  <span className="ampm-metric-label">HEADQUARTERS</span>
                  <span className="ampm-metric-val">Up to 497 sqm</span>
                  <div style={{ fontSize: '0.82rem', color: 'var(--slate-body)', marginTop: '4px' }}>up to 142M EGP</div>
                </div>

                <div className="ampm-metric-item">
                  <span className="ampm-metric-label">FINISH LEVEL</span>
                  <span className="ampm-metric-val">Core & Shell</span>
                  <div style={{ fontSize: '0.82rem', color: 'var(--slate-body)', marginTop: '4px' }}>Bespoke Fit-out Canvas</div>
                </div>

                <div className="ampm-metric-item">
                  <span className="ampm-metric-label">DELIVERY HORIZON</span>
                  <span className="ampm-metric-val">1 Year</span>
                  <div style={{ fontSize: '0.82rem', color: 'var(--slate-body)', marginTop: '4px' }}>Rapid Handover Status</div>
                </div>
              </div>

              <div className="payment-plan-editorial-box">
                <div className="plan-info-left">
                  <span className="plan-kicker">COMMERCIAL STRUCTURE</span>
                  <span className="plan-highlight">5% + 5% after 3 months over 7 years</span>
                  <span className="plan-note">Fast-track delivery within 12 months • Prime East Cairo positioning</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20would%20like%20to%20chat%20about%20AM:PM%20Commercial%20Offices.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-wa"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                </svg>
                <span>Chat about AM:PM</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           SECTION 6: ENCORE SWANLAKE (El Gouna, Red Sea)
           ========================================================================= */}
      <section className="editorial-project-block block-subtle-grey" id="encore-elgouna">
        <div className="block-watermark-text">EL GOUNA</div>

        <div className="container block-inner-relative">
          <div className="editorial-section-header">
            <div className="header-left-cluster">
              <span className="section-editorial-num">COLLECTION 06 / 06</span>
              <h2 className="section-project-title">Encore Swanlake</h2>
              <span className="section-location-tag">El Gouna • Red Sea Coastal Waterfront Sanctuary</span>
            </div>
            <div className="header-badge-pills">
              <span className="editorial-badge badge-charcoal">BUY NOW LIVE NOW</span>
              <span className="editorial-badge badge-subtle">ACs & KITCHEN INCLUDED</span>
              <span className="editorial-badge badge-outline">5% OVER 8 YEARS</span>
            </div>
          </div>

          <div className="encore-asymmetry">
            <div className="encore-visual-frame">
              <img
                src="/images/hassan-allam/encore-elgouna-lagoon.jpg"
                alt="Encore Swanlake El Gouna Lagoon Front Residence"
                loading="lazy"
              />
              <div className="vip-buy-now-badge">
                <div className="vip-tag-icon">VIP</div>
                <div className="vip-tag-body">
                  <h5>'Buy Now Live Now' Privilege</h5>
                  <p>Unlimited access to fully furnished serviced units while awaiting delivery.</p>
                </div>
              </div>
            </div>

            <div className="encore-content-col">
              <div className="valleys-quote-block">
                <p className="valleys-quote-text">
                  "Where azure Red Sea lagoons meet the bespoke craftsmanship of Swanlake resort architecture."
                </p>
              </div>

              <div className="specs-editorial-card">
                <div className="card-category-kicker">
                  <span>Lagoon Chalets & Duplexes</span>
                  <span className="finish-tag">1 to 2 Years Delivery</span>
                </div>
                <div className="unit-spec-rows">
                  <div className="unit-spec-row">
                    <div>
                      <div className="unit-type-name">2 to 4 Bedroom Chalets</div>
                      <div className="unit-dimension-sub">Lagoon terraces with pristine water views • Deliveries in 1 to 2 years</div>
                    </div>
                    <div className="unit-price-metric">
                      <span className="price-main-number">25.6M – 40.4M</span>
                      <div className="unit-dimension-sub">EGP</div>
                    </div>
                  </div>

                  <div className="unit-spec-row">
                    <div>
                      <div className="unit-type-name">Lagoon Duplexes</div>
                      <div className="unit-dimension-sub">Double-height architectural living • Deliveries in 1 to 2 years</div>
                    </div>
                    <div className="unit-price-metric">
                      <span className="price-main-number">Full Specs</span>
                      <div className="unit-dimension-sub">Upon Request</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="encore-program-card">
                <h4>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Complete Turnkey Delivery Standard
                </h4>
                <p>
                  Every unit in Encore Swanlake El Gouna is delivered fully finished with integrated concealed air-conditioning, custom designer kitchen cabinetry, and fitted master wardrobes.
                </p>
                <div className="encore-amenities-row">
                  <span className="amenity-chip">✓ Integrated ACs</span>
                  <span className="amenity-chip">✓ Fitted Kitchen</span>
                  <span className="amenity-chip">✓ Built-in Wardrobes</span>
                  <span className="amenity-chip">✓ Swimmable Lagoon</span>
                </div>
              </div>

              <div className="payment-plan-editorial-box">
                <div className="plan-info-left">
                  <span className="plan-kicker">COASTAL PAYMENT STRUCTURE</span>
                  <span className="plan-highlight">5% Down Payment • 8 Years Installments</span>
                  <span className="plan-note">Deliveries in 1 to 2 Years • 'Buy Now Live Now' Enabled</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20would%20like%20to%20chat%20about%20Encore%20Swanlake%20El%20Gouna.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-wa"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                </svg>
                <span>Chat about Encore El Gouna</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           BRANDING & CONSULTANCY FOOTER (properties-y)
           ========================================================================= */}
      <footer className="hap-consultancy-footer">
        <div className="container">
          <div className="footer-top-grid">
            <div className="footer-brand-statement">
              <div style={{ marginBottom: '12px' }}>
                <img
                  src="/images/hassan-allam/hap-crest-white.svg"
                  alt="Hassan Allam Properties Crest"
                  style={{ height: '36px', width: 'auto' }}
                />
              </div>
              <h3>By properties-y</h3>
              <div className="footer-signature-role">Independent Real Estate Consultancy</div>
              <p>
                properties-y is an independent real estate consultancy dedicated to strategic property acquisition, market intelligence, and portfolio advisory across Egypt's landmark master developments.
              </p>
            </div>

            <div className="footer-nav-col">
              <h4>Featured Destinations</h4>
              <ul className="footer-nav-links">
                <li><a href="#park-central">Park Central Mostakbal City</a></li>
                <li><a href="#the-valleys">The Valleys Mostakbal City</a></li>
                <li><a href="#xchange">Xchange Commercial Offices</a></li>
                <li><a href="#swanlake-residence">Swanlake Residence New Cairo</a></li>
                <li><a href="#ampm">AM:PM Commercial New Cairo</a></li>
                <li><a href="#encore-elgouna">Encore Swanlake El Gouna</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4>Advisory Access</h4>
              <ul className="footer-nav-links">
                <li>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--whatsapp-green)', fontWeight: 700 }}
                  >
                    Direct WhatsApp: +201277752731
                  </a>
                </li>
                <li><a href="/mountain-view">Mountain View Portfolio</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms-conditions">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-disclaimer-box">
            <strong>Consultancy Notice:</strong> properties-y operates strictly as an Independent Real Estate Consultancy. Hassan Allam Properties and all associated project names, marks, and architectural concepts are the intellectual property of Hassan Allam Holding and Hassan Allam Properties. Information and pricing presented herein are sourced from official developer releases and are subject to real-time developer revision and unit availability without prior notice.
          </div>

          <div className="footer-bottom-bar">
            <div>© 2026 properties-y.com • All Rights Reserved.</div>
            <div>Strictly Zero Gold • Avant-Garde Editorial Architecture</div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
           FLOATING WHATSAPP TRIGGER (+201277752731)
           ========================================================================= */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20would%20like%20to%20consult%20on%20the%20Hassan%20Allam%20portfolio.`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-trigger"
        aria-label="Direct WhatsApp Consultation"
      >
        <svg viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
        </svg>
        <span className="trigger-text">WhatsApp Advisor</span>
      </a>

      {/* =========================================================================
           SUCCESS MODAL OVERLAY (STRICT VERBATIM TEXT REQUIREMENT)
           ========================================================================= */}
      {isModalOpen && (
        <div className="success-modal-overlay is-active" role="dialog" aria-modal="true">
          <div className="success-modal-container">
            <div className="modal-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <h3 className="modal-headline">Registration Dispatched</h3>

            {/* VERBATIM TEXT REQUIRED BY SPECIFICATION:
                 "Thank you {name}! Your registration has been securely dispatched to our senior consultancy team. A dedicated property advisor will contact you shortly with full brochures, master plans, and unit availability." */}
            <p className="modal-body-copy">
              Thank you <strong>{submittedName}</strong>! Your registration has been securely dispatched to our senior consultancy team. A dedicated property advisor will contact you shortly with full brochures, master plans, and unit availability.
            </p>

            {/* SOLID GREEN "CHAT ON WHATSAPP" BUTTON */}
            <a
              href={modalWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modal-whatsapp"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
              </svg>
              <span>CHAT ON WHATSAPP</span>
            </a>

            {/* CLOSE WINDOW LINK */}
            <button
              type="button"
              className="modal-dismiss-link"
              onClick={() => setIsModalOpen(false)}
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
