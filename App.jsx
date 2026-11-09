import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SodicLandingPage from './src/pages/SodicLandingPage';
import CityGateLandingPage from './src/pages/CityGateLandingPage';
import MadinetMasrLandingPage from './src/pages/MadinetMasrLandingPage';
import MountainViewLandingPage from './src/pages/MountainViewLandingPage';

/**
 * Main Application Routing Configuration
 * Directives: Explicit Routes under properties-y.com architecture
 * - /mountain-view: Mountain View Exclusive Portfolio (1.1, iCity, Hyde Park, ALIVA, Grand Valleys)
 */
export default function App() {
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
      </Routes>
    </BrowserRouter>
  );
}
