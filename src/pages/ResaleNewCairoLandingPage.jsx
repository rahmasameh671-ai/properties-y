import React, { useState, useEffect } from 'react';
import '../../resale-new-cairo.css';

/**
 * New Cairo Exclusive Resale Portfolio Landing Page Component
 * Route: /resale-new-cairo/ strictly under properties-y.com domain architecture
 * Final Live URL: https://properties-y.com/resale-new-cairo/
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

// SECTION A: SIGNATURE VILLAS & TWIN HOUSES
const VILLAS_INVENTORY = [
  {
    id: 'pk2-villa',
    compound: 'Palm Hills Katameya Extension (PK2)',
    title: 'Palm Hills Katameya Extension (PK2) - Villa',
    image: '/images/villas-exterior.jpg',
    status: 'Ready to Move',
    advantage: 'Below Market Price',
    specs: [
      { label: 'BUA', value: '410 SQM' },
      { label: 'Land', value: '578 SQM' },
      { label: 'Bedrooms', value: '4 Bedrooms' },
      { label: 'Bathrooms', value: '4 Bathrooms' }
    ],
    highlights: 'Premier extension location, expansive private garden plot, distinct architectural privacy.',
    totalPrice: '36,000,000 EGP',
    breakdown: 'Immediate Resale Transfer • Exceptional Value'
  },
  {
    id: 'ph-new-cairo-premium-villa',
    compound: 'Palm Hills New Cairo',
    title: 'Palm Hills New Cairo - Premium Villa',
    image: '/images/hassan-allam/the-valleys-villas.jpg',
    status: 'Semi-Finished | Ready to Move',
    advantage: 'Below Market Price',
    specs: [
      { label: 'BUA', value: '550 SQM' },
      { label: 'Land', value: '667 SQM' },
      { label: 'Bedrooms', value: '5 Bedrooms' },
      { label: 'Bathrooms', value: '8 Bathrooms' }
    ],
    highlights: 'Best location in the compound, prime landscape view.',
    totalPrice: '32,000,000 EGP',
    breakdown: 'Semi-Finished • Immediate Handover'
  },
  {
    id: 'ph-new-cairo-villa',
    compound: 'Palm Hills New Cairo',
    title: 'Palm Hills New Cairo - Villa',
    image: '/images/hassan-allam/grova-easthills-villas.jpg',
    status: 'Semi-Finished | Ready to Move',
    advantage: 'Below Market Price',
    specs: [
      { label: 'BUA', value: '255 SQM' },
      { label: 'Land', value: '295 SQM' },
      { label: 'Bedrooms', value: '3 Bedrooms' },
      { label: 'Bathrooms', value: '4 Bathrooms' }
    ],
    highlights: "Landscape view, less than half the developer's current price.",
    totalPrice: '24,000,000 EGP',
    breakdown: 'Down Payment: 20,820,000 EGP + Installments'
  },
  {
    id: 'city-gate-twin-house',
    compound: 'City Gate',
    title: 'City Gate - Twin House',
    image: '/images/city-gate/villas-exterior.jpg',
    status: 'Ready to Move',
    advantage: 'Below Market Price',
    specs: [
      { label: 'BUA', value: '282 SQM' },
      { label: 'Land', value: '450 SQM' },
      { label: 'Bedrooms', value: '4 Bedrooms' },
      { label: 'Bathrooms', value: '5 Bathrooms' }
    ],
    highlights: 'Prime location, below market price.',
    totalPrice: '25,000,000 EGP',
    breakdown: 'Ready to Move • Prime Qatari Diar Community'
  },
  {
    id: 'hyde-park-twin-house',
    compound: 'Hyde Park (Garden Residences)',
    title: 'Hyde Park (Garden Residences) - Twin House',
    image: '/images/city-gate/golf-championship.jpg',
    status: 'Semi-Finished | Ready to Move',
    advantage: 'Below Market Price',
    specs: [
      { label: 'BUA', value: '279 SQM' },
      { label: 'Land', value: '325 SQM' },
      { label: 'Bedrooms', value: '4 Bedrooms' },
      { label: 'Bathrooms', value: '5 Bathrooms' }
    ],
    highlights: 'Exceptional view, prime location, below market price.',
    totalPrice: '23,000,000 EGP',
    breakdown: 'Semi-Finished • Ready to Move'
  }
];

// SECTION B: LUXURY APARTMENTS & SKY LOFTS
const APARTMENTS_INVENTORY = [
  {
    id: 'cfc-ground-apartment',
    compound: 'Cairo Festival City (CFC)',
    title: 'Cairo Festival City (CFC) - Ground Apartment with Garden',
    image: '/images/hassan-allam/park-central-exterior.jpg',
    status: 'Fully Finished | Ready to Move',
    advantage: 'Below Market Price',
    specs: [
      { label: 'BUA', value: '157 SQM' },
      { label: 'Private Garden', value: '170 SQM' },
      { label: 'Finish', value: 'Fully Finished' },
      { label: 'Delivery', value: 'Immediate' }
    ],
    highlights: 'The best location in the compound, lowest resale price available.',
    totalPrice: '19,000,000 EGP',
    breakdown: 'Down Payment: 16,000,000 EGP | Remaining: 3,000,000 EGP'
  },
  {
    id: 'district-5-apartment',
    compound: 'District 5',
    title: 'District 5 - Standalone Apartment',
    image: '/images/city-gate/apartment-interior.jpg',
    status: 'Ready to Move',
    advantage: 'Lowest Market Price',
    specs: [
      { label: 'BUA', value: '215 SQM' },
      { label: 'Bedrooms', value: '3 Bedrooms' },
      { label: 'Bathrooms', value: '4 Bathrooms' },
      { label: 'Delivery', value: 'Ready to Move' }
    ],
    highlights: 'Prime location, landscape view, lowest price in the market.',
    totalPrice: '14,700,000 EGP',
    breakdown: 'Ready to Move • District 5 Central Park'
  },
  {
    id: 'hyde-park-premium-apartment',
    compound: 'Hyde Park (Garden Residences)',
    title: 'Hyde Park (Garden Residences) - Premium Apartment',
    image: '/images/mountain-view/mv-hydepark.webp',
    status: '80% Finished | Ready to Move',
    advantage: 'Below Market Price',
    specs: [
      { label: 'BUA', value: '191 SQM' },
      { label: 'Bedrooms', value: '3 Bedrooms' },
      { label: 'Bathrooms', value: '3 Bathrooms' },
      { label: 'Phase', value: 'Best Phase' }
    ],
    highlights: 'Best phase, direct view over villas.',
    totalPrice: '11,700,000 EGP',
    breakdown: 'Down Payment: 9,800,000 EGP | Installments over 5 Years'
  },
  {
    id: 'hyde-park-apartment',
    compound: 'Hyde Park (Garden Residences)',
    title: 'Hyde Park (Garden Residences) - Apartment',
    image: '/images/hassan-allam/swanlake-residence-apartments.jpg',
    status: 'Semi-Finished | Ready to Move',
    advantage: 'Below Market Price',
    specs: [
      { label: 'BUA', value: '168 SQM' },
      { label: 'Bedrooms', value: '3 Bedrooms' },
      { label: 'Bathrooms', value: '3 Bathrooms' },
      { label: 'Delivery', value: 'Ready to Move' }
    ],
    highlights: 'Prime location, below market price.',
    totalPrice: '10,216,475 EGP',
    breakdown: 'Down Payment: 8,630,000 EGP + Installments'
  },
  {
    id: 'mv-icity-sky-loft',
    compound: 'Mountain View iCity',
    title: 'Mountain View iCity - Sky Loft',
    image: '/images/mountain-view/mv-icity.webp',
    status: 'Ready to Move',
    advantage: 'Below Market Price',
    specs: [
      { label: 'BUA', value: '145 SQM' },
      { label: 'Private Roof', value: '115 SQM' },
      { label: 'Bedrooms', value: '4 Bedrooms' },
      { label: 'Bathrooms', value: '4 Bathrooms' }
    ],
    highlights: 'Best phase, prime north-facing (Bahary) location.',
    totalPrice: '8,750,000 EGP',
    breakdown: 'Down Payment: 8,000,000 EGP + Installments'
  }
];

export default function ResaleNewCairoLandingPage() {
  const WHATSAPP_NUMBER = '201277752731';
  const WHATSAPP_CTA_LINK = 'https://wa.me/201277752731?text=Hello%2C%20I%20am%20inquiring%20about%20the%20New%20Cairo%20Resale%20units';

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

    setIsSubmitting(true);
    const fullPhoneNumber = `${selectedCountry.dial} ${phoneNumber.trim()}`;

    // Construct Lead Record
    const leadRecord = {
      name: fullName.trim(),
      phone: fullPhoneNumber,
      timestamp: new Date().toISOString(),
      portfolio: 'New Cairo Exclusive Resale Portfolio',
      consultancy: 'properties-y.com (Independent Real Estate Consultancy)',
      url: window.location.href
    };

    // Store in localStorage backup
    try {
      const stored = JSON.parse(localStorage.getItem('properties_y_resale_leads') || '[]');
      stored.push(leadRecord);
      localStorage.setItem('properties_y_resale_leads', JSON.stringify(stored));
    } catch (err) {
      console.warn('Storage notice:', err);
    }

    // Google Ads & Tag Conversion Tracking
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
      }

      if (typeof window.gtag === 'function') {
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
            event_category: 'form',
            event_label: 'New Cairo Resale Lead Inquiry'
          });
          window.gtag('event', 'lead_form_submission', {
            send_to: 'AW-18125180547'
          });
        } catch (err) {
          console.warn('GTag notice:', err);
        }
      }
    }

    // Zapier Webhook Catch
    try {
      await fetch('https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/', {
        method: 'POST',
        body: JSON.stringify({
          fullName: fullName.trim(),
          phoneNumber: fullPhoneNumber,
          portfolio: 'New Cairo Exclusive Resale Portfolio',
          landingPageUrl: window.location.href,
          submissionDate: new Date().toISOString()
        })
      });
    } catch (err) {
      console.warn('Zapier notice:', err);
    }

    // FormSubmit Email Dispatch Backup
    try {
      fetch('https://formsubmit.co/ajax/Rahma@irtkaz.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: fullName.trim(),
          phone: fullPhoneNumber,
          source: 'New Cairo Exclusive Resale Portfolio – properties-y.com',
          consultancy: 'properties-y.com Independent Real Estate Consultancy',
          _replyto: 'Rahma@irtkaz.com',
          _cc: 'Mostafa.a.ashmawy@gmail.com,Mostafa.ashmawy@irtkaz.com',
          _subject: `New Resale Lead: ${fullName.trim()} (${fullPhoneNumber}) [properties-y.com]`,
          _template: 'table'
        })
      }).catch((err) => console.warn('Email dispatch notice:', err));
    } catch (err) {
      console.warn('Transmission notice:', err);
    }

    setSubmittedName(fullName.trim());
    setIsSubmitting(false);
    setIsModalOpen(true);

    // Attempt direct WhatsApp handoff
    try {
      window.open(WHATSAPP_CTA_LINK, '_blank', 'noopener,noreferrer');
    } catch {
      // User can click button in modal
    }

    // Reset inputs
    setFullName('');
    setPhoneNumber('');
  };

  return (
    <div className="resale-page-wrapper">
      {/* 1. TOP MINIMALIST NAV / BRANDING BAR */}
      <header className="resale-top-nav">
        <div className="container resale-nav-inner">
          <a href="/resale-new-cairo/" className="resale-brand-mark">
            <span className="brand-domain-tag">properties-y.com</span>
            <span className="brand-badge-pill">By properties-y.com</span>
          </a>
          <div className="resale-nav-actions">
            <span className="nav-consultancy-link">Independent Real Estate Consultancy</span>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (STARTS AT TOP: 0 WITH SLEEK WHITE FLOATING FORM CARD) */}
      <section className="resale-hero" id="hero">
        <div className="hero-bg-layer">
          <img
            src="/images/city-gate/hero-masterview.jpg"
            alt="New Cairo Signature Resale Portfolio - Ultra-Luxury Architecture"
            loading="eager"
          />
        </div>
        <div className="hero-gradient-overlay"></div>

        <div className="container hero-content-grid">
          {/* Left Column: Hero Narrative */}
          <div className="hero-narrative">
            <div className="hero-eyebrow-pill">
              <span className="hero-eyebrow-dot"></span>
              <span>EXCLUSIVE RESALE PORTFOLIO</span>
            </div>

            <div className="hero-branding-tagline">
              By properties-y.com &bull; Independent Real Estate Consultancy
            </div>

            <h1 className="hero-title">New Cairo Signature Resale</h1>

            <p className="hero-subtitle">
              Premium ready-to-move-in properties and exclusive resale opportunities across New Cairo's most prestigious communities.
            </p>

            <div className="hero-trust-metrics">
              <div className="metric-item">
                <span className="metric-value">100%</span>
                <span className="metric-label">Ready &amp; Near-Ready</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">Below Market</span>
                <span className="metric-label">Immediate Price Advantage</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">Senior</span>
                <span className="metric-label">Advisory Verification</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Floating White Lead Capture Form Card */}
          <div className="lead-card-floating">
            <div className="card-header-block">
              <h3>Request Unit Dossiers &amp; Pricing</h3>
              <p>Direct dispatch to our senior consultancy team.</p>
            </div>

            <form onSubmit={handleFormSubmit}>
              {/* Full Name: Blank input, NO placeholder */}
              <div className="field-group">
                <label htmlFor="leadFullName" className="field-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="leadFullName"
                  className="field-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>

              {/* Phone Number: Split layout (Country Code left, blank input right) */}
              <div className="field-group">
                <label htmlFor="leadPhoneInput" className="field-label">
                  Phone Number
                </label>
                <div className="phone-split-container">
                  <button
                    type="button"
                    className="country-selector-btn"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-expanded={isDropdownOpen}
                    aria-label="Select Country Dial Code"
                  >
                    <span className="country-flag-icon">{selectedCountry.flag}</span>
                    <span className="country-dial-code">{selectedCountry.dial}</span>
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

                  {/* Popover Dropdown */}
                  {isDropdownOpen && (
                    <div className="country-popover-panel is-open">
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
                    id="leadPhoneInput"
                    className="phone-split-input"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Solid Green Submit Button */}
              <button
                type="submit"
                className="btn-submit-luxury"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'DISPATCHING...' : 'Request Property Details'}</span>
              </button>

              <p className="card-disclaimer-text">
                By properties-y.com &bull; Independent Real Estate Consultancy &bull; Strict Confidentiality
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* 3. SECTION A: SIGNATURE VILLAS & TWIN HOUSES */}
      <section className="resale-inventory-section" id="villas-portfolio">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">SECTION A &bull; BELOW MARKET PRICE ADVANTAGE</div>
            <h2 className="section-main-title">Signature Villas &amp; Twin Houses</h2>
            <p className="section-lead-text">
              Hand-selected standalone villas and twin homes offering immediate move-in readiness and exceptional below-market equity advantages.
            </p>
          </div>

          <div className="inventory-cards-grid">
            {VILLAS_INVENTORY.map((unit) => (
              <article key={unit.id} className="resale-card">
                <div className="card-media-wrapper">
                  <img src={unit.image} alt={unit.title} loading="lazy" />
                  <span className="card-advantage-pill">{unit.advantage}</span>
                  <span className="card-status-pill">{unit.status}</span>
                </div>

                <div className="card-body-content">
                  <span className="card-compound-name">{unit.compound}</span>
                  <h3 className="card-unit-title">{unit.title}</h3>

                  <div className="card-specs-matrix">
                    {unit.specs.map((s, idx) => (
                      <div key={idx} className="spec-cell">
                        <span className="spec-label">{s.label}</span>
                        <span className="spec-value">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="card-highlights-box">
                    <strong>Highlights:</strong> {unit.highlights}
                  </div>

                  <div className="card-pricing-block">
                    <div className="price-eyebrow">Total Price</div>
                    <div className="price-total-figure">{unit.totalPrice}</div>
                    <div className="price-breakdown-note">{unit.breakdown}</div>
                  </div>

                  {/* WhatsApp CTA Button Under Each Category Card */}
                  <a
                    href={WHATSAPP_CTA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-card-whatsapp"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                    </svg>
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION B: LUXURY APARTMENTS & SKY LOFTS */}
      <section className="resale-section-divider" id="apartments-portfolio">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">SECTION B &bull; READY &amp; NEAR-READY INVENTORY</div>
            <h2 className="section-main-title">Luxury Apartments &amp; Sky Lofts</h2>
            <p className="section-lead-text">
              Curated finished and semi-finished apartments with private gardens, panoramic views, and private rooftops across New Cairo.
            </p>
          </div>

          <div className="inventory-cards-grid">
            {APARTMENTS_INVENTORY.map((unit) => (
              <article key={unit.id} className="resale-card">
                <div className="card-media-wrapper">
                  <img src={unit.image} alt={unit.title} loading="lazy" />
                  <span className="card-advantage-pill">{unit.advantage}</span>
                  <span className="card-status-pill">{unit.status}</span>
                </div>

                <div className="card-body-content">
                  <span className="card-compound-name">{unit.compound}</span>
                  <h3 className="card-unit-title">{unit.title}</h3>

                  <div className="card-specs-matrix">
                    {unit.specs.map((s, idx) => (
                      <div key={idx} className="spec-cell">
                        <span className="spec-label">{s.label}</span>
                        <span className="spec-value">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="card-highlights-box">
                    <strong>Highlights:</strong> {unit.highlights}
                  </div>

                  <div className="card-pricing-block">
                    <div className="price-eyebrow">Total Price</div>
                    <div className="price-total-figure">{unit.totalPrice}</div>
                    <div className="price-breakdown-note">{unit.breakdown}</div>
                  </div>

                  {/* WhatsApp CTA Button Under Each Category Card */}
                  <a
                    href={WHATSAPP_CTA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-card-whatsapp"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
                    </svg>
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INDEPENDENT CONSULTANCY TRUST PILLARS */}
      <section className="resale-trust-section">
        <div className="container">
          <div className="section-header-block">
            <div className="section-badge-pill">PROPERTIES-Y ADVISORY</div>
            <h2 className="section-main-title">Why Resale with properties-y.com</h2>
            <p className="section-lead-text">
              Independent, verified market representation ensuring maximum financial transparency and legal security.
            </p>
          </div>

          <div className="trust-pillars-grid">
            <div className="trust-pillar-card">
              <div className="pillar-number">01</div>
              <h3 className="pillar-title">Immediate Transfer &amp; Handover</h3>
              <p className="pillar-desc">
                Access ready-to-move-in assets without multi-year construction waiting times, completely verified by our legal advisors.
              </p>
            </div>
            <div className="trust-pillar-card">
              <div className="pillar-number">02</div>
              <h3 className="pillar-title">Substantial Below-Market Equity</h3>
              <p className="pillar-desc">
                Acquire prime units at significant discounts compared to developer launch rates, unlocking immediate equity on acquisition.
              </p>
            </div>
            <div className="trust-pillar-card">
              <div className="pillar-number">03</div>
              <h3 className="pillar-title">Independent Consultancy</h3>
              <p className="pillar-desc">
                Zero developer bias. We represent your investment interest exclusively, providing objective comparisons across New Cairo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ULTRA-LUXURY EDITORIAL FOOTER & COMPLIANCE */}
      <footer className="resale-footer">
        <div className="container footer-inner-content">
          <div className="footer-brand-title">properties-y.com</div>
          <div className="footer-signature-bar">By properties-y.com</div>
          <div className="footer-consultancy-badge">Independent Real Estate Consultancy</div>

          <a
            href={WHATSAPP_CTA_LINK}
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
            This New Cairo Resale showcase is curated and published by <strong>properties-y.com</strong>, an Independent Real Estate Consultancy. We provide specialized resale advisory and transaction assistance. All trademarks, community names, and developer marks belong to their respective registered owners. Pricing and availability reflect current verified resale submissions and may fluctuate according to market dynamics.
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

      {/* 7. FLOATING WHATSAPP BUTTON (SOLID VIBRANT GREEN #25D366) */}
      <a
        href={WHATSAPP_CTA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-widget"
        aria-label="Inquire via WhatsApp"
      >
        <svg viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.92-.472-1.488-.604-2.457-2.125-2.531-2.224-.075-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.136-.149.297-.187.396-.187.099 0 .198.001.284.006.091.004.213-.035.333.253.124.298.423 1.033.46 1.107.037.075.062.162.012.261-.049.099-.074.161-.148.248-.075.087-.157.195-.224.262-.075.074-.153.155-.066.304.087.149.387.639.83 1.034.57.508 1.05.665 1.199.739.149.075.236.062.324-.037.087-.099.373-.434.472-.583.099-.149.198-.124.334-.075.137.049.868.409 1.017.483.149.074.248.112.285.174.037.062.037.36-.107.765z" />
        </svg>
        <span className="widget-label">Chat on WhatsApp</span>
      </a>

      {/* 8. SUCCESS MODAL OVERLAY (VERBATIM PROMPT SPECIFICATION) */}
      <div
        className={`modal-overlay ${isModalOpen ? 'is-active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalHeading"
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

          <h3 id="modalHeading" className="modal-header-title">
            Registration Received
          </h3>

          {/* EXACT PROMPT VERBATIM TEXT:
              "Thank you {name}! Your registration has been securely dispatched to our senior consultancy team. A dedicated property advisor will contact you shortly with full brochures, master plans, and unit availability." */}
          <p className="modal-body-text">
            Thank you {submittedName || 'there'}! Your registration has been securely dispatched to our senior consultancy team. A dedicated property advisor will contact you shortly with full brochures, master plans, and unit availability.
          </p>

          <a
            href={WHATSAPP_CTA_LINK}
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
