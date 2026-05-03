/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import MinoPage from './components/MinoPage';
import MiningPage from './components/MiningPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/mino" element={<MinoPage />} />
        <Route path="/mining" element={<MiningPage />} />
      </Routes>
    </Router>
  );
}
