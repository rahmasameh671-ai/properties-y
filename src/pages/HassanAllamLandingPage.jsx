import React, { useState, useEffect } from 'react';
import '../../hassan-allam.css';

/**
 * Hassan Allam Properties Portfolio Landing Page Component
 * Route: /hassan-allam/ strictly under properties-y.com domain architecture
 * Final Live URL: https://properties-y.com/hassan-allam/
 * Branding: 'By properties-y' | Independent Real Estate Consultancy
 * Aesthetic: Modern Ultra-Luxury (Apple sleekness / Aman Resorts aesthetic)
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

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.phone-split-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const modalWhatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20have%20just%20submitted%20my%20inquiry%20for%20the%20Hassan%20Allam%20Properties%20portfolio%20and%20would%20like%20to%20receive%20the%20brochures%20and%20availability%20right%20away.`;

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

    // Backup Email Dispatch
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
    <div className="hap-page-wrapper">
      {/* =========================================================================
           1. SLEEK BRAND BAR / NAVIGATION
           ========================================================================= */}
      <header className="hap-navbar">
        <div className="container navbar-inner">
          <div className="brand-identity">
            <span className="brand-title">Hassan Allam Properties</span>
            <span className="brand-tagline">
              By <strong>properties-y</strong> • Independent Real Estate Consultancy
            </span>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20am%20inquiring%20about%20the%20Hassan%20Allam%20Properties%20portfolio.`}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-contact-btn"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
            </svg>
            <span>+201277752731</span>
          </a>
        </div>
      </header>

      {/* =========================================================================
           2. IMMERSIVE HERO SECTION WITH SLEEK FLOATING FORM CARD
           ========================================================================= */}
      <section className="hap-hero" id="hero">
        <div className="hero-bg-layer">
          <img
            src="/images/hassan-allam/hero-hap-cinematic.jpg"
            alt="Hassan Allam Properties Ultra-Luxury Architecture"
          />
        </div>
        <div className="hero-gradient-overlay" />

        <div className="container hero-content-grid">
          {/* Left Hero Narrative */}
          <div className="hero-narrative">
            <div className="hero-badge-pill">
              <span className="hero-badge-dot" />
              <span>Independent Real Estate Consultancy</span>
            </div>

            <h1 className="hero-title">Hassan Allam Properties</h1>
            <p className="hero-subtitle">Discover the Exclusive Portfolio.</p>

            <div className="hero-trust-row">
              <div className="trust-item">
                <span className="trust-val">4</span>
                <span className="trust-lbl">Flagship Destinations</span>
              </div>
              <div className="trust-item">
                <span className="trust-val">0%</span>
                <span className="trust-lbl">Consultancy Fee</span>
              </div>
              <div className="trust-item">
                <span className="trust-val">Up to 10 Yrs</span>
                <span className="trust-lbl">Payment Plans</span>
              </div>
            </div>
          </div>

          {/* Sleek Floating White Lead Capture Form Card */}
          <div className="lead-card-floating">
            <div className="card-heading">
              <h3>Request Property Information</h3>
              <p>Direct dispatch to our senior consultancy team.</p>
            </div>

            <form onSubmit={handleFormSubmit}>
              {/* Full Name (Blank input, NO placeholder) */}
              <div className="field-group">
                <label htmlFor="reactLeadFullName" className="field-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="reactLeadFullName"
                  className="field-input"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              {/* Phone Number (Split: Country code left with UTF-8 flags, blank input right) */}
              <div className="field-group">
                <label htmlFor="reactLeadPhoneInput" className="field-label">
                  Phone Number
                </label>
                <div className="phone-split-container">
                  {/* Country Trigger Button */}
                  <button
                    type="button"
                    className="country-selector-btn"
                    aria-expanded={isDropdownOpen}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="flag-icon">{selectedCountry.flag}</span>
                    <span className="dial-text">{selectedCountry.dial}</span>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
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
                  <div className={`country-popover-panel ${isDropdownOpen ? 'is-open' : ''}`}>
                    <div className="country-filter-wrap">
                      <input
                        type="text"
                        className="country-filter-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="country-items-scroll">
                      {filteredCountries.map((c) => (
                        <div
                          key={c.code}
                          className={`country-item-btn ${c.code === selectedCountry.code ? 'is-active' : ''}`}
                          onClick={() => {
                            setSelectedCountry(c);
                            setIsDropdownOpen(false);
                            setSearchQuery('');
                          }}
                        >
                          <span className="c-flag">{c.flag}</span>
                          <span className="c-name">{c.name}</span>
                          <span className="c-dial">{c.dial}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Blank Phone Input (NO placeholder) */}
                  <input
                    type="tel"
                    id="reactLeadPhoneInput"
                    className="field-input phone-main-input"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Solid Green Submit Button */}
              <button type="submit" className="btn-submit-action" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending Request...' : 'Request Information'}</span>
              </button>

              <p className="card-privacy-notice">Independent Consultancy • Strict Confidentiality</p>
            </form>
          </div>
        </div>
      </section>

      {/* =========================================================================
           3. REFINED PROJECT DATA (ESSENTIALS ONLY — EXACTLY 4 PROJECTS)
           ========================================================================= */}
      <main className="portfolio-showcase-section">
        <div className="container">
          <div className="portfolio-header-block">
            <h2>Featured Developments</h2>
            <p>Key unit types, starting prices, and official payment plans.</p>
          </div>

          {/* =====================================================================
               SECTION 1: PARK CENTRAL (Mostakbal City)
               ===================================================================== */}
          <article className="project-showcase-card" id="park-central">
            <div className="project-showcase-grid">
              <div className="project-visual-frame">
                <img
                  src="/images/hassan-allam/park-central-exterior.jpg"
                  alt="Park Central Mostakbal City"
                  loading="lazy"
                />
              </div>
              <div className="project-detail-panel">
                <div>
                  <div className="panel-header">
                    <span className="location-pill">Mostakbal City</span>
                    <h3 className="project-heading">Park Central</h3>
                  </div>

                  <div className="specs-overview-grid">
                    <div className="spec-tile">
                      <div className="spec-tag">Villas</div>
                      <div className="spec-inventory">Townhouses, Twin Houses, and One-Story Villas</div>
                      <div className="spec-price-range">Starting from 20M to 75M EGP</div>
                      <span className="spec-badge">Fully Finished</span>
                    </div>

                    <div className="spec-tile">
                      <div className="spec-tag">Apartments</div>
                      <div className="spec-inventory">1 to 3 Bedrooms & Duplexes</div>
                      <div className="spec-price-range">Starting from 6.2M to 20M EGP</div>
                      <span className="spec-badge">Fully Finished</span>
                    </div>
                  </div>

                  <div className="payment-terms-box">
                    <span className="terms-label">Payment Plan</span>
                    <div className="terms-description">10% Down Payment over 5 Years (or up to 10 Years)</div>
                  </div>
                </div>

                {/* CTA: Chat on WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20would%20like%20to%20inquire%20about%20Park%20Central%20Mostakbal%20City.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-chat"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </article>

          {/* =====================================================================
               SECTION 2: THE VALLEYS (Mostakbal City)
               ===================================================================== */}
          <article className="project-showcase-card" id="the-valleys">
            <div className="project-showcase-grid">
              <div className="project-visual-frame">
                <img
                  src="/images/hassan-allam/the-valleys-villas.jpg"
                  alt="The Valleys Mostakbal City"
                  loading="lazy"
                />
              </div>
              <div className="project-detail-panel">
                <div>
                  <div className="panel-header">
                    <span className="location-pill">Mostakbal City</span>
                    <h3 className="project-heading">The Valleys</h3>
                  </div>

                  <div className="specs-overview-grid">
                    <div className="spec-tile">
                      <div className="spec-tag">Exclusive Villas</div>
                      <div className="spec-inventory">Townhouses, Twinhouses, and Standalones</div>
                      <div className="spec-price-range">Starting from 29M to 55.6M EGP</div>
                      <span className="spec-badge">Fully Finished</span>
                    </div>
                  </div>

                  <div className="payment-terms-box">
                    <span className="terms-label">Payment Plan</span>
                    <div className="terms-description">5% Down Payment + 5% after 3 months over 9 Years</div>
                  </div>
                </div>

                {/* CTA: Chat on WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20would%20like%20to%20inquire%20about%20The%20Valleys%20Mostakbal%20City.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-chat"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </article>

          {/* =====================================================================
               SECTION 3: SWANLAKE RESIDENCE (New Cairo)
               ===================================================================== */}
          <article className="project-showcase-card" id="swanlake-residence">
            <div className="project-showcase-grid">
              <div className="project-visual-frame">
                <img
                  src="/images/hassan-allam/swanlake-residence-apartments.jpg"
                  alt="Swanlake Residence New Cairo"
                  loading="lazy"
                />
              </div>
              <div className="project-detail-panel">
                <div>
                  <div className="panel-header">
                    <span className="location-pill">New Cairo</span>
                    <h3 className="project-heading">Swanlake Residence</h3>
                  </div>

                  <div className="specs-overview-grid">
                    <div className="spec-tile">
                      <div className="spec-tag">Apartments & Monos</div>
                      <div className="spec-inventory">Luxury Apartments & Signature Monos</div>
                      <div className="spec-price-range">Starting from 15.5M to 59.4M EGP</div>
                    </div>

                    <div className="spec-tile">
                      <div className="spec-tag">Signature Villas</div>
                      <div className="spec-inventory">Twinhouses & Standalones</div>
                      <div className="spec-price-range">Starting from 105M to 183M EGP</div>
                    </div>
                  </div>

                  <div className="payment-terms-box">
                    <span className="terms-label">Payment Plan</span>
                    <div className="terms-description">5% Down Payment over 10 Years</div>
                  </div>
                </div>

                {/* CTA: Chat on WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20would%20like%20to%20inquire%20about%20Swanlake%20Residence%20New%20Cairo.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-chat"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </article>

          {/* =====================================================================
               SECTION 4: ENCORE SWANLAKE (El Gouna)
               ===================================================================== */}
          <article className="project-showcase-card" id="encore-elgouna">
            <div className="project-showcase-grid">
              <div className="project-visual-frame">
                <img
                  src="/images/hassan-allam/encore-elgouna-lagoon.jpg"
                  alt="Encore Swanlake El Gouna"
                  loading="lazy"
                />
              </div>
              <div className="project-detail-panel">
                <div>
                  <div className="panel-header">
                    <span className="location-pill">El Gouna</span>
                    <h3 className="project-heading">Encore Swanlake</h3>
                  </div>

                  <div className="specs-overview-grid">
                    <div className="spec-tile">
                      <div className="spec-tag">Chalets & Duplexes</div>
                      <div className="spec-inventory">Fully Finished Chalets & Duplexes</div>
                      <div className="spec-price-range">Starting from 25.6M to 40.4M EGP</div>
                      <span className="spec-badge">Buy now, live now program</span>
                    </div>
                  </div>

                  <div className="payment-terms-box">
                    <span className="terms-label">Payment Plan</span>
                    <div className="terms-description">5% Down Payment over 8 Years</div>
                  </div>
                </div>

                {/* CTA: Chat on WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20would%20like%20to%20inquire%20about%20Encore%20Swanlake%20El%20Gouna.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-chat"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* =========================================================================
           4. ULTRA-LUXURY FOOTER
           ========================================================================= */}
      <footer className="hap-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand-title">
              <span>By properties-y</span> • Independent Real Estate Consultancy
            </div>
            <div className="footer-navigation">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                WhatsApp: +201277752731
              </a>
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-conditions">Terms & Conditions</a>
            </div>
          </div>

          <div className="footer-disclaimer-text">
            properties-y operates strictly as an Independent Real Estate Consultancy. Information, availability, and pricing
            are subject to developer revision without prior notice.
          </div>
        </div>
      </footer>

      {/* =========================================================================
           5. FLOATING WHATSAPP BUTTON (+201277752731)
           ========================================================================= */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y,%20I%20would%20like%20to%20inquire%20about%20the%20Hassan%20Allam%20portfolio.`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-widget"
        aria-label="Direct WhatsApp Consultation"
      >
        <svg viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
        </svg>
        <span className="widget-label">Chat on WhatsApp</span>
      </a>

      {/* =========================================================================
           6. SUCCESS MODAL OVERLAY (EXACT REQUIRED TEXT)
           ========================================================================= */}
      <div
        className={`modal-overlay success-modal-overlay ${isModalOpen ? 'is-active' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target.classList.contains('modal-overlay')) {
            setIsModalOpen(false);
          }
        }}
      >
        <div className="modal-dialog-card success-modal-card">
          <div className="modal-success-icon modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          <h3 className="modal-header-title modal-title">Registration Received</h3>

          {/* EXACT REQUIRED TEXT */}
          <p className="modal-body-text modal-message">
            Thank you <strong>{submittedName || 'there'}</strong>! Your registration has been securely dispatched to our senior consultancy team. A dedicated property advisor will contact you shortly with full brochures, master plans, and unit availability.
          </p>

          {/* SOLID GREEN "CHAT ON WHATSAPP" BUTTON */}
          <a
            href={modalWhatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modal-whatsapp btn-modal-wa"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
            </svg>
            <span>CHAT ON WHATSAPP</span>
          </a>

          {/* CLOSE WINDOW LINK */}
          <button
            type="button"
            className="btn-modal-dismiss modal-close-link"
            onClick={() => setIsModalOpen(false)}
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
