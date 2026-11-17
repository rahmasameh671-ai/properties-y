import React, { useState, useEffect } from 'react';
import '../../sodic.css';

/**
 * SODIC Exclusive Portfolio Landing Page Component
 * Route: /sodic/ strictly under properties-y.com domain architecture
 * Final Live URL: https://properties-y.com/sodic/
 *
 * Branding: 'By properties-y.com' | Independent Real Estate Consultancy
 * Aesthetic: Modern Ultra-Luxury (Aman / Apple sleekness | Zero Gold Policy)
 * Global WhatsApp: +201277752731 (Solid Vibrant Green #25D366)
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
  const GLOBAL_WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20am%20inquiring%20about%20the%20SODIC%20Exclusive%20Portfolio`;

  // Specific Project CTAs exactly as specified in the prompt
  const OGAMI_CTA = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20am%20inquiring%20about%20Ogami%20by%20SODIC.`;
  const EAST_VALE_CTA = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20am%20inquiring%20about%20East%20Vale%20by%20SODIC.`;
  const SODIC_EAST_CTA = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20am%20inquiring%20about%20SODIC%20East.`;

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

  // Update Page Title and Meta for SEO
  useEffect(() => {
    document.title = 'SODIC Signature Destinations | properties-y.com Exclusive Portfolio';
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
    )}).%20I%20have%20registered%20for%20the%20SODIC%20Exclusive%20Portfolio%20and%20would%20like%20to%20receive%20brochures%2C%20master%20plans%2C%20and%20unit%20availability.`;
    setModalWhatsappLink(personalizedWaUrl);

    // Save Lead Locally
    try {
      const stored = JSON.parse(localStorage.getItem('properties_y_sodic_leads') || '[]');
      stored.push({
        name: clientName,
        phone: fullPhone,
        timestamp: new Date().toISOString(),
        portfolio: 'SODIC Exclusive Portfolio',
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
          portfolio: 'SODIC Exclusive Portfolio',
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

  const scrollToHeroForm = () => {
    const el = document.getElementById('sodic-lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = document.getElementById('sodicFullNameInput');
      if (input) input.focus();
    }
  };

  return (
    <div className="sodic-page-wrapper">
      {/* =========================================================================
           1. TOP NAVIGATION / STATUS BAR (MODERN ULTRA-LUXURY)
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
           2. HERO SECTION
           Badge/Eyebrow: EXCLUSIVE PORTFOLIO
           Title: SODIC Signature Destinations
           Subtitle: Discover premium residential and coastal communities by SODIC,
           designed to elevate your lifestyle across New Cairo, Mostakbal City, and Ras El Hekma.
           Features 'By properties-y.com' and includes the Lead Capture Form here.
           ========================================================================= */}
      <section className="sodic-hero" id="hero">
        <div className="hero-bg-layer">
          <img
            src="/images/hero-masterview.jpg"
            alt="SODIC Signature Destinations Architectural Showcase"
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
                EXCLUSIVE PORTFOLIO
              </div>

              <div className="hero-developer-brand-tag">
                <img
                  src="/images/sodic-logo.png"
                  alt="SODIC Official Developer Mark"
                  className="hero-developer-logo"
                />
              </div>

              <h1 className="hero-main-title">
                SODIC Signature Destinations
              </h1>

              <p className="hero-lead-subtitle">
                Discover premium residential and coastal communities by SODIC, designed to elevate your lifestyle across New Cairo, Mostakbal City, and Ras El Hekma.
              </p>

              <div className="hero-consultancy-stamp">
                <span className="consultancy-stamp-dot"></span>
                <span className="consultancy-stamp-text">
                  Curated <strong>By properties-y.com</strong> &bull; Independent Real Estate Consultancy
                </span>
              </div>

              <div className="hero-trust-metrics">
                <div className="metric-item">
                  <span className="metric-value">3</span>
                  <span className="metric-label">Iconic Destinations</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">Up to 10 Yrs</span>
                  <span className="metric-label">Payment Flexibility</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">1.5% - 5%</span>
                  <span className="metric-label">Starting Down Payments</span>
                </div>
              </div>
            </div>

            {/* Right Hero Lead Capture Form Card (Sleek White Floating Card) */}
            <div className="lead-card-floating" id="sodic-lead-form">
              <div className="card-header-block">
                <h3>Request Master Plans &amp; Pricing</h3>
                <p>Register below for direct consultancy, real-time inventory, and complete brochures.</p>
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
                    placeholder="Enter your full name"
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

                    {/* Blank Phone Input (NO placeholder) */}
                    <input
                      type="tel"
                      id="sodicPhoneInput"
                      className="phone-split-input"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
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
                  <span>{isSubmitting ? 'DISPATCHING...' : 'Request Project Details'}</span>
                </button>

                {/* Form Disclaimer */}
                <p className="card-disclaimer-text">
                  By properties-y.com &bull; Independent Real Estate Consultancy &bull; Strict Confidentiality
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           4. PROJECT SECTIONS (CLEAN, MINIMALIST CARDS)
           Present the following three projects as visually stunning, separate sections:
           - SECTION A: Ogami by SODIC (Ras El Hekma)
           - SECTION B: East Vale (Mostakbal City)
           - SECTION C: SODIC East (New Cairo)
           ========================================================================= */}

      {/* SECTION A: Ogami by SODIC (Ras El Hekma) */}
      <section className="sodic-project-section" id="ogami-section">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">
              SECTION A &bull; RAS EL HEKMA COASTAL DESTINATION
            </div>
            <h2 className="section-main-title">Ogami by SODIC</h2>
            <div className="section-location-tag">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Ras El Hekma, Km 204 (Alexandria-Matrouh Road)</span>
            </div>
            <p className="section-lead-text">
              A 440-feddan Maldivian-inspired coastal destination featuring an 800m beachfront, crystal lagoons, and contemporary Japanese architecture.
            </p>
          </div>

          <article className="project-card-full">
            <div className="project-card-grid">
              {/* Media Column */}
              <div className="project-media-col">
                <img
                  src="/images/ogami.jpg"
                  alt="Ogami by SODIC Ras El Hekma"
                  loading="lazy"
                />
                <div className="project-media-gradient"></div>

                <div className="project-brand-overlay">
                  <img
                    src="/images/ogami-logo.png"
                    alt="Ogami by SODIC Brand Mark"
                  />
                </div>

                <span className="project-status-badge">North Coast Coastal Haven</span>

                <div className="project-media-caption">
                  <div className="media-caption-title">Maldivian-Inspired Waterfront</div>
                  <div className="media-caption-subtitle">800-Meter Pristine Beachfront &bull; Crystal Lagoons</div>
                </div>
              </div>

              {/* Content Column */}
              <div className="project-content-col">
                <div>
                  <div className="project-meta-eyebrow">RAS EL HEKMA &bull; KM 204</div>
                  <h3 className="project-content-heading">Ogami by SODIC</h3>
                  <p className="project-narrative-lead">
                    A 440-feddan Maldivian-inspired coastal destination featuring an 800m beachfront, crystal lagoons, and contemporary Japanese architecture.
                  </p>

                  {/* Specs Matrix */}
                  <div className="project-specs-matrix">
                    <div className="spec-entry">
                      <span className="spec-entry-label">Location</span>
                      <span className="spec-entry-value">Ras El Hekma, Km 204</span>
                    </div>
                    <div className="spec-entry">
                      <span className="spec-entry-label">Beachfront</span>
                      <span className="spec-entry-value">800m Coastal Frontage</span>
                    </div>
                    <div className="spec-entry">
                      <span className="spec-entry-label">Masterplan Area</span>
                      <span className="spec-entry-value">440 Feddans</span>
                    </div>
                    <div className="spec-entry">
                      <span className="spec-entry-label">Architecture</span>
                      <span className="spec-entry-value">Contemporary Japanese</span>
                    </div>
                  </div>

                  {/* Financials & Payment Plan */}
                  <div className="project-financials-block">
                    <div className="financials-unit-row">
                      <span className="unit-tier-label">Unit Types</span>
                      <span className="unit-tier-price">Fully Finished Chalets &amp; Signature Villas</span>
                    </div>
                    <div className="financials-unit-row">
                      <span className="unit-tier-label">Starting Price</span>
                      <span className="unit-tier-price">18,800,000 EGP</span>
                    </div>
                    <div className="payment-plan-badge-row">
                      <svg className="plan-badge-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="payment-plan-text">Payment Plan: Installments over 7 Years</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="project-cta-group">
                  <a
                    href={OGAMI_CTA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-card-whatsapp"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                    </svg>
                    <span>Inquire About Ogami via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={scrollToHeroForm}
                    className="btn-card-secondary"
                  >
                    Request Ogami Master Plan &amp; Brochure
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION B: East Vale (Mostakbal City) */}
      <section className="sodic-project-section" id="east-vale-section">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">
              SECTION B &bull; MOSTAKBAL CITY FLAGSHIP MASTERPLAN
            </div>
            <h2 className="section-main-title">East Vale</h2>
            <div className="section-location-tag">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Mostakbal City</span>
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
                  alt="East Vale by SODIC Mostakbal City"
                  loading="lazy"
                />
                <div className="project-media-gradient"></div>

                <div className="project-brand-overlay">
                  <img
                    src="/images/east-vale-logo.png"
                    alt="East Vale Brand Mark"
                  />
                </div>

                <span className="project-status-badge">Flagship Mostakbal City</span>

                <div className="project-media-caption">
                  <div className="media-caption-title">Modern Architectural Serenity</div>
                  <div className="media-caption-subtitle">Lush Green Landscapes &bull; Ultimate Residential Privacy</div>
                </div>
              </div>

              {/* Content Column */}
              <div className="project-content-col">
                <div>
                  <div className="project-meta-eyebrow">MOSTAKBAL CITY &bull; SIGNATURE LIVING</div>
                  <h3 className="project-content-heading">East Vale</h3>
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
                      <span className="spec-entry-label">Finish Specs</span>
                      <span className="spec-entry-value">Fully Finished units with ACs</span>
                    </div>
                    <div className="spec-entry">
                      <span className="spec-entry-label">Environment</span>
                      <span className="spec-entry-value">Lush Green Landscapes</span>
                    </div>
                    <div className="spec-entry">
                      <span className="spec-entry-label">Developer</span>
                      <span className="spec-entry-value">SODIC Master Developer</span>
                    </div>
                  </div>

                  {/* Financials & Payment Plan */}
                  <div className="project-financials-block">
                    <div className="financials-unit-row">
                      <span className="unit-tier-label">Premium Apartments</span>
                      <span className="unit-tier-price">Starting from 10,500,000 EGP</span>
                    </div>
                    <div className="financials-unit-row">
                      <span className="unit-tier-label">Signature Villas</span>
                      <span className="unit-tier-price">Starting from 33,000,000 EGP</span>
                    </div>
                    <div className="financials-unit-row">
                      <span className="unit-tier-label">Unit Specifications</span>
                      <span className="unit-tier-price" style={{ fontSize: '0.9rem' }}>Fully Finished units with ACs</span>
                    </div>
                    <div className="payment-plan-badge-row">
                      <svg className="plan-badge-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="payment-plan-text">Payment Plan: 5% Down Payment | 9 Years Installments</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="project-cta-group">
                  <a
                    href={EAST_VALE_CTA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-card-whatsapp"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                    </svg>
                    <span>Inquire About East Vale via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={scrollToHeroForm}
                    className="btn-card-secondary"
                  >
                    Request East Vale Master Plan &amp; Brochure
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION C: SODIC East (New Cairo) */}
      <section className="sodic-project-section" id="sodic-east-section">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">
              SECTION C &bull; NEW CAIRO INTEGRATED DESTINATION
            </div>
            <h2 className="section-main-title">SODIC East</h2>
            <div className="section-location-tag">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>New Cairo</span>
            </div>
            <p className="section-lead-text">
              A 650-feddan integrated modern destination featuring vast green landscapes and a world-class sports club.
            </p>
          </div>

          <article className="project-card-full">
            <div className="project-card-grid">
              {/* Media Column */}
              <div className="project-media-col">
                <img
                  src="/images/sodic-east.jpg"
                  alt="SODIC East New Cairo"
                  loading="lazy"
                />
                <div className="project-media-gradient"></div>

                <div className="project-brand-overlay">
                  <img
                    src="/images/sodic-east-logo.png"
                    alt="SODIC East Brand Mark"
                  />
                </div>

                <span className="project-status-badge">650-Feddan Community</span>

                <div className="project-media-caption">
                  <div className="media-caption-title">Integrated Modern Destination</div>
                  <div className="media-caption-subtitle">Vast Green Landscapes &bull; World-Class Sports Club</div>
                </div>
              </div>

              {/* Content Column */}
              <div className="project-content-col">
                <div>
                  <div className="project-meta-eyebrow">NEW CAIRO &bull; INTEGRATED DESTINATION</div>
                  <h3 className="project-content-heading">SODIC East</h3>
                  <p className="project-narrative-lead">
                    A 650-feddan integrated modern destination featuring vast green landscapes and a world-class sports club.
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
                      <span className="spec-entry-label">Amenities</span>
                      <span className="spec-entry-value">World-Class Sports Club</span>
                    </div>
                    <div className="spec-entry">
                      <span className="spec-entry-label">Nature</span>
                      <span className="spec-entry-value">Expansive Green Parks</span>
                    </div>
                  </div>

                  {/* Financials & Payment Plan */}
                  <div className="project-financials-block">
                    <div className="financials-unit-row">
                      <span className="unit-tier-label">Premium Apartments</span>
                      <span className="unit-tier-price">Starting from 13,500,000 EGP</span>
                    </div>
                    <div className="financials-unit-row">
                      <span className="unit-tier-label">Signature Villas</span>
                      <span className="unit-tier-price">Starting from 28,000,000 EGP</span>
                    </div>
                    <div className="payment-plan-badge-row">
                      <svg className="plan-badge-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="payment-plan-text">Payment Plan: 1.5% Down Payment | 10 Years Installments</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="project-cta-group">
                  <a
                    href={SODIC_EAST_CTA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-card-whatsapp"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                    </svg>
                    <span>Inquire About SODIC East via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={scrollToHeroForm}
                    className="btn-card-secondary"
                  >
                    Request SODIC East Master Plan &amp; Brochure
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================================
           5. PORTFOLIO COMPARISON SUMMARY (MINIMALIST MATRIX)
           ========================================================================= */}
      <section className="sodic-summary-section">
        <div className="container">
          <div className="section-header-block" style={{ marginBottom: '32px' }}>
            <div className="section-badge-pill">CURATED SUMMARY</div>
            <h2 className="section-main-title">SODIC Portfolio Quick Overview</h2>
            <p className="section-lead-text">
              Direct comparison of key SODIC destinations curated by properties-y.com.
            </p>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Location</th>
                  <th>Unit Types</th>
                  <th>Starting Price</th>
                  <th>Payment Plan</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-project-name">Ogami by SODIC</td>
                  <td>Ras El Hekma, Km 204</td>
                  <td>Fully Finished Chalets &amp; Villas</td>
                  <td className="table-price-tag">18,800,000 EGP</td>
                  <td>Installments over 7 Years</td>
                  <td>
                    <a
                      href={OGAMI_CTA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="table-action-link"
                    >
                      Inquire &rarr;
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="table-project-name">East Vale</td>
                  <td>Mostakbal City</td>
                  <td>Apartments &amp; Signature Villas</td>
                  <td className="table-price-tag">From 10,500,000 EGP</td>
                  <td>5% DP | 9 Yrs</td>
                  <td>
                    <a
                      href={EAST_VALE_CTA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="table-action-link"
                    >
                      Inquire &rarr;
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="table-project-name">SODIC East</td>
                  <td>New Cairo</td>
                  <td>Apartments &amp; Signature Villas</td>
                  <td className="table-price-tag">From 13,500,000 EGP</td>
                  <td>1.5% DP | 10 Yrs</td>
                  <td>
                    <a
                      href={SODIC_EAST_CTA}
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
           6. FOOTER (INDEPENDENT REAL ESTATE CONSULTANCY BRANDING)
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
            This SODIC showcase is curated and published by <strong>properties-y.com</strong>, an Independent Real Estate Consultancy. We provide specialized advisory and client representation for premium developments across Egypt. All trademarks, community names, architectural concepts, and developer marks belong strictly to SODIC and their respective registered owners. Pricing and availability reflect developer updates and are subject to change according to market dynamics.
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
           7. FLOATING WHATSAPP BUTTON (SOLID VIBRANT GREEN #25D366)
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
           8. SUCCESS MODAL OVERLAY (VERBATIM PROMPT SPECIFICATION)
           "Thank you {name}! Your registration has been securely dispatched to our senior consultancy team. A dedicated property advisor will contact you shortly with full brochures, master plans, and unit availability."
           Followed by a green "CHAT ON WHATSAPP" button and "Close Window" link.
           ========================================================================= */}
      <div
        className={`modal-overlay ${isModalOpen ? 'is-active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalSuccessHeading"
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

          <h3 id="modalSuccessHeading" className="modal-header-title">
            Registration Received
          </h3>

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
    </div>
  );
}
