import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SodicLandingPage from './src/pages/SodicLandingPage';
import CityGateLandingPage from './src/pages/CityGateLandingPage';
import MadinetMasrLandingPage from './src/pages/MadinetMasrLandingPage';
import MountainViewLandingPage from './src/pages/MountainViewLandingPage';
import HassanAllamLandingPage from './src/pages/HassanAllamLandingPage';
import ResaleNewCairoLandingPage from './src/pages/ResaleNewCairoLandingPage';

/**
 * Main Application Routing Configuration
 * Directives: Explicit Routes under ir-properties.com / properties-y.com architecture
 * - /resale-new-cairo: New Cairo Exclusive Resale Portfolio
 * - /sodic: SODIC Signature Living
 * - /city-gate & /citygate: City Gate New Cairo by Qatari Diar
 * - /Madient-Masr: Madinet Masr Curated Portfolio (The Butterfly, Taj City Etaje, Sarai, Talala)
 * - /mountain-view: Mountain View Exclusive Portfolio (1.1, iCity, Hyde Park, ALIVA, Grand Valleys)
 * - /hassan-allam: Hassan Allam Properties Portfolio (Park Central, The Valleys, Xchange, Swanlake Residence, Encore El Gouna)
 */
export default function App() {
  // Global Outbound WhatsApp Click Conversion Tracking for all React Routes
  useEffect(() => {
    const handleWaClick = (e) => {
      const waLink = e.target.closest('a[href*="wa.me"]');
      if (waLink) {
        if (typeof window !== 'undefined') {
          if (typeof window.gtag_report_conversion === 'function') {
            window.gtag_report_conversion(waLink.href);
          } else if (typeof window.gtag === 'function') {
            window.gtag('event', 'conversion', {
              'send_to': 'AW-18125180547/AZcICJes-qQcEIOd4cJD',
              'value': 1.0,
              'currency': 'EGP'
            });
            window.gtag('event', 'conversion', {
              'send_to': 'AW-18125180547',
              'value': 1.0,
              'currency': 'EGP'
            });
            window.gtag('event', 'contact', {
              'send_to': 'AW-18125180547',
              'method': 'WhatsApp',
              'event_category': 'WhatsApp',
              'event_label': 'WhatsApp Click'
            });
            window.gtag('event', 'whatsapp_click', {
              'send_to': 'AW-18125180547'
            });
          }
        }
      }
    };
    document.addEventListener('click', handleWaClick);
    return () => document.removeEventListener('click', handleWaClick);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Dedicated SODIC Portfolio Route */}
        <Route path="/sodic" element={<SodicLandingPage />} />
        <Route path="/sodic/" element={<SodicLandingPage />} />

        {/* Dedicated City Gate New Cairo Routes (supports both hyphenated & non-hyphenated slugs) */}
        <Route path="/city-gate" element={<CityGateLandingPage />} />
        <Route path="/city-gate/" element={<CityGateLandingPage />} />
        <Route path="/citygate" element={<CityGateLandingPage />} />
        <Route path="/citygate/" element={<CityGateLandingPage />} />

        {/* Dedicated Madinet Masr Portfolio Route (Strict route: /Madient-Masr) */}
        <Route path="/Madient-Masr" element={<MadinetMasrLandingPage />} />
        <Route path="/Madient-Masr/" element={<MadinetMasrLandingPage />} />
        <Route path="/madient-masr" element={<MadinetMasrLandingPage />} />
        <Route path="/madient-masr/" element={<MadinetMasrLandingPage />} />

        {/* Dedicated Mountain View Portfolio Route (Strict route: /mountain-view) */}
        <Route path="/mountain-view" element={<MountainViewLandingPage />} />
        <Route path="/mountain-view/" element={<MountainViewLandingPage />} />

        {/* Dedicated Hassan Allam Properties Portfolio Route (Strict route: /hassan-allam) */}
        <Route path="/hassan-allam" element={<HassanAllamLandingPage />} />
        <Route path="/hassan-allam/" element={<HassanAllamLandingPage />} />
        <Route path="/hassanallam" element={<HassanAllamLandingPage />} />
        <Route path="/hassanallam/" element={<HassanAllamLandingPage />} />

        {/* Dedicated New Cairo Exclusive Resale Portfolio Route (Strict route: /resale-new-cairo/ & /resale-new-cairo) */}
        <Route path="/resale-new-cairo" element={<ResaleNewCairoLandingPage />} />
        <Route path="/resale-new-cairo/" element={<ResaleNewCairoLandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
