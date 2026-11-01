import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  ShieldCheck, 
  Activity, 
  Layers, 
  CheckCircle2, 
  Lock, 
  ExternalLink, 
  ArrowUpRight, 
  TrendingUp, 
  QrCode, 
  Leaf, 
  Scale, 
  Database, 
  Building2, 
  Cpu, 
  CircleDollarSign,
  Maximize2,
  RefreshCw
} from 'lucide-react';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';

export const MinoAppLoop = () => {
  const { theme, lang, setIsMinoModalOpen } = useContext(AppContext);
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const tabs = [
    {
      id: 'marketplace',
      labelEs: 'Marketplace de Activos',
      labelEn: 'Asset Marketplace',
      route: '/marketplace/live-orderbook'
    },
    {
      id: 'traceability',
      labelEs: 'Trazabilidad & Cadena Custodia',
      labelEn: 'Traceability & Custody',
      route: '/custody/zero-trust-audit'
    },
    {
      id: 'settlement',
      labelEs: 'Liquidación Bilateral USD',
      labelEn: 'USD Bilateral Settlement',
      route: '/settlement/smart-contracts'
    },
    {
      id: 'telemetry',
      labelEs: 'Telemetría & Cero Mercurio',
      labelEn: 'Environmental Telemetry',
      route: '/telemetry/zero-mercury'
    }
  ];

  // Auto-looping timer: progresses every 4 seconds
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50; // update progress bar every 50ms
    const totalDuration = 4500; // 4.5 seconds per tab
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((curr) => (curr + 1) % tabs.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, tabs.length]);

  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    setProgress(0);
  };

  return (
    <div className={`w-full rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden shadow-2xl relative ${
      isDark 
        ? 'bg-[#0E1117] border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.8)]' 
        : 'bg-white border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)]'
    }`}>
      {/* Top Browser Bar */}
      <div className={`px-4 sm:px-6 py-3.5 border-b flex items-center justify-between text-xs transition-colors ${
        isDark ? 'bg-[#090B0F] border-white/10' : 'bg-slate-100/90 border-slate-200/80'
      }`}>
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors inline-block cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors inline-block cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors inline-block cursor-pointer" />
          </div>

          <div className="hidden sm:flex items-center gap-2 ml-4 pl-4 border-l border-slate-300 dark:border-white/10">
            <div className={`p-1 rounded-md ${isDark ? 'bg-gold/15 text-gold' : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'}`}>
              <Logo className="w-3.5 h-3.5" />
            </div>
            <span className={`font-mono text-[10px] font-black uppercase tracking-wider ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Mino™ Web Terminal
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-bold border border-emerald-500/20">
              v2.8 LIVE
            </span>
          </div>
        </div>

        {/* URL Bar simulation */}
        <div className={`hidden md:flex items-center gap-2 px-3.5 py-1 rounded-xl text-[11px] font-mono max-w-sm w-full mx-4 border ${
          isDark ? 'bg-black/40 border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-xs'
        }`}>
          <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
          <span className="text-emerald-500 font-semibold">https://</span>
          <span className="truncate">app.mino.network{tabs[activeTab].route}</span>
        </div>

        {/* Play / Pause loop controller */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? (lang === 'es' ? 'Pausar loop' : 'Pause loop') : (lang === 'es' ? 'Reanudar loop' : 'Resume loop')}
            className={`p-1.5 rounded-lg border flex items-center gap-1.5 transition-all text-[10px] font-semibold cursor-pointer ${
              isDark 
                ? 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-amber-500" />
                <span className="hidden sm:inline font-mono">LOOPING</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-500" />
                <span className="hidden sm:inline font-mono">PAUSED</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsMinoModalOpen(true)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isDark 
                ? 'bg-gold/15 border-gold/30 text-gold hover:bg-gold/25' 
                : 'bg-[#F9F6F0] border-[#E8DCC4] text-gold-deep hover:bg-[#F2ECE1]'
            }`}
            title={lang === 'es' ? 'Abrir acceso a terminal' : 'Open terminal access'}
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Internal Navigation Tabs inside the App */}
      <div className={`px-4 sm:px-6 pt-3 pb-2 border-b flex flex-wrap gap-2 items-center justify-between ${
        isDark ? 'bg-[#0B0D12] border-white/10' : 'bg-slate-50/70 border-slate-200'
      }`}>
        <div className="flex flex-wrap gap-1.5">
          {tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer relative overflow-hidden ${
                  isActive
                    ? isDark
                      ? 'bg-gold/15 text-gold border border-gold/40 shadow-xs'
                      : 'bg-white text-slate-950 border border-slate-300 shadow-xs ring-1 ring-gold-deep/20'
                    : isDark
                      ? 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/60 border border-transparent'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? (isDark ? 'bg-gold' : 'bg-gold-deep') : 'bg-slate-400 opacity-40'
                }`} />
                <span>{lang === 'es' ? tab.labelEs : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
          <span className="hidden sm:inline">0{activeTab + 1} / 0{tabs.length}</span>
          <div className="w-16 h-1 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
            <div 
              className={`h-full transition-all duration-75 ${isDark ? 'bg-gold' : 'bg-gold-deep'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Terminal Viewport with Animated Transitions */}
      <div className={`p-5 sm:p-7 min-h-[380px] flex flex-col justify-between ${
        isDark ? 'bg-[#0E1117]' : 'bg-white'
      }`}>
        <AnimatePresence mode="wait">

          {/* SCREEN 1: ASSET MARKETPLACE */}
          {activeTab === 0 && (
            <motion.div
              key="marketplace"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {lang === 'es' ? 'Libro de Órdenes & Activos en Tiempo Real' : 'Live Asset Orderbook'}
                    </span>
                  </div>
                  <h4 className={`text-lg font-bold tracking-tight mt-0.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {lang === 'es' ? 'Lotes Mineros Certificados en Oferta' : 'Certified Mineral Lots on Terminal'}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-1 rounded-md border ${
                    isDark ? 'bg-white/5 border-white/10 text-gold-light' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    {lang === 'es' ? 'Liquidación: Spot USD' : 'Settlement: Spot USD'}
                  </span>
                </div>
              </div>

              {/* Asset Lots Cards */}
              <div className="grid gap-3">
                {/* Lot 1 */}
                <div className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  isDark ? 'bg-white/4 border-white/10 hover:border-gold/30' : 'bg-slate-50/80 border-slate-200 hover:border-[#926E24]/30'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                      isDark ? 'bg-gold/15 text-gold' : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
                    }`}>
                      AU-01
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {lang === 'es' ? 'Oro Fino 99.4% • Sur de Córdoba' : 'Fine Gold 99.4% • South Córdoba'}
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">
                          {lang === 'es' ? 'Cero Mercurio' : 'Zero Mercury'}
                        </span>
                      </div>
                      <span className={`text-[11px] font-mono block mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {lang === 'es' ? 'Concesión ARE San Jorge • 500 oz t • Custodia Verificada' : 'ARE San Jorge Concession • 500 oz t • Verified Custody'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <span className={`text-sm font-mono font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        $2,009,100 USD
                      </span>
                      <span className="text-[10px] text-emerald-500 font-mono block">
                        +1.4% {lang === 'es' ? 'vs LBMA' : 'vs LBMA'}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsMinoModalOpen(true)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                        isDark ? 'bg-gold text-black hover:bg-gold-hover' : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      {lang === 'es' ? 'Ofertar' : 'Bid'}
                    </button>
                  </div>
                </div>

                {/* Lot 2 */}
                <div className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  isDark ? 'bg-white/4 border-white/10 hover:border-gold/30' : 'bg-slate-50/80 border-slate-200 hover:border-[#926E24]/30'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                      isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'
                    }`}>
                      PT-09
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {lang === 'es' ? 'Platino Nativo 98.7% • Chocó' : 'Native Platinum 98.7% • Chocó'}
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-500 border border-blue-500/20">
                          {lang === 'es' ? 'Sello Étnico Ley 70' : 'Ethnic Accord'}
                        </span>
                      </div>
                      <span className={`text-[11px] font-mono block mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {lang === 'es' ? 'Consejo Comunitario Condoto • 120 oz t • En Bóveda' : 'Condoto Council • 120 oz t • Vault Secured'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <span className={`text-sm font-mono font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        $184,320 USD
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        NYMEX Spot
                      </span>
                    </div>
                    <button
                      onClick={() => setIsMinoModalOpen(true)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                        isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      }`}
                    >
                      {lang === 'es' ? 'Detalles' : 'Details'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: TRACEABILITY & CUSTODY */}
          {activeTab === 1 && (
            <motion.div
              key="traceability"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-gold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {lang === 'es' ? 'Pasaporte Digital & Cadena de Custodia Cifrada' : 'Digital Passport & Encrypted Custody'}
                  </span>
                  <h4 className={`text-lg font-bold tracking-tight mt-0.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    Certificate #MINO-2026-XAU-8842
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-500 font-bold border border-emerald-500/20">
                  VERIFIED HASH
                </span>
              </div>

              {/* Chain of Custody Pipeline visual */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/4 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block mb-1">01. ORIGEN</span>
                  <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>Mina La Esperanza</span>
                  <span className="text-[10px] font-mono text-emerald-500">Coord: 7.986° N, 75.198° W</span>
                </div>

                <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/4 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block mb-1">02. TITULARIDAD</span>
                  <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>Asoc. Minera Formal</span>
                  <span className="text-[10px] font-mono text-slate-400">RUDECOL #4819-ANM</span>
                </div>

                <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/4 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block mb-1">03. BENEFICIO</span>
                  <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>Planta Gravimétrica</span>
                  <span className="text-[10px] font-mono text-emerald-500">0% Mercurio / 0% Cianuro</span>
                </div>

                <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/4 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block mb-1">04. DESTINO</span>
                  <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>Bóveda Comercial</span>
                  <span className="text-[10px] font-mono text-gold">Precinto #BR-9941</span>
                </div>
              </div>

              {/* Hash & Verification Footer */}
              <div className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono gap-2 ${
                isDark ? 'bg-black/50 border-white/8 text-slate-400' : 'bg-slate-100/80 border-slate-200 text-slate-600'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>SHA-256: 0x9f83bb17c4e2098d63a89047bf1b2a938c64219f8a</span>
                </div>
                <span className="text-emerald-500 font-bold">{lang === 'es' ? 'AUDITADO POR ANM' : 'ANM AUDITED'}</span>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: BILATERAL SETTLEMENT */}
          {activeTab === 2 && (
            <motion.div
              key="settlement"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
                    <CircleDollarSign className="w-3.5 h-3.5" />
                    {lang === 'es' ? 'Fideicomiso & Liquidación Instantánea' : 'Escrow & Instant Settlement'}
                  </span>
                  <h4 className={`text-lg font-bold tracking-tight mt-0.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    Smart Contract #SC-USD-2026-991
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-500 font-bold border border-emerald-500/20">
                  FUNDS ESCROWED
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/4 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    {lang === 'es' ? 'COMPRADOR INSTITUCIONAL' : 'INSTITUTIONAL BUYER'}
                  </span>
                  <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Tier-1 Global Precious Metals Desk (Zurich / Miami)
                  </h5>
                  <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-white/5 flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Total Liquidado:</span>
                    <span className="font-bold text-emerald-500">$2,009,250.00 USD</span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/4 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    {lang === 'es' ? 'CONTRAPARTE EN TERRITORIO' : 'TERRITORIAL COUNTERPARTY'}
                  </span>
                  <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Asociación Minera Formalizada del Sur de Córdoba
                  </h5>
                  <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-white/5 flex justify-between text-xs font-mono">
                    <span className="text-slate-400">{lang === 'es' ? 'Fondo Social Revertido:' : 'Social Impact Fund:'}</span>
                    <span className="font-bold text-gold">$70,323.75 USD (3.5%)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {lang === 'es' ? 'Transferencia directa a cuentas bancarizadas sin intermediarios informales.' : 'Direct wire to verified accounts with zero informal intermediaries.'}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {lang === 'es' ? 'Completado en 4.2s' : 'Settled in 4.2s'}
                </span>
              </div>
            </motion.div>
          )}

          {/* SCREEN 4: ENVIRONMENTAL TELEMETRY */}
          {activeTab === 3 && (
            <motion.div
              key="telemetry"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5" />
                    {lang === 'es' ? 'Monitoreo Ambiental & Parámetros Operativos' : 'Environmental & Operational Telemetry'}
                  </span>
                  <h4 className={`text-lg font-bold tracking-tight mt-0.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {lang === 'es' ? 'Sensores IoT en Boca de Mina • Cuenca Nechí' : 'IoT Mine-Head Sensors • Nechí Basin'}
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-500 font-bold border border-emerald-500/20">
                  REAL-TIME TELEMETRY
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-white/4 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">MERCURIO DETECTADO</span>
                  <span className="text-2xl font-black font-mono text-emerald-500">0.00 <span className="text-xs">ppm</span></span>
                  <span className="text-[9px] text-emerald-500 block mt-1">100% CERO MERCURIO</span>
                </div>

                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-white/4 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">RECIRCULACIÓN AGUA</span>
                  <span className="text-2xl font-black font-mono text-blue-500">98.4 <span className="text-xs">%</span></span>
                  <span className="text-[9px] text-blue-500 block mt-1">CIRCUITO CERRADO</span>
                </div>

                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-white/4 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">ENERGÍA RENOVABLE</span>
                  <span className="text-2xl font-black font-mono text-amber-500">84.2 <span className="text-xs">%</span></span>
                  <span className="text-[9px] text-amber-500 block mt-1">SOLAR HÍBRIDO</span>
                </div>

                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-white/4 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">REFORESTACIÓN RÍO</span>
                  <span className="text-2xl font-black font-mono text-gold">42.8 <span className="text-xs">ha</span></span>
                  <span className="text-[9px] text-gold block mt-1">COMPENSACIÓN ESG</span>
                </div>
              </div>

              <div className={`p-3 rounded-xl border text-[11px] leading-relaxed ${
                isDark ? 'bg-black/40 border-white/8 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                {lang === 'es'
                  ? 'Transmisión cifrada satelital directa conectada a la Agencia Nacional de Minería (ANM) y corporaciones ambientales regionales.'
                  : 'Direct satellite-encrypted feed linked to the National Mining Agency (ANM) and regional environmental bodies.'}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Bottom Bar inside the App with Terminal Quick Access */}
        <div className={`mt-5 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3 ${
          isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
        }`}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              {lang === 'es' ? 'Nodo Empresarial Mino™ Activo' : 'Mino™ Enterprise Node Active'}
            </span>
            <span className="opacity-40">•</span>
            <span className="text-[11px]">
              {lang === 'es' ? 'Transacciones Seguras Zero-Trust' : 'Zero-Trust Secure Deals'}
            </span>
          </div>

          <button
            onClick={() => setIsMinoModalOpen(true)}
            className={`inline-flex items-center gap-1.5 text-xs font-bold transition-transform hover:translate-x-0.5 cursor-pointer ${
              isDark ? 'text-gold hover:text-gold-hover' : 'text-gold-deep hover:text-slate-950'
            }`}
          >
            <span>{lang === 'es' ? 'Solicitar Acceso a la Terminal Mino™' : 'Request Mino™ Terminal Access'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinoAppLoop;
