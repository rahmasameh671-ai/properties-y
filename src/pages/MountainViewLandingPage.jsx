import React, { useState } from 'react';
import '../../mountain-view/mountain-view.css';

/**
 * Mountain View Exclusive Portfolio Landing Page Component
 * Explicit Route: /mountain-view strictly under properties-y.com domain architecture
 * Final Live URL: https://properties-y.com/mountain-view
 * Branding: 'By properties-y.com' | Independent Real Estate Consultancy
 * Aesthetic: Radically New High-Fashion Calm Luxury | Zero Gold Policy | Asymmetric Cards
 * Global WhatsApp: Strictly +201277752731 (Solid Vibrant Green #25D366)
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

export default function MountainViewLandingPage() {
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

  const modalWhatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20I%20have%20just%20submitted%20my%20inquiry%20for%20Mountain%20View%20on%20properties-y.com%20and%20would%20like%20to%20receive%20the%20brochures%20and%20availability%20right%20away`;

  // Handle Form Submission
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
      const stored = JSON.parse(localStorage.getItem('properties_y_mountain_view_leads') || '[]');
      stored.push({
        name: clientName,
        phone: fullPhone,
        timestamp: new Date().toISOString(),
        portfolio: 'Mountain View Exclusive Portfolio',
        consultancy: 'properties-y.com Independent Real Estate Consultancy'
      });
      localStorage.setItem('properties_y_mountain_view_leads', JSON.stringify(stored));
    } catch (err) {
      console.warn('Storage warning:', err);
    }

    // Google Tag Conversion Event Tracking
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-18125180547/AZcICJes-qQcEIOd4cJD'
        });
        window.gtag('event', 'generate_lead', {
          event_category: 'form',
          event_label: 'Mountain View Lead Inquiry'
        });
      } catch (err) {
        console.warn('Gtag tracking warning:', err);
      }
    }

    // Asynchronous Dispatch
    try {
      fetch('https://formsubmit.co/ajax/Rahma@irtkaz.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: clientName,
          phone: fullPhone,
          source: 'Mountain View Portfolio – properties-y.com',
          consultancy: 'properties-y.com Independent Real Estate Consultancy',
          _replyto: 'Rahma@irtkaz.com',
          _cc: 'Mostafa.a.ashmawy@gmail.com,Mostafa.ashmawy@irtkaz.com',
          _subject: `New Lead: Mountain View - ${clientName} (${fullPhone}) [properties-y.com]`,
          _template: 'table'
        })
      }).catch((err) => console.warn('Dispatch notification notice:', err));
    } catch (err) {
      console.warn('Dispatch notice:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(true);
      setFullName('');
      setPhoneNumber('');

      try {
        window.open(modalWhatsappLink, '_blank', 'noopener,noreferrer');
      } catch {
        // Fallback in modal UI
      }
    }, 450);
  };

  // Filter countries for dropdown
  const filteredCountries = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
    c.dial.includes(searchQuery.trim()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="mountain-view-page-wrap">

      {/* =========================================================================
           1. HERO SECTION (STARTS DIRECTLY AT TOP: 0 – NO TOP FIXED NAVBAR)
           ========================================================================= */}
      <header className="mv-hero-section" id="hero">
        <div className="hero-overlay" />

        <div className="container hero-editorial-grid">

          {/* Hero Left Column: Mountain View 1.1 Exclusive Offer */}
          <div className="hero-content-column">

            <div className="hero-brand-signature-bar">
              <img 
                src="/images/mountain-view/logo-mv-1-1.png" 
                alt="Mountain View 1.1 Official Crest" 
                className="hero-brand-logo-img"
                width="150"
                height="auto"
              />
              <div className="hero-signature-label">
                <span className="signature-by">By properties-y.com</span>
                <span className="signature-role">Independent Real Estate Consultancy</span>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <span className="chic-badge chic-badge-dark">EXCLUSIVE OFFER • NEW CAIRO</span>
            </div>

            <h1 className="hero-main-headline">
              Mountain View 1.1
              <span>Ready to Move • Fully Finished Luxury Residences</span>
            </h1>

            <p className="hero-lead-text">
              Immediate delivery with turnkey luxury finishing in New Cairo. Exclusive 10% down payment with 7 years installments through properties-y.com.
            </p>

            {/* Simplified & Refined Offer Terms (4 Core Highlights) */}
            <div className="hero-terms-highlights">
              <div className="term-highlight-card">
                <span className="term-stat-number">14.5M EGP</span>
                <span className="term-stat-label">Starting Price</span>
              </div>
              <div className="term-highlight-card">
                <span className="term-stat-number">Ready to Move</span>
                <span className="term-stat-label">Immediate Delivery (استلام فوري)</span>
              </div>
              <div className="term-highlight-card">
                <span className="term-stat-number">Fully Finished</span>
                <span className="term-stat-label">Turnkey Units (متشطب)</span>
              </div>
              <div className="term-highlight-card">
                <span className="term-stat-number">7 Years</span>
                <span className="term-stat-label">10% Down Payment</span>
              </div>
            </div>

            {/* Quick WhatsApp Direct CTA in Hero */}
            <div className="hero-quick-cta">
              <a 
                href="https://wa.me/201277752731?text=Hello%2C%20I%20am%20inquiring%20about%20Mountain%20View%201.1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp-solid">
                <svg viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.31 4.55 17.87 6.11C19.42 7.67 20.28 9.73 20.28 11.93C20.27 16.48 16.59 20.15 12.05 20.15ZM16.56 14.33C16.31 14.2 15.09 13.6 14.86 13.52C14.64 13.44 14.47 13.4 14.31 13.65C14.15 13.9 13.68 14.45 13.54 14.61C13.4 14.77 13.26 14.79 13.01 14.66C12.76 14.54 11.96 14.27 11.01 13.43C10.27 12.77 9.77 11.96 9.63 11.71C9.49 11.46 9.61 11.33 9.74 11.2C9.85 11.09 9.99 10.91 10.12 10.76C10.25 10.61 10.29 10.5 10.37 10.33C10.45 10.16 10.41 10.02 10.35 9.89C10.29 9.76 9.79 8.54 9.59 8.04C9.39 7.56 9.18 7.62 9.03 7.61C8.89 7.6 8.72 7.6 8.55 7.6C8.38 7.6 8.11 7.66 7.88 7.91C7.65 8.16 7 8.77 7 10.01C7 11.25 7.9 12.44 8.02 12.61C8.14 12.77 9.8 15.33 12.33 16.42C12.93 16.68 13.4 16.84 13.76 16.95C14.36 17.14 14.91 17.12 15.34 17.05C15.82 16.98 16.82 16.45 17.03 15.86C17.23 15.27 17.23 14.77 17.17 14.66C17.11 14.56 16.95 14.49 16.7 14.37L16.56 14.33Z"/>
                </svg>
                <span>INQUIRE ABOUT MV 1.1</span>
              </a>
            </div>

          </div>

          {/* Hero Right Column: Frosted Glass Lead Capture Form */}
          <div className="hero-form-column">
            <div className="frosted-lead-card">
              
              <div className="form-header-block">
                <span className="form-eyebrow">BY PROPERTIES-Y.COM</span>
                <h2 className="form-headline">REGISTER YOUR INTEREST</h2>
                <p className="form-subtext">Direct allocation access, official brochures, and tailored payment plans.</p>
              </div>

              <form onSubmit={handleFormSubmit} noValidate>
                
                {/* Full Name: Clean blank input, NO placeholder examples */}
                <div className="lead-form-group">
                  <label htmlFor="reactFullName" className="lead-form-label">Full Name</label>
                  <input 
                    type="text" 
                    id="reactFullName" 
                    name="fullName" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="lead-input-text" 
                    required 
                    autoComplete="name"
                  />
                </div>

                {/* Phone Number: Split Input Layout (UTF-8 Flags Dropdown + Blank Input) */}
                <div className="lead-form-group">
                  <label htmlFor="reactPhoneInput" className="lead-form-label">Phone Number</label>
                  
                  <div className="phone-split-container">
                    
                    {/* Trigger Button */}
                    <button 
                      type="button" 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="country-dropdown-trigger" 
                      aria-haspopup="true" 
                      aria-expanded={isDropdownOpen}
                      title="Select Country Dial Code">
                      <span className="trigger-flag">{selectedCountry.flag}</span>
                      <span className="trigger-dial">{selectedCountry.dial}</span>
                      <svg className="trigger-chevron" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>

                    {/* Popover Dropdown */}
                    {isDropdownOpen && (
                      <div className="country-dropdown-popover is-open" style={{ display: 'block' }}>
                        <div className="country-search-wrap">
                          <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="country-search-input" 
                            placeholder="Search country or code..." 
                            autoFocus
                          />
                        </div>
                        <div className="country-options-scroll">
                          {filteredCountries.length === 0 ? (
                            <div style={{ padding: '12px 14px', fontSize: '0.82rem', color: '#718096' }}>
                              No country found
                            </div>
                          ) : (
                            filteredCountries.map((c) => (
                              <div
                                key={c.code}
                                role="button"
                                tabIndex={0}
                                className={`country-option-item ${c.code === selectedCountry.code ? 'is-selected' : ''}`}
                                onClick={() => {
                                  setSelectedCountry(c);
                                  setIsDropdownOpen(false);
                                  setSearchQuery('');
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    setSelectedCountry(c);
                                    setIsDropdownOpen(false);
                                    setSearchQuery('');
                                  }
                                }}>
                                <span className="country-option-flag">{c.flag}</span>
                                <span className="country-option-name">{c.name}</span>
                                <span className="country-option-dial">{c.dial}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {/* Blank Phone Input (NO placeholder text) */}
                    <input 
                      type="tel" 
                      id="reactPhoneInput" 
                      name="phoneNumber" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="phone-number-field" 
                      required 
                      autoComplete="tel-national"
                    />
                  </div>
                </div>

                {/* Solid Charcoal Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="btn-charcoal-solid">
                  {isSubmitting ? 'PROCESSING...' : 'REGISTER INTEREST'}
                </button>
              </form>

              {/* Form Legal Disclaimer */}
              <p className="form-legal-disclaimer">
                By submitting, you agree to receive communications from <strong>properties-y.com</strong> regarding real estate projects. This landing page is operated by <strong>properties-y.com</strong>, an Independent Real Estate Consultancy, and is not the official website of the developer. Prices and availability are subject to change.
              </p>

              <div className="form-legal-links">
                <a href="/privacy-policy">Privacy Policy</a>
                <span>•</span>
                <a href="/terms-conditions">Terms & Conditions</a>
              </div>

            </div>
          </div>

        </div>
      </header>

      {/* =========================================================================
           2. DEDICATED PROJECT SECTIONS (ONE COMPOUND PER SECTION)
           ========================================================================= */}
      <main className="portfolio-curation-section">
        <div className="container">

          <div className="section-editorial-intro">
            <span className="editorial-kicker">CURATED MASTER DEVELOPMENTS</span>
            <h2 className="editorial-section-title">The Mountain View Living Portfolio</h2>
            <p className="editorial-section-desc">
              Explore five distinctive residential sanctuaries across East Cairo, engineered with innovative master planning, lush park systems, and market-defining payment arrangements.
            </p>
          </div>

          {/* SECTION 1: MOUNTAIN VIEW 1.1 */}
          <article className="editorial-project-row" id="mountain-view-1-1">
            <div className="project-visual-column">
              <div className="project-image-frame">
                <img 
                  src="/images/mountain-view/mv-1-1.webp" 
                  alt="Mountain View 1.1 New Cairo" 
                  loading="lazy" 
                />
                <div className="floating-payment-tag">
                  <span className="tag-accent">7 YEARS PLAN</span>
                  <span className="tag-plan">10% Down Payment • 7 Years Installments</span>
                </div>
              </div>
            </div>

            <div className="project-info-column">
              <div className="project-meta-header">
                <span className="project-index-number">01 / 05</span>
                <span className="project-location-badge">New Cairo</span>
              </div>

              {/* Official Project Logo as Prominent Section Heading */}
              <div className="project-logo-heading-wrap">
                <img 
                  src="/images/mountain-view/logo-mv-1-1.png" 
                  alt="Mountain View 1.1 Official Logo" 
                  className="project-hero-logo logo-mv-1-1"
                  loading="lazy" 
                />
              </div>

              <h3 className="project-title-editorial">Mountain View 1.1</h3>
              <p className="project-subtitle-editorial">Fully Finished Ready-To-Move Residences in New Cairo</p>

              <div className="project-terms-matrix">
                <div className="terms-matrix-grid">
                  <div className="matrix-cell">
                    <span className="matrix-cell-label">Starting Price</span>
                    <span className="matrix-cell-value">14,500,000 EGP</span>
                    <span className="matrix-cell-sub">Starting Rate</span>
                  </div>
                  <div className="matrix-cell">
                    <span className="matrix-cell-label">Down Payment</span>
                    <span className="matrix-cell-value">10%</span>
                    <span className="matrix-cell-sub">Immediate Reservation</span>
                  </div>
                  <div className="matrix-cell cell-full">
                    <span className="matrix-cell-label">Payment Plan</span>
                    <span className="matrix-cell-value">7 Years</span>
                    <span className="matrix-cell-sub">10% Down Payment | 7 Years Installments</span>
                  </div>
                </div>
              </div>

              <div className="project-highlights-box">
                <span className="highlights-label">Key Highlights</span>
                <p className="highlights-text">Fully finished units, ready to move in.</p>
              </div>

              <div className="project-actions-block">
                <a 
                  href="https://wa.me/201277752731?text=Hello%2C%20I%20am%20inquiring%20about%20Mountain%20View%201.1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-whatsapp-solid">
                  <svg viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.31 4.55 17.87 6.11C19.42 7.67 20.28 9.73 20.28 11.93C20.27 16.48 16.59 20.15 12.05 20.15ZM16.56 14.33C16.31 14.2 15.09 13.6 14.86 13.52C14.64 13.44 14.77 13.4 14.31 13.65C14.15 13.9 13.68 14.45 13.54 14.61C13.4 14.77 13.26 14.79 13.01 14.66C12.76 14.54 11.96 14.27 11.01 13.43C10.27 12.77 9.77 11.96 9.63 11.71C9.49 11.46 9.61 11.33 9.74 11.2C9.85 11.09 9.99 10.91 10.12 10.76C10.25 10.61 10.29 10.5 10.37 10.33C10.45 10.16 10.41 10.02 10.35 9.89C10.29 9.76 9.79 8.54 9.59 8.04C9.39 7.56 9.18 7.62 9.03 7.61C8.89 7.6 8.72 7.6 8.55 7.6C8.38 7.6 8.11 7.66 7.88 7.91C7.65 8.16 7.88 7.91C7.65 8.16 7 8.77 7 10.01C7 11.25 7.9 12.44 8.02 12.61C8.14 12.77 9.8 15.33 12.33 16.42C12.93 16.68 13.4 16.84 13.76 16.95C14.36 17.14 14.91 17.12 15.34 17.05C15.82 16.98 16.82 16.45 17.03 15.86C17.23 15.27 17.23 14.77 17.17 14.66C17.11 14.56 16.95 14.49 16.7 14.37L16.56 14.33Z"/>
                  </svg>
                  <span>INQUIRE ON WHATSAPP</span>
                </a>
              </div>
            </div>
          </article>

          {/* SECTION 2: MOUNTAIN VIEW ICITY */}
          <article className="editorial-project-row row-inverted" id="mountain-view-icity">
            <div className="project-visual-column">
              <div className="project-image-frame">
                <img 
                  src="/images/mountain-view/mv-icity.webp" 
                  alt="Mountain View iCity New Cairo" 
                  loading="lazy" 
                />
                <div className="floating-payment-tag">
                  <span className="tag-accent">8 YEARS PLAN</span>
                  <span className="tag-plan">5% Down Payment • 8 Years Installments</span>
                </div>
              </div>
            </div>

            <div className="project-info-column">
              <div className="project-meta-header">
                <span className="project-index-number">02 / 05</span>
                <span className="project-location-badge">New Cairo</span>
              </div>

              {/* Official Project Logo as Prominent Section Heading */}
              <div className="project-logo-heading-wrap">
                <img 
                  src="/images/mountain-view/logo-mv-icity.png" 
                  alt="Mountain View iCity Official Logo" 
                  className="project-hero-logo logo-mv-icity"
                  loading="lazy" 
                />
              </div>

              <h3 className="project-title-editorial">Mountain View iCity</h3>
              <p className="project-subtitle-editorial">Integrated Smart City Living in New Cairo</p>

              <div className="project-terms-matrix">
                <div className="terms-matrix-grid">
                  <div className="matrix-cell">
                    <span className="matrix-cell-label">Starting Price</span>
                    <span className="matrix-cell-value">15,000,000 EGP</span>
                    <span className="matrix-cell-sub">Starting Rate</span>
                  </div>
                  <div className="matrix-cell">
                    <span className="matrix-cell-label">Down Payment</span>
                    <span className="matrix-cell-value">5%</span>
                    <span className="matrix-cell-sub">Immediate Reservation</span>
                  </div>
                  <div className="matrix-cell cell-full">
                    <span className="matrix-cell-label">Payment Plan</span>
                    <span className="matrix-cell-value">8 Years</span>
                    <span className="matrix-cell-sub">5% Down Payment | 8 Years Installments</span>
                  </div>
                </div>
              </div>

              <div className="project-highlights-box">
                <span className="highlights-label">Key Highlights</span>
                <p className="highlights-text">Integrated city living, central green parks, and premium entertainment facilities.</p>
              </div>

              <div className="project-actions-block">
                <a 
                  href="https://wa.me/201277752731?text=Hello%2C%20I%20am%20inquiring%20about%20Mountain%20View%20iCity" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-whatsapp-solid">
                  <svg viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.31 4.55 17.87 6.11C19.42 7.67 20.28 9.73 20.28 11.93C20.27 16.48 16.59 20.15 12.05 20.15ZM16.56 14.33C16.31 14.2 15.09 13.6 14.86 13.52C14.64 13.44 14.47 13.4 14.31 13.65C14.15 13.9 13.68 14.45 13.54 14.61C13.4 14.77 13.26 14.79 13.01 14.66C12.76 14.54 11.96 14.27 11.01 13.43C10.27 12.77 9.77 11.96 9.63 11.71C9.49 11.46 9.61 11.33 9.74 11.2C9.85 11.09 9.99 10.91 10.12 10.76C10.25 10.61 10.29 10.5 10.37 10.33C10.45 10.16 10.41 10.02 10.35 9.89C10.29 9.76 9.79 8.54 9.59 8.04C9.39 7.56 9.18 7.62 9.03 7.61C8.89 7.6 8.72 7.6 8.55 7.6C8.38 7.6 8.11 7.66 7.88 7.91C7.65 8.16 7 8.77 7 10.01C7 11.25 7.9 12.44 8.02 12.61C8.14 12.77 9.8 15.33 12.33 16.42C12.93 16.68 13.4 16.84 13.76 16.95C14.36 17.14 14.91 17.12 15.34 17.05C15.82 16.98 16.82 16.45 17.03 15.86C17.23 15.27 17.23 14.77 17.17 14.66C17.11 14.56 16.95 14.49 16.7 14.37L16.56 14.33Z"/>
                  </svg>
                  <span>INQUIRE ON WHATSAPP</span>
                </a>
              </div>
            </div>
          </article>

          {/* SECTION 3: MOUNTAIN VIEW HYDE PARK */}
          <article className="editorial-project-row" id="mountain-view-hyde-park">
            <div className="project-visual-column">
              <div className="project-image-frame">
                <img 
                  src="/images/mountain-view/mv-hydepark.webp" 
                  alt="Mountain View Hyde Park New Cairo" 
                  loading="lazy" 
                />
                <div className="floating-payment-tag">
                  <span className="tag-accent">7 YEARS PLAN</span>
                  <span className="tag-plan">15% Down Payment • 7 Years Installments</span>
                </div>
              </div>
            </div>

            <div className="project-info-column">
              <div className="project-meta-header">
                <span className="project-index-number">03 / 05</span>
                <span className="project-location-badge">New Cairo (200-Acre Masterpiece)</span>
              </div>

              {/* Official Project Logo as Prominent Section Heading */}
              <div className="project-logo-heading-wrap">
                <img 
                  src="/images/mountain-view/logo-mv-official-black.png" 
                  alt="Mountain View Hyde Park Official Crest" 
                  className="project-hero-logo logo-mv-official"
                  loading="lazy" 
                />
              </div>

              <h3 className="project-title-editorial">Mountain View Hyde Park</h3>
              <p className="project-subtitle-editorial">Signature i-Villas in a 200-Acre Masterpiece</p>

              <div className="project-terms-matrix">
                <div className="terms-matrix-grid">
                  <div className="matrix-cell">
                    <span className="matrix-cell-label">Starting Price</span>
                    <span className="matrix-cell-value">28,000,000 EGP</span>
                    <span className="matrix-cell-sub">Starting Rate</span>
                  </div>
                  <div className="matrix-cell">
                    <span className="matrix-cell-label">Down Payment</span>
                    <span className="matrix-cell-value">15%</span>
                    <span className="matrix-cell-sub">Immediate Reservation</span>
                  </div>
                  <div className="matrix-cell cell-full">
                    <span className="matrix-cell-label">Payment Plan</span>
                    <span className="matrix-cell-value">7 Years</span>
                    <span className="matrix-cell-sub">15% Down Payment | 7 Years Installments</span>
                  </div>
                </div>
              </div>

              <div className="project-highlights-box">
                <span className="highlights-label">Key Highlights</span>
                <p className="highlights-text">Expansive masterplan featuring signature i-Villas.</p>
              </div>

              <div className="project-actions-block">
                <a 
                  href="https://wa.me/201277752731?text=Hello%2C%20I%20am%20inquiring%20about%20Mountain%20View%20Hyde%20Park" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-whatsapp-solid">
                  <svg viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.31 4.55 17.87 6.11C19.42 7.67 20.28 9.73 20.28 11.93C20.27 16.48 16.59 20.15 12.05 20.15ZM16.56 14.33C16.31 14.2 15.09 13.6 14.86 13.52C14.64 13.44 14.47 13.4 14.31 13.65C14.15 13.9 13.68 14.45 13.54 14.61C13.4 14.77 13.26 14.79 13.01 14.66C12.76 14.54 11.96 14.27 11.01 13.43C10.27 12.77 9.77 11.96 9.63 11.71C9.49 11.46 9.61 11.33 9.74 11.2C9.85 11.09 9.99 10.91 10.12 10.76C10.25 10.61 10.29 10.5 10.37 10.33C10.45 10.16 10.41 10.02 10.35 9.89C10.29 9.76 9.79 8.54 9.59 8.04C9.39 7.56 9.18 7.62 9.03 7.61C8.89 7.6 8.72 7.6 8.55 7.6C8.38 7.6 8.11 7.66 7.88 7.91C7.65 8.16 7 8.77 7 10.01C7 11.25 7.9 12.44 8.02 12.61C8.14 12.77 9.8 15.33 12.33 16.42C12.93 16.68 13.4 16.84 13.76 16.95C14.36 17.14 14.91 17.12 15.34 17.05C15.82 16.98 16.82 16.45 17.03 15.86C17.23 15.27 17.23 14.77 17.17 14.66C17.11 14.56 16.95 14.49 16.7 14.37L16.56 14.33Z"/>
                  </svg>
                  <span>INQUIRE ON WHATSAPP</span>
                </a>
              </div>
            </div>
          </article>

          {/* SECTION 4: ALIVA (MOSTAKBAL CITY) */}
          <article className="editorial-project-row row-inverted" id="aliva">
            <div className="project-visual-column">
              <div className="project-image-frame">
                <img 
                  src="/images/mountain-view/mv-aliva.webp" 
                  alt="ALIVA Mostakbal City by Mountain View" 
                  loading="lazy" 
                />
                <div className="floating-payment-tag">
                  <span className="tag-accent">12 YEARS PLAN</span>
                  <span className="tag-plan">5% Down Payment • 12 Years Installments</span>
                </div>
              </div>
            </div>

            <div className="project-info-column">
              <div className="project-meta-header">
                <span className="project-index-number">04 / 05</span>
                <span className="project-location-badge">Mostakbal City</span>
              </div>

              {/* Official Project Logo as Prominent Section Heading */}
              <div className="project-logo-heading-wrap">
                <img 
                  src="/images/mountain-view/logo-mv-aliva.png" 
                  alt="ALIVA Official Logo" 
                  className="project-hero-logo logo-aliva"
                  loading="lazy" 
                />
              </div>

              <h3 className="project-title-editorial">ALIVA</h3>
              <p className="project-subtitle-editorial">Experience-Based Metropolis in Mostakbal City</p>

              <div className="project-terms-matrix">
                <div className="terms-matrix-grid">
                  <div className="matrix-cell">
                    <span className="matrix-cell-label">Starting Price</span>
                    <span className="matrix-cell-value">12,000,000 EGP</span>
                    <span className="matrix-cell-sub">Starting Rate</span>
                  </div>
                  <div className="matrix-cell">
                    <span className="matrix-cell-label">Down Payment</span>
                    <span className="matrix-cell-value">5%</span>
                    <span className="matrix-cell-sub">Immediate Reservation</span>
                  </div>
                  <div className="matrix-cell cell-full">
                    <span className="matrix-cell-label">Payment Plan</span>
                    <span className="matrix-cell-value">12 Years</span>
                    <span className="matrix-cell-sub">5% Down Payment | 12 Years Installments</span>
                  </div>
                </div>
              </div>

              <div className="project-highlights-box">
                <span className="highlights-label">Key Highlights</span>
                <p className="highlights-text">Integrated living zones interconnected by lush green corridors.</p>
              </div>

              <div className="project-actions-block">
                <a 
                  href="https://wa.me/201277752731?text=Hello%2C%20I%20am%20inquiring%20about%20ALIVA%20by%20Mountain%20View" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-whatsapp-solid">
                  <svg viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.31 4.55 17.87 6.11C19.42 7.67 20.28 9.73 20.28 11.93C20.27 16.48 16.59 20.15 12.05 20.15ZM16.56 14.33C16.31 14.2 15.09 13.6 14.86 13.52C14.64 13.44 14.47 13.4 14.31 13.65C14.15 13.9 13.68 14.45 13.54 14.61C13.4 14.77 13.26 14.79 13.01 14.66C12.76 14.54 11.96 14.27 11.01 13.43C10.27 12.77 9.77 11.96 9.63 11.71C9.49 11.46 9.61 11.33 9.74 11.2C9.85 11.09 9.99 10.91 10.12 10.76C10.25 10.61 10.29 10.5 10.37 10.33C10.45 10.16 10.41 10.02 10.35 9.89C10.29 9.76 9.79 8.54 9.59 8.04C9.39 7.56 9.18 7.62 9.03 7.61C8.89 7.6 8.72 7.6 8.55 7.6C8.38 7.6 8.11 7.66 7.88 7.91C7.65 8.16 7 8.77 7 10.01C7 11.25 7.9 12.44 8.02 12.61C8.14 12.77 9.8 15.33 12.33 16.42C12.93 16.68 13.4 16.84 13.76 16.95C14.36 17.14 14.91 17.12 15.34 17.05C15.82 16.98 16.82 16.45 17.03 15.86C17.23 15.27 17.23 14.77 17.17 14.66C17.11 14.56 16.95 14.49 16.7 14.37L16.56 14.33Z"/>
                  </svg>
                  <span>INQUIRE ON WHATSAPP</span>
                </a>
              </div>
            </div>
          </article>

          {/* SECTION 5: MOUNTAIN VIEW GRAND VALLEYS */}
          <article className="editorial-project-row" id="mountain-view-grand-valleys">
            <div className="project-visual-column">
              <div className="project-image-frame">
                <img 
                  src="/images/mountain-view/mv-grand-valleys.webp" 
                  alt="Mountain View Grand Valleys" 
                  loading="lazy" 
                />
                <div className="floating-payment-tag">
                  <span className="tag-accent">10 YEARS PLAN</span>
                  <span className="tag-plan">5% Down Payment • 10 Years Installments</span>
                </div>
              </div>
            </div>

            <div className="project-info-column">
              <div className="project-meta-header">
                <span className="project-index-number">05 / 05</span>
                <span className="project-location-badge">South 90th / New Cairo</span>
              </div>

              {/* Official Project Logo as Prominent Section Heading */}
              <div className="project-logo-heading-wrap">
                <img 
                  src="/images/mountain-view/logo-mv-official-black.png" 
                  alt="Mountain View Grand Valleys Official Crest" 
                  className="project-hero-logo logo-mv-official"
                  loading="lazy" 
                />
              </div>

              <h3 className="project-title-editorial">Mountain View Grand Valleys</h3>
              <p className="project-subtitle-editorial">Private Natural Valleys Sanctuary</p>

              <div className="project-terms-matrix">
                <div className="terms-matrix-grid">
                  <div className="matrix-cell">
                    <span className="matrix-cell-label">Starting Price</span>
                    <span className="matrix-cell-value">30,400,000 EGP</span>
                    <span className="matrix-cell-sub">Starting Rate</span>
                  </div>
                  <div className="matrix-cell">
                    <span className="matrix-cell-label">Down Payment</span>
                    <span className="matrix-cell-value">5%</span>
                    <span className="matrix-cell-sub">Immediate Reservation</span>
                  </div>
                  <div className="matrix-cell cell-full">
                    <span className="matrix-cell-label">Payment Plan</span>
                    <span className="matrix-cell-value">10 Years</span>
                    <span className="matrix-cell-sub">5% Down Payment | 10 Years Installments</span>
                  </div>
                </div>
              </div>

              <div className="project-highlights-box">
                <span className="highlights-label">Key Highlights</span>
                <p className="highlights-text">Highly private, spacious residential units surrounded by breathtaking natural landscapes.</p>
              </div>

              <div className="project-actions-block">
                <a 
                  href="https://wa.me/201277752731?text=Hello%2C%20I%20am%20inquiring%20about%20Mountain%20View%20Grand%20Valleys" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-whatsapp-solid">
                  <svg viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.31 4.55 17.87 6.11C19.42 7.67 20.28 9.73 20.28 11.93C20.27 16.48 16.59 20.15 12.05 20.15ZM16.56 14.33C16.31 14.2 15.09 13.6 14.86 13.52C14.64 13.44 14.47 13.4 14.31 13.65C14.15 13.9 13.68 14.45 13.54 14.61C13.4 14.77 13.26 14.79 13.01 14.66C12.76 14.54 11.96 14.27 11.01 13.43C10.27 12.77 9.77 11.96 9.63 11.71C9.49 11.46 9.61 11.33 9.74 11.2C9.85 11.09 9.99 10.91 10.12 10.76C10.25 10.61 10.29 10.5 10.37 10.33C10.45 10.16 10.41 10.02 10.35 9.89C10.29 9.76 9.79 8.54 9.59 8.04C9.39 7.56 9.18 7.62 9.03 7.61C8.89 7.6 8.72 7.6 8.55 7.6C8.38 7.6 8.11 7.66 7.88 7.91C7.65 8.16 7 8.77 7 10.01C7 11.25 7.9 12.44 8.02 12.61C8.14 12.77 9.8 15.33 12.33 16.42C12.93 16.68 13.4 16.84 13.76 16.95C14.36 17.14 14.91 17.12 15.34 17.05C15.82 16.98 16.82 16.45 17.03 15.86C17.23 15.27 17.23 14.77 17.17 14.66C17.11 14.56 16.95 14.49 16.7 14.37L16.56 14.33Z"/>
                  </svg>
                  <span>INQUIRE ON WHATSAPP</span>
                </a>
              </div>
            </div>
          </article>

        </div>
      </main>

      {/* =========================================================================
           3. WHY PROPERTIES-Y.COM CONSULTANCY (INDEPENDENT ADVISORY PILLARS)
           ========================================================================= */}
      <section className="why-consultancy-section">
        <div className="container">
          
          <div className="section-editorial-intro">
            <span className="editorial-kicker">STRATEGIC ADVANTAGE</span>
            <h2 className="editorial-section-title">Why Consult properties-y.com</h2>
            <p className="editorial-section-desc">
              We deliver fiduciary real estate consultancy designed exclusively around your capital objectives, risk preferences, and portfolio returns.
            </p>
          </div>

          <div className="why-pillars-grid">
            <div className="why-pillar-card">
              <div className="pillar-numeric-index">01</div>
              <h3 className="pillar-headline">Impartial Developer Evaluation</h3>
              <p className="pillar-body-text">
                We provide unbiased financial and architectural analysis of master developments across Egypt. Our advisors assess construction velocity, delivery track records, and capital appreciation potential before recommending any allocation.
              </p>
            </div>

            <div className="why-pillar-card">
              <div className="pillar-numeric-index">02</div>
              <h3 className="pillar-headline">Custom Financial Structuring</h3>
              <p className="pillar-body-text">
                Our senior advisors negotiate directly for prime corner exposures, preferred view corridors, and payment structures tailored to your capital distribution timeline.
              </p>
            </div>

            <div className="why-pillar-card">
              <div className="pillar-numeric-index">03</div>
              <h3 className="pillar-headline">Zero Buyer Advisory Fees</h3>
              <p className="pillar-body-text">
                Experience world-class real estate consultancy without paying agency or intermediary fees. Our consultancy services are 100% complimentary to discerning private buyers.
              </p>
            </div>
          </div>

          <div className="why-cta-center">
            <a 
              href="https://wa.me/201277752731?text=Hello%2C%20I%20would%20like%20to%20talk%20to%20an%20independent%20expert%20about%20Mountain%20View%20projects%20on%20properties-y.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-whatsapp-solid">
              <svg viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.31 4.55 17.87 6.11C19.42 7.67 20.28 9.73 20.28 11.93C20.27 16.48 16.59 20.15 12.05 20.15ZM16.56 14.33C16.31 14.2 15.09 13.6 14.86 13.52C14.64 13.44 14.47 13.4 14.31 13.65C14.15 13.9 13.68 14.45 13.54 14.61C13.4 14.77 13.26 14.79 13.01 14.66C12.76 14.54 11.96 14.27 11.01 13.43C10.27 12.77 9.77 11.96 9.63 11.71C9.49 11.46 9.61 11.33 9.74 11.2C9.85 11.09 9.99 10.91 10.12 10.76C10.25 10.61 10.29 10.5 10.37 10.33C10.45 10.16 10.41 10.02 10.35 9.89C10.29 9.76 9.79 8.54 9.59 8.04C9.39 7.56 9.18 7.62 9.03 7.61C8.89 7.6 8.72 7.6 8.55 7.6C8.38 7.6 8.11 7.66 7.88 7.91C7.65 8.16 7 8.77 7 10.01C7 11.25 7.9 12.44 8.02 12.61C8.14 12.77 9.8 15.33 12.33 16.42C12.93 16.68 13.4 16.84 13.76 16.95C14.36 17.14 14.91 17.12 15.34 17.05C15.82 16.98 16.82 16.45 17.03 15.86C17.23 15.27 17.23 14.77 17.17 14.66C17.11 14.56 16.95 14.49 16.7 14.37L16.56 14.33Z"/>
              </svg>
              <span>TALK TO AN INDEPENDENT ADVISOR</span>
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================================
           4. TECHNICAL FOOTER & COMPLIANCE
           ========================================================================= */}
      <footer className="site-editorial-footer">
        <div className="container footer-inner-content">

          <img 
            src="/images/mountain-view/logo-mv-official-black.png" 
            alt="Mountain View Official Crest" 
            className="footer-brand-logo-xl"
          />

          <div className="footer-signature-bar">
            By properties-y.com
          </div>

          <div className="footer-consultancy-positioning">
            Independent Real Estate Consultancy
          </div>

          <p className="footer-compliance-text">
            This landing page is presented by <strong>properties-y.com</strong>, an Independent Real Estate Consultancy. It is not an official direct web property of Mountain View. All trademarks, project designations, and architectural visualizations belong to their respective developers. Displayed prices, terms, and inventory availability are subject to official developer verification and market change without notice.
          </p>

          <div className="footer-legal-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <span>•</span>
            <a href="/terms-conditions">Terms & Conditions</a>
          </div>

          <div className="footer-copyright">
            © 2026 properties-y.com – Independent Real Estate Consultancy. All Rights Reserved.
          </div>

        </div>
      </footer>

      {/* =========================================================================
           5. FLOATING WHATSAPP BUTTON (ROUND GREEN ICON ONLY #25D366)
           ========================================================================= */}
      <a 
        href="https://wa.me/201277752731?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20the%20Mountain%20View%20Portfolio%20on%20properties-y.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-whatsapp-trigger" 
        aria-label="Direct WhatsApp Consultation">
        <div className="whatsapp-pulse-ring" />
        <svg viewBox="0 0 24 24">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.31 4.55 17.87 6.11C19.42 7.67 20.28 9.73 20.28 11.93C20.27 16.48 16.59 20.15 12.05 20.15ZM16.56 14.33C16.31 14.2 15.09 13.6 14.86 13.52C14.64 13.44 14.47 13.4 14.31 13.65C14.15 13.9 13.68 14.45 13.54 14.61C13.4 14.77 13.26 14.79 13.01 14.66C12.76 14.54 11.96 14.27 11.01 13.43C10.27 12.77 9.77 11.96 9.63 11.71C9.49 11.46 9.61 11.33 9.74 11.2C9.85 11.09 9.99 10.91 10.12 10.76C10.25 10.61 10.29 10.5 10.37 10.33C10.45 10.16 10.41 10.02 10.35 9.89C10.29 9.76 9.79 8.54 9.59 8.04C9.39 7.56 9.18 7.62 9.03 7.61C8.89 7.6 8.72 7.6 8.55 7.6C8.38 7.6 8.11 7.66 7.88 7.91C7.65 8.16 7 8.77 7 10.01C7 11.25 7.9 12.44 8.02 12.61C8.14 12.77 9.8 15.33 12.33 16.42C12.93 16.68 13.4 16.84 13.76 16.95C14.36 17.14 14.91 17.12 15.34 17.05C15.82 16.98 16.82 16.45 17.03 15.86C17.23 15.27 17.23 14.77 17.17 14.66C17.11 14.56 16.95 14.49 16.7 14.37L16.56 14.33Z" />
        </svg>
      </a>

      {/* =========================================================================
           6. SUCCESS CONFIRMATION MODAL UI (EXACT REQUIREMENTS)
           ========================================================================= */}
      {isModalOpen && (
        <div className="success-modal-overlay is-active" role="dialog" aria-modal="true">
          <div className="success-modal-window">
            <div className="modal-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 className="modal-title-editorial">Interest Confirmed</h3>

            <p className="modal-body-editorial">
              Thank you {submittedName || 'valued client'}! Your registration has been securely dispatched to our senior consultancy team. A dedicated property advisor will contact you shortly with full brochures, master plans, and unit availability.
            </p>

            <div className="modal-actions-stack">
              <a 
                href={modalWhatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp-solid">
                <svg viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.31 4.55 17.87 6.11C19.42 7.67 20.28 9.73 20.28 11.93C20.27 16.48 16.59 20.15 12.05 20.15ZM16.56 14.33C16.31 14.2 15.09 13.6 14.86 13.52C14.64 13.44 14.47 13.4 14.31 13.65C14.15 13.9 13.68 14.45 13.54 14.61C13.4 14.77 13.26 14.79 13.01 14.66C12.76 14.54 11.96 14.27 11.01 13.43C10.27 12.77 9.77 11.96 9.63 11.71C9.49 11.46 9.61 11.33 9.74 11.2C9.85 11.09 9.99 10.91 10.12 10.76C10.25 10.61 10.29 10.5 10.37 10.33C10.45 10.16 10.41 10.02 10.35 9.89C10.29 9.76 9.79 8.54 9.59 8.04C9.39 7.56 9.18 7.62 9.03 7.61C8.89 7.6 8.72 7.6 8.55 7.6C8.38 7.6 8.11 7.66 7.88 7.91C7.65 8.16 7 8.77 7 10.01C7 11.25 7.9 12.44 8.02 12.61C8.14 12.77 9.8 15.33 12.33 16.42C12.93 16.68 13.4 16.84 13.76 16.95C14.36 17.14 14.91 17.12 15.34 17.05C15.82 16.98 16.82 16.45 17.03 15.86C17.23 15.27 17.23 14.77 17.17 14.66C17.11 14.56 16.95 14.49 16.7 14.37L16.56 14.33Z" />
                </svg>
                <span>CHAT ON WHATSAPP</span>
              </a>
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                className="modal-close-quiet">
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

