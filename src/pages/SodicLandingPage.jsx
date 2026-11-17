import React, { useState, useEffect } from 'react';
import '../../sodic.css';

/**
 * SODIC NEW RELEASE LANDING PAGE COMPONENT
 * Route: /sodic/ strictly under properties-y.com domain architecture
 * Final Live URL: https://properties-y.com/sodic/
 *
 * Focus: EASTVALE & SODIC EAST — NOW COLLECTING EOIs EGP 100,000 (Refundable)
 * Aesthetic: Modern Ultra-Luxury (Clean Whites #FFFFFF, Stone Grey #F8F9FA, Charcoal #1A202C)
 * Zero Gold Policy: Strictly NO gold, bronze, or yellow anywhere.
 * Branding: 'By properties-y.com' | Independent Real Estate Consultancy
 * WhatsApp CTA: +201277752731 (Solid Green #25D366)
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

export default function SodicLandingPage() {
  const WHATSAPP_NUMBER = '201277752731';
  const GLOBAL_WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20am%20inquiring%20about%20the%20SODIC%20New%20Release%20Portfolio`;

  // Specific Project CTAs
  const THE_LAKES_CTA = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20am%20inquiring%20about%20The%20Lakes%20at%20SODIC%20East`;
  const EASTVALE_CTA = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20am%20inquiring%20about%20Eastvale%20by%20SODIC`;

  // Form State
  const [fullName, setFullName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [modalWhatsappLink, setModalWhatsappLink] = useState(GLOBAL_WA_LINK);
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

  // Update Page Title for SEO
  useEffect(() => {
    document.title = 'EASTVALE & SODIC EAST – New Release | properties-y.com';
  }, []);

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

    const personalizedWaUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20properties-y.com%2C%20my%20name%20is%20${encodeURIComponent(
      clientName
    )}%20(${encodeURIComponent(
      fullPhone
    )}).%20I%20have%20registered%20for%20the%20SODIC%20New%20Release%20Portfolio%20and%20would%20like%20to%20receive%20brochures%2C%20master%20plans%2C%20and%20unit%20availability.`;
    setModalWhatsappLink(personalizedWaUrl);

    // Save Lead Locally
    try {
      const stored = JSON.parse(localStorage.getItem('properties_y_sodic_leads') || '[]');
      stored.push({
        name: clientName,
        phone: fullPhone,
        timestamp: new Date().toISOString(),
        portfolio: 'SODIC New Release Portfolio',
        consultancy: 'properties-y.com Independent Real Estate Consultancy'
      });
      localStorage.setItem('properties_y_sodic_leads', JSON.stringify(stored));
    } catch (err) {
      console.warn('Storage notice:', err);
    }

    // Google Tag Conversion Event Tracking
    if (typeof window !== 'undefined') {
      if (typeof window.gtag_report_form_conversion === 'function') {
        try {
          window.gtag_report_form_conversion();
        } catch (err) {
          console.warn('Form conversion notice:', err);
        }
      } else if (typeof window.gtag_report_conversion === 'function') {
        try {
          window.gtag_report_conversion();
        } catch (err) {
          console.warn('Conversion notice:', err);
        }
      } else if (typeof window.gtag === 'function') {
        try {
          window.gtag('event', 'conversion', {
            send_to: 'AW-18125180547/AZcICJes-qQcEIOd4cJD',
            value: 1.0,
            currency: 'EGP'
          });
          window.gtag('event', 'conversion', {
            send_to: 'AW-18125180547',
            value: 1.0,
            currency: 'EGP'
          });
          window.gtag('event', 'generate_lead', {
            send_to: 'AW-18125180547',
            value: 1.0,
            currency: 'EGP',
            event_category: 'form',
            event_label: 'SODIC Lead Form Submission'
          });
          window.gtag('event', 'lead_form_submission', {
            send_to: 'AW-18125180547'
          });
          window.gtag('event', 'conversion', {
            send_to: 'AW-18564830215/A7t2CIvYnLYdEIeos5RF',
            value: 1.0,
            currency: 'EGP'
          });
        } catch (err) {
          console.warn('GTag notice:', err);
        }
      }
    }

    // Zapier Lead Webhook Integration
    try {
      fetch('https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/', {
        method: 'POST',
        body: JSON.stringify({
          fullName: clientName,
          phoneNumber: fullPhone,
          portfolio: 'SODIC New Release Portfolio',
          consultancy: 'properties-y.com Independent Real Estate Consultancy',
          landingPageUrl: typeof window !== 'undefined' ? window.location.href : 'https://properties-y.com/sodic/',
          submissionDate: new Date().toISOString()
        })
      }).catch((err) => console.warn('Zapier notice:', err));
    } catch (err) {
      console.warn('Zapier transmission notice:', err);
    }

    setIsSubmitting(false);
    setIsModalOpen(true);
  };

  return (
    <div className="sodic-page-wrapper">
      {/* =========================================================================
           1. TOP NAVIGATION / STATUS BAR
           ========================================================================= */}
      <header className="sodic-top-nav">
        <div className="container sodic-nav-inner">
          <a href="/" className="sodic-brand-mark" aria-label="properties-y.com Home">
            <span className="brand-domain-tag">properties-y.com</span>
            <span className="brand-badge-pill">Independent Consultancy</span>
          </a>

          <div className="sodic-nav-actions">
            <span className="nav-consultancy-link">
              Advisory Desk: +201277752731
            </span>
          </div>
        </div>
      </header>

      {/* =========================================================================
           2. HERO SECTION (NEW RELEASE FOCUS)
           Badge/Eyebrow: NEW RELEASE
           Title: EASTVALE & SODIC EAST
           Subtitle: NOW COLLECTING EOIs — EGP 100,000 (Refundable). Secure your premium residence in our newest launch today.
           Features 'By properties-y.com' and includes the Lead Capture Form directly here.
           ========================================================================= */}
      <section className="sodic-hero" id="hero">
        <div className="hero-bg-layer">
          <img
            src="/images/hero-masterview.jpg"
            alt="EASTVALE &amp; SODIC EAST Architectural Showcase"
            loading="eager"
          />
        </div>
        <div className="hero-gradient-overlay"></div>

        <div className="container">
          <div className="hero-content-grid">
            {/* Left Hero Narrative */}
            <div className="hero-narrative">
              <div className="hero-eyebrow-pill">
                <span className="hero-eyebrow-dot"></span>
                NEW RELEASE
              </div>

              <h1 className="hero-main-title">
                EASTVALE &amp; SODIC EAST
              </h1>

              <p className="hero-lead-subtitle">
                NOW COLLECTING EOIs — EGP 100,000 (Refundable). Secure your premium residence in our newest launch today.
              </p>

              <div className="hero-consultancy-stamp">
                <span className="consultancy-stamp-dot"></span>
                <span className="consultancy-stamp-text">
                  Presented <strong>By properties-y.com</strong> &bull; Independent Real Estate Consultancy
                </span>
              </div>

              <div className="hero-trust-metrics">
                <div className="metric-item">
                  <span className="metric-value">100,000 EGP</span>
                  <span className="metric-label">Refundable EOI</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">1.5% &ndash; 5%</span>
                  <span className="metric-label">Starting Down Payment</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">Over 10 Yrs</span>
                  <span className="metric-label">Installment Horizon</span>
                </div>
              </div>
            </div>

            {/* Right Hero Lead Capture Form Card (Sleek White Floating Card) */}
            <div className="lead-card-floating" id="sodic-lead-form">
              <div className="card-header-block">
                <h3>Request Master Plans &amp; Pricing</h3>
                <p>Register below for priority unit allotment, official launch inventory, and complete brochures.</p>
              </div>

              <form onSubmit={handleFormSubmit} noValidate>
                {/* Full Name */}
                <div className="field-group">
                  <label htmlFor="sodicFullNameInput" className="field-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="sodicFullNameInput"
                    className="field-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder=""
                    required
                    autoComplete="name"
                  />
                </div>

                {/* Split Phone Input (Country Code left, blank input right) */}
                <div className="field-group">
                  <label htmlFor="sodicPhoneInput" className="field-label">
                    Mobile Number
                  </label>
                  <div className="phone-split-container">
                    <button
                      type="button"
                      className="country-selector-btn"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                    >
                      <span className="country-flag-icon">{selectedCountry.flag}</span>
                      <span className="country-dial-code">{selectedCountry.dial}</span>
                      <svg className="country-chevron-arrow" viewBox="0 0 24 24" fill="none">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>

                    {isDropdownOpen && (
                      <div className="country-dropdown-menu" role="listbox">
                        <div className="country-search-box">
                          <input
                            type="text"
                            className="country-search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search country..."
                            autoFocus
                          />
                        </div>
                        <div className="country-items-scroll">
                          {filteredCountries.map((c) => (
                            <div
                              key={c.code}
                              className={`country-option-row ${
                                c.code === selectedCountry.code ? 'is-active' : ''
                              }`}
                              onClick={() => {
                                setSelectedCountry(c);
                                setIsDropdownOpen(false);
                                setSearchQuery('');
                              }}
                            >
                              <span className="country-flag-icon">{c.flag}</span>
                              <span className="country-option-name">{c.name}</span>
                              <span className="country-option-dial">{c.dial}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Blank Phone Input */}
                    <input
                      type="tel"
                      id="sodicPhoneInput"
                      className="phone-split-input"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder=""
                      required
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-submit-luxury"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'DISPATCHING...' : 'REQUEST PROJECT DETAILS'}</span>
                </button>

                {/* Form Disclaimer */}
                <p className="card-disclaimer-text">
                  By properties-y.com &bull; Independent Real Estate Consultancy &bull; Strict Confidentiality. Prices and availability are subject to developer terms.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           3. PROJECT SECTIONS (CLEAN, MINIMALIST CARDS)
           SECTION A: THE LAKES | SODIC EAST (NEW LAUNCH)
           SECTION B: EASTVALE (MOSTAKBAL CITY)
           ========================================================================= */}

      {/* SECTION A: THE LAKES | SODIC EAST */}
      <section className="sodic-project-section" id="the-lakes-section">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">
              SECTION A &bull; NEW RELEASE &bull; NEW CAIRO
            </div>
            <div className="section-location-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>New Cairo Integrated Destination &bull; 650 Feddans</span>
            </div>
            <p className="section-lead-text">
              A 650-feddan integrated modern destination in New Cairo featuring vast green landscapes and a world-class sports club.
            </p>
          </div>

          <article className="project-card-full">
            <div className="project-card-grid">
              {/* Media Column */}
              <div className="project-media-col">
                <img
                  src="/images/sodic-east.jpg"
                  alt="The Lakes at SODIC East Master Community"
                  loading="lazy"
                />
                <div className="project-media-gradient"></div>

                {/* Visual Emblem Badge PNG */}
                <div className="project-brand-overlay">
                  <img
                    src="/images/sodic-east-logo.png"
                    alt="SODIC East Official Logo"
                  />
                </div>

                <span className="project-status-badge">New Release &bull; The Lakes</span>

                <div className="project-media-caption">
                  <div className="media-caption-title">The Lakes at SODIC East</div>
                  <div className="media-caption-subtitle">650 Feddans &bull; World-Class Sports Club &amp; Vast Green Landscapes</div>
                </div>
              </div>

              {/* Content Column */}
              <div className="project-content-col">
                <div>
                  {/* Official Brand Logo PNG Header (No redundant text title) */}
                  <div className="project-brand-badge" style={{ marginBottom: '16px' }}>
                    <img
                      src="/images/sodic-east-logo.png"
                      alt="SODIC East Logo"
                      className="project-badge-logo"
                      loading="lazy"
                    />
                  </div>

                  <div className="project-meta-eyebrow">NEW CAIRO &bull; 650-FEDDAN DESTINATION</div>

                  <p className="project-narrative-lead">
                    A 650-feddan integrated modern destination in New Cairo featuring vast green landscapes and a world-class sports club.
                  </p>

                  {/* Specs Matrix */}
                  <div className="project-specs-matrix">
                    <div className="spec-entry">
                      <span className="spec-entry-label">Location</span>
                      <span className="spec-entry-value">New Cairo</span>
                    </div>
                    <div className="spec-entry">
                      <span className="spec-entry-label">Masterplan Area</span>
                      <span className="spec-entry-value">650 Feddans</span>
                    </div>
                    <div className="spec-entry">
                      <span className="spec-entry-label">Finishing Specs</span>
                      <span className="spec-entry-value">Flexi Plus Finishing</span>
                    </div>
                    <div className="spec-entry">
                      <span className="spec-entry-label">Amenities</span>
                      <span className="spec-entry-value">World-Class Sports Club</span>
                    </div>
                  </div>

                  {/* Unit Typologies & Areas Matrix */}
                  <div className="unit-typologies-block">
                    <div className="typology-block-title">UNIT TYPOLOGIES &amp; AREAS</div>
                    <div className="typology-grid">
                      <div className="typology-chip">
                        <span className="typology-type">1 Bedroom</span>
                        <span className="typology-area">75 SQM</span>
                      </div>
                      <div className="typology-chip">
                        <span className="typology-type">2 Bedrooms</span>
                        <span className="typology-area">130 SQM</span>
                      </div>
                      <div className="typology-chip">
                        <span className="typology-type">3 Bedrooms</span>
                        <span className="typology-area">147 SQM</span>
                      </div>
                      <div className="typology-chip">
                        <span className="typology-type">3 Bedrooms Loft</span>
                        <span className="typology-area">220 SQM</span>
                      </div>
                      <div className="typology-chip">
                        <span className="typology-type">4 Bedrooms + Nanny</span>
                        <span className="typology-area">250 SQM</span>
                      </div>
                      <div className="typology-chip highlight-chip">
                        <span className="typology-type">NEW Duplex (Ground &amp; Upper)</span>
                        <span className="typology-area">200 SQM</span>
                      </div>
                    </div>
                  </div>

                  {/* Financials & Payment Plan */}
                  <div className="project-financials-block">
                    <div className="financials-unit-row">
                      <span className="unit-tier-label">Payment Schedule</span>
                      <span className="unit-tier-price">Over 10 Years</span>
                    </div>
                    <div className="payment-plan-badge-row">
                      <svg className="plan-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="payment-plan-text">Payment Plan: 1.5% Down Payment | Over 10 Years</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="project-cta-group">
                  <a
                    href={THE_LAKES_CTA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-card-whatsapp"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                    </svg>
                    <span>Inquire About The Lakes via WhatsApp</span>
                  </a>

                  <a
                    href="#hero"
                    className="btn-card-secondary"
                  >
                    Request Full Floor Plans &amp; Brochure
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION B: EASTVALE (MOSTAKBAL CITY) */}
      <section className="sodic-project-section" id="eastvale-section">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">
              SECTION B &bull; MOSTAKBAL CITY FLAGSHIP
            </div>
            <div className="section-location-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Mostakbal City Master Community</span>
            </div>
            <p className="section-lead-text">
              SODIC’s flagship masterplan in Mostakbal City, blending lush green spaces with modern architecture for ultimate privacy and serenity.
            </p>
          </div>

          <article className="project-card-full">
            <div className="project-card-grid">
              {/* Media Column */}
              <div className="project-media-col">
                <img
                  src="/images/east-vale.jpg"
                  alt="Eastvale by SODIC Mostakbal City"
                  loading="lazy"
                />
                <div className="project-media-gradient"></div>

                {/* Visual Emblem Badge PNG */}
                <div className="project-brand-overlay dark-overlay">
                  <img
                    src="/images/east-vale-logo.png"
                    alt="Eastvale Official Logo"
                  />
                </div>

                <span className="project-status-badge">Flagship Masterplan</span>

                <div className="project-media-caption">
                  <div className="media-caption-title">Eastvale by SODIC</div>
                  <div className="media-caption-subtitle">Lush Green Spaces &bull; Serene Modern Architecture</div>
                </div>
              </div>

              {/* Content Column */}
              <div className="project-content-col">
                <div>
                  {/* Official Brand Logo PNG Header (No redundant text title) */}
                  <div className="project-brand-badge dark-badge" style={{ marginBottom: '16px' }}>
                    <img
                      src="/images/east-vale-logo.png"
                      alt="Eastvale Logo"
                      className="project-badge-logo"
                      loading="lazy"
                    />
                  </div>

                  <div className="project-meta-eyebrow">MOSTAKBAL CITY &bull; FLAGSHIP COMMUNITY</div>

                  <p className="project-narrative-lead">
                    SODIC’s flagship masterplan in Mostakbal City, blending lush green spaces with modern architecture for ultimate privacy and serenity.
                  </p>

                  {/* Specs Matrix */}
                  <div className="project-specs-matrix">
                    <div className="spec-entry">
                      <span className="spec-entry-label">Location</span>
                      <span className="spec-entry-value">Mostakbal City</span>
                    </div>
                    <div className="spec-entry">
                      <span className="spec-entry-label">Finishing Specs</span>
                      <span className="spec-entry-value">Fully Finished with ACs</span>
                    </div>
                    <div className="spec-entry">
                      <span className="spec-entry-label">Architecture</span>
                      <span className="spec-entry-value">Modern Minimalist</span>
                    </div>
                    <div className="spec-entry">
                      <span className="spec-entry-label">Atmosphere</span>
                      <span className="spec-entry-value">Lush Greenery &amp; Privacy</span>
                    </div>
                  </div>

                  {/* Unit Typologies & Areas Matrix */}
                  <div className="unit-typologies-block">
                    <div className="typology-block-title">UNIT TYPOLOGIES &amp; AREAS</div>
                    <div className="typology-grid">
                      <div className="typology-chip">
                        <span className="typology-type">2 Bedrooms + Nanny</span>
                        <span className="typology-area">130 SQM</span>
                      </div>
                      <div className="typology-chip">
                        <span className="typology-type">3 Bedrooms + Nanny</span>
                        <span className="typology-area">170 SQM</span>
                      </div>
                      <div className="typology-chip">
                        <span className="typology-type">3 Bedrooms Loft</span>
                        <span className="typology-area">210 SQM</span>
                      </div>
                      <div className="typology-chip highlight-chip">
                        <span className="typology-type">3 Bedrooms Duplex</span>
                        <span className="typology-area">210 SQM</span>
                      </div>
                    </div>
                  </div>

                  {/* Financials & Payment Plan */}
                  <div className="project-financials-block">
                    <div className="financials-unit-row">
                      <span className="unit-tier-label">Payment Schedule</span>
                      <span className="unit-tier-price">Over 10 Years</span>
                    </div>
                    <div className="payment-plan-badge-row">
                      <svg className="plan-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="payment-plan-text">Payment Plan: 5% Down Payment | Over 10 Years</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="project-cta-group">
                  <a
                    href={EASTVALE_CTA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-card-whatsapp"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                    </svg>
                    <span>Inquire About Eastvale via WhatsApp</span>
                  </a>

                  <a
                    href="#hero"
                    className="btn-card-secondary"
                  >
                    Request Eastvale Floor Plans &amp; Brochure
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================================
           4. NEW RELEASE OVERVIEW TABLE (NO LOGO BEFORE FOOTER)
           ========================================================================= */}
      <section className="sodic-summary-section">
        <div className="container">
          <div className="section-header-block" style={{ marginBottom: '32px' }}>
            <div className="section-badge-pill">NEW RELEASE COMPARISON</div>
            <h2 className="section-main-title">Launch Inventory &amp; Terms</h2>
            <p className="section-lead-text">
              Direct comparison of featured SODIC New Release destinations curated by properties-y.com.
            </p>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Destination</th>
                  <th>Finishing Specs</th>
                  <th>Unit Typologies</th>
                  <th>Payment Plan</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-project-name">The Lakes | SODIC East</td>
                  <td>New Cairo (650 Feddans)</td>
                  <td>Flexi Plus Finishing</td>
                  <td>1–4 Beds, Lofts &amp; Duplexes (75–250 SQM)</td>
                  <td className="table-price-tag">1.5% DP | Over 10 Yrs</td>
                  <td>
                    <a
                      href={THE_LAKES_CTA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="table-action-link"
                    >
                      Inquire &rarr;
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="table-project-name">Eastvale</td>
                  <td>Mostakbal City Flagship</td>
                  <td>Fully Finished with ACs</td>
                  <td>2–3 Beds + Nanny, Lofts &amp; Duplexes (130–210 SQM)</td>
                  <td className="table-price-tag">5% DP | Over 10 Yrs</td>
                  <td>
                    <a
                      href={EASTVALE_CTA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="table-action-link"
                    >
                      Inquire &rarr;
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
           5. FOOTER (INDEPENDENT REAL ESTATE CONSULTANCY BRANDING)
           No SODIC Logo before or inside footer.
           Feature 'By properties-y.com' in the Footer.
           Position as an 'Independent Real Estate Consultancy'.
           ========================================================================= */}
      <footer className="sodic-footer">
        <div className="container footer-content-block">
          <div className="footer-brand-title">properties-y.com</div>
          <div className="footer-consultancy-subtitle">
            Independent Real Estate Consultancy &bull; Premium Property Advisory
          </div>

          <a
            href={GLOBAL_WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-wa-action-btn"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
            </svg>
            <span>Direct WhatsApp Advisory: +201277752731</span>
          </a>

          <p className="footer-compliance-text">
            This SODIC showcase is curated and published by <strong>properties-y.com</strong>, an Independent Real Estate Consultancy. We provide specialized advisory and strategic client representation for premium developments across Egypt. All trademarks, community names, architectural concepts, and developer marks belong strictly to SODIC and their respective registered owners. Pricing and availability reflect developer updates and are subject to change according to market dynamics.
          </p>

          <div className="footer-legal-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <span>&bull;</span>
            <a href="/terms-conditions">Terms &amp; Conditions</a>
          </div>

          <div className="footer-copyright">
            &copy; 2026 properties-y.com &mdash; Independent Real Estate Consultancy. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* =========================================================================
           6. FLOATING WHATSAPP BUTTON (SOLID GREEN #25D366)
           ========================================================================= */}
      <a
        href={GLOBAL_WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-widget"
        aria-label="Inquire via WhatsApp"
      >
        <svg viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
        </svg>
        <span>Chat on WhatsApp</span>
      </a>

      {/* =========================================================================
           7. SUCCESS MODAL OVERLAY (VERBATIM PROMPT SPECIFICATION)
           "Thank you {name}! Your registration has been securely dispatched to our senior consultancy team. A dedicated property advisor will contact you shortly with full brochures, master plans, and unit availability."
           Followed by green "CHAT ON WHATSAPP" button and "Close Window" link.
           ========================================================================= */}
      {isModalOpen && (
        <div
          className="modal-overlay is-active"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalSuccessTitle"
        >
          <div className="modal-dialog-card">
            <div className="modal-icon-wrap">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>

            <h3 id="modalSuccessTitle" className="modal-header-title">
              Registration Received
            </h3>

            {/* Verbatim Requirement */}
            <p className="modal-body-text">
              Thank you {submittedName || 'there'}! Your registration has been securely dispatched to our senior consultancy team. A dedicated property advisor will contact you shortly with full brochures, master plans, and unit availability.
            </p>

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

            <button
              type="button"
              className="btn-modal-dismiss"
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
