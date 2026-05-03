/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import MinoPage from './components/MinoPage';
import MiningPage from './components/MiningPage';
import EnergyPage from './components/EnergyPage';
import GovPage from './components/GovPage';
import Navbar from './components/Navbar';
import { ContactModal } from './components/ContactModal';
import { PrivacyModal } from './components/PrivacyModal';
import { MinoModal } from './components/MinoModal';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/mino" element={<MinoPage />} />
        <Route path="/mining" element={<MiningPage />} />
        <Route path="/energy" element={<EnergyPage />} />
        <Route path="/government" element={<GovPage />} />
      </Routes>
      <ContactModal />
      <PrivacyModal />
      <MinoModal />
    </Router>
  );
}
