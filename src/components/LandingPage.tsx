import React, { useState, useContext } from 'react';
import { motion } from 'motion/react';
import { NetworkBackground } from './NetworkBackground';
import { 
  ArrowRight, 
  Globe, 
  Zap, 
  Shield, 
  ChevronRight, 
  Check, 
  Pickaxe, 
  Sparkles,
  Radio,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';
import { MineralPrices } from './MineralPrices';
import { TerritorialFormalization } from './TerritorialFormalization';
import { MinoAppLoop } from './MinoAppLoop';

const Hero = () => {
  const { t, theme, lang, setIsContactModalOpen } = useContext(AppContext);
  const isDark = theme === 'dark';

  const renderLinkedText = (text: string) => {
    const parts = text.split(/(mining|minería|energy|energía|Government and Public Relations|Gobierno y Relaciones Públicas)/gi);
    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      const linkBaseClass = isDark
        ? "inline-block font-semibold text-gold-light hover:text-white underline underline-offset-[5px] decoration-gold/50 hover:decoration-gold decoration-[1.5px] transition-all duration-200 px-1 py-0.5 rounded-md hover:bg-gold/10"
        : "inline-block font-semibold text-[#7E5E1A] hover:text-slate-950 underline underline-offset-[5px] decoration-[#926E24]/50 hover:decoration-[#7E5E1A] decoration-[1.5px] transition-all duration-200 px-1 py-0.5 rounded-md hover:bg-[#F7F2E7]";

      if (lower === 'mining' || lower === 'minería') {
        return (
          <Link 
            key={i} 
            to="/mining" 
            className={linkBaseClass}
            title={lang === 'es' ? "Explorar división de Minería" : "Explore Mining division"}
          >
            {part}
          </Link>
        );
      }
      if (lower === 'energy' || lower === 'energía') {
        return (
          <Link 
            key={i} 
            to="/energy" 
            className={linkBaseClass}
            title={lang === 'es' ? "Explorar división de Energía" : "Explore Energy division"}
          >
            {part}
          </Link>
        );
      }
      if (lower === 'government and public relations' || lower === 'gobierno y relaciones públicas') {
        return (
          <Link 
            key={i} 
            to="/government" 
            className={linkBaseClass}
            title={lang === 'es' ? "Explorar división de Gobierno y Relaciones Públicas" : "Explore Government & Public Relations division"}
          >
            {part}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center max-w-4xl"
        >
          {/* Live Operational Status Badge */}
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest mb-6 text-[10px] transition-all ${
            isDark 
              ? 'bg-gold/10 border border-gold/25 text-gold shadow-[0_0_15px_rgba(229,184,108,0.1)]' 
              : 'bg-[#F9F6F0] border border-[#E8DCC4] text-gold-deep shadow-xs'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isDark ? 'bg-gold' : 'bg-gold-deep'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isDark ? 'bg-gold' : 'bg-gold-deep'
              }`}></span>
            </span>
            <span>{t.badge}</span>
          </div>

          {/* Main Headline with Original Vectorized Logo */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight mb-6 transition-colors ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            <span className={`group/logo relative inline-flex items-center align-middle mr-3 -mt-1 p-2 sm:p-2.5 rounded-2xl cursor-pointer select-none overflow-hidden transition-all duration-300 ease-out active:scale-95 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-in-out before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:pointer-events-none bg-black shadow-md ${
              isDark 
                ? 'border border-gold/30 hover:border-gold/60 hover:shadow-[0_0_35px_rgba(229,184,108,0.4)]' 
                : 'border border-black hover:border-neutral-800 hover:shadow-[0_0_24px_rgba(0,0,0,0.35)]'
            }`}>
              <Logo className="w-9 h-9 sm:w-12 sm:h-12 text-gold transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover/logo:scale-115 group-hover/logo:rotate-6 group-hover/logo:drop-shadow-[0_0_16px_rgba(229,184,108,0.7)]" />
            </span>
            {t.heroTitle}
            <span className={isDark ? 'text-gold' : 'text-gold-deep'}>{t.heroTitleHighlight}</span>
            {t.heroTitleEnd}
          </h1>

          {/* Subtitle with High Contrast & Embedded Navigation */}
          <p className={`text-lg sm:text-xl md:text-[1.22rem] mb-10 leading-relaxed md:leading-[1.85] max-w-3xl font-normal transition-colors ${
            isDark ? 'text-slate-200/90' : 'text-slate-700'
          }`}>
            {renderLinkedText(t.heroSub)}
          </p>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className={`${
                isDark ? 'btn-gold' : 'btn-primary-light'
              } flex items-center justify-center gap-2 group !px-10 !py-4 text-sm font-bold shadow-lg`}
            >
              <span>{t.getStarted}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a 
              href="#corridors"
              className={`flex items-center justify-center gap-2 px-10 py-4 font-bold text-sm rounded-xl transition-all active:scale-[0.98] ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10 text-white border border-white/15' 
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-xs'
              }`}
            >
              <span>{t.portfolio}</span>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </a>
          </div>

          {/* Live Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full pt-10 border-t border-slate-200/80 dark:border-white/10">
            {(t.metrics || [
              { value: "$100M+", label: lang === 'es' ? "Capital Asesorado" : "Advised Capital" },
              { value: "15+", label: lang === 'es' ? "Años de Excelencia" : "Years Experience" },
              { value: "4", label: lang === 'es' ? "Países Estratégicos" : "Strategic Countries" },
              { value: "100%", label: lang === 'es' ? "Discreción Soberana" : "Confidentiality" }
            ]).map((metric: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center">
                <span className={`text-2xl sm:text-4xl font-bold tracking-tight ${
                  isDark ? 'text-gold' : 'text-gold-deep'
                }`}>
                  {metric.value}
                </span>
                <span className={`text-[11px] font-semibold uppercase tracking-wider mt-1 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const { t, theme } = useContext(AppContext);
  const isDark = theme === 'dark';

  return (
    <section className={`py-14 border-y transition-all duration-300 overflow-hidden ${
      isDark ? 'bg-[#0B0D11] border-white/10' : 'bg-slate-50/70 border-slate-200/80'
    }`}>
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className={`text-xs font-bold uppercase tracking-[0.25em] ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {t.socialProof}
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 md:gap-24 items-center whitespace-nowrap px-8"
        >
          {[...t.clients, ...t.clients, ...t.clients].map((client, i) => (
            <span 
              key={i} 
              className={`text-xl md:text-2xl font-helvetica font-bold uppercase tracking-tight transition-all duration-200 cursor-default ${
                isDark 
                  ? 'text-white/40 hover:text-white' 
                  : 'text-slate-600 hover:text-slate-950 font-semibold'
              }`}
            >
              {client}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const StrategicDivisions = () => {
  const { t, theme, lang, setIsMinoModalOpen } = useContext(AppContext);
  const [activeCorridorIdx, setActiveCorridorIdx] = useState(0);
  const isDark = theme === 'dark';

  const corridors = t.corridorWidget?.corridors || [
    {
      id: "mining",
      industry: lang === 'es' ? "Minería y Minerales Críticos" : "Mining & Critical Minerals",
      hubs: "Sur de Córdoba ↔ Bajo Cauca Antioqueño",
      focus: lang === 'es' ? "Oro, concesiones y regulación" : "Gold, Concessions & Regulation",
      security: lang === 'es' ? "Asesoría Activa" : "Active Advisory",
      milestones: [
        { 
          title: lang === 'es' ? "Formalización Minera" : "Mining Formalization", 
          desc: lang === 'es' ? "Transición legal hacia operaciones concesionadas, bancarizables y auditables." : "Legal transition to compliant, bankable, and ESG-backed concessions." 
        },
        { 
          title: lang === 'es' ? "Responsabilidad Social en Zonas Mineras" : "Social Responsibility in Mining Regions", 
          desc: lang === 'es' ? "Pactos de convivencia comunitaria, valor compartido y desarrollo territorial." : "Community compacts, regional coexistence, and shared socio-economic progress." 
        },
        { 
          title: lang === 'es' ? "Creación de Proyectos Autosostenibles" : "Self-Sustaining Project Development", 
          desc: lang === 'es' ? "Creación de entornos económicos diversificados, encadenamientos productivos circulares, bioeconomía y regeneración ambiental." : "Creation of diversified economic environments, circular economic models, regional bioeconomy, and regenerative stewardship." 
        }
      ]
    },
    {
      id: "energy",
      industry: lang === 'es' ? "Transición Energética e Infraestructura" : "Clean Energy & Infrastructure",
      hubs: "Medellín ↔ Chocó",
      focus: lang === 'es' ? "Modernización de Red, Solar e H2" : "Grid Expansion, Solar & Green H2",
      security: lang === 'es' ? "Marco Soberano • Asesoría Activa" : "Sovereign Framework • Active",
      milestones: [
        { 
          title: lang === 'es' ? "Despliegue de parques solares y gestión de proyectos solares" : "Solar Park Deployment & Solar Project Management", 
          desc: lang === 'es' ? "Estructuración integral, ingeniería, licenciamiento ambiental, gestión predial y supervisión EPC/O&M para plantas fotovoltaicas a gran escala y microrredes energéticas sostenibles." : "End-to-end structuring, environmental permitting, land management, and EPC/O&M supervision for utility-scale photovoltaic plants and resilient clean energy microgrids." 
        },
        { 
          title: lang === 'es' ? "Modernización de Red" : "Grid Modernization", 
          desc: lang === 'es' ? "Líneas de transmisión de alta capacidad integradas a mercados regionales." : "High-capacity transmission links integrated into regional markets." 
        },
        { 
          title: lang === 'es' ? "Fondos Autosostenibles" : "Autosustainable Capital Funds", 
          desc: lang === 'es' ? "Reinversión de excedentes en autonomía productiva local." : "Reinvesting surpluses into local productive autonomy and green development." 
        }
      ]
    },
    {
      id: "government",
      industry: lang === 'es' ? "Gobierno y Relaciones Públicas" : "Government & Public Relations",
      hubs: "Bogotá",
      focus: lang === 'es' ? "Alianzas Bilaterales y Navegación Regulatoria" : "Bilateral Pacts & Regulatory Navigation",
      security: lang === 'es' ? "Alto Protocolo • Autorización Institucional" : "High Protocol • Institutional Clearance",
      milestones: [
        { 
          title: lang === 'es' ? "Pactos Soberanos Bilaterales" : "Bilateral Sovereign Pacts", 
          desc: lang === 'es' ? "Articulación de alto nivel entre ministerios, agencias e inversionistas." : "High-protocol alignment between ministries, regulators, and institutional capital." 
        },
        { 
          title: lang === 'es' ? "Seguridad Jurídica" : "Legal Certainty", 
          desc: lang === 'es' ? "Estructuración de estabilidad y certeza legal para grandes proyectos." : "Transparent governance frameworks for long-term direct investment." 
        },
        { 
          title: lang === 'es' ? "Gobernanza Territorial Sostenible" : "Sustainable Territorial Governance", 
          desc: lang === 'es' ? "Diálogo social preventivo y acuerdos transparentes de largo plazo." : "Structured stakeholder dialogue and durable regional progress." 
        }
      ]
    }
  ];

  const activeCorridor = corridors[activeCorridorIdx] || corridors[0];
  const isMining = activeCorridor.id === 'mining';

  const corridorLinks: Record<string, string> = {
    mining: '/mining',
    energy: '/energy',
    government: '/government'
  };

  const defaultDivisions = [
    {
      id: "mining",
      path: "/mining",
      badge: lang === 'es' ? "Minerales Críticos" : "Critical Minerals",
      title: lang === 'es' ? "Minería y Recursos Naturales" : "Mining & Natural Resources",
      desc: lang === 'es' 
        ? "Desbloqueando el potencial mineral en las Américas bajo estándares ESG sostenibles y respaldo institucional de primer orden."
        : "Unlocking mineral potential across the Americas with sustainable ESG standards and tier-one institutional backing.",
      stat: lang === 'es' ? "98% Tasa de Aprobación Regulatoria" : "98% Regulatory Approval Rate",
      icon: Pickaxe
    },
    {
      id: "energy",
      path: "/energy",
      badge: lang === 'es' ? "Transición Limpia" : "Clean Transition",
      title: lang === 'es' ? "Energía e Infraestructura" : "Energy & Infrastructure",
      desc: lang === 'es'
        ? "Conectando capital institucional con activos soberanos para acelerar la expansión de redes, granjas solares y corredores de descarbonización."
        : "Connecting institutional capital with sovereign assets to accelerate grid expansion, solar farms, and decarbonization corridors.",
      stat: lang === 'es' ? "Corredores Mapeados a Escala GW" : "GW-Scale Mapped Corridors",
      icon: Zap
    },
    {
      id: "government",
      path: "/government",
      badge: lang === 'es' ? "Protocolo Institucional" : "Institutional Protocol",
      title: lang === 'es' ? "Gobierno y Relaciones Públicas" : "Government & Public Relations",
      desc: lang === 'es'
        ? "Construyendo pactos público-privados de alta confianza, cumplimiento legislativo y relaciones diplomáticas bilaterales."
        : "Building high-trust public-private pacts, legislative compliance, and bilateral diplomatic relationships.",
      stat: lang === 'es' ? "Acceso Directo a Actores Clave" : "Direct Stakeholder Access",
      icon: ShieldCheck
    }
  ];

  const divisions = t.divisions || defaultDivisions;
  const icons = [Pickaxe, Zap, ShieldCheck];

  return (
    <section id="corridors" className={`py-28 transition-colors duration-300 ${
      isDark ? 'bg-[#0E1116]' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${
              isDark ? 'bg-gold/10 text-gold border border-gold/20' : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
            }`}>
              {lang === 'es' ? 'VERTICALES DE NEGOCIO' : 'BUSINESS VERTICALS'}
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-colors ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {t.divisionsTitle || (lang === 'es' ? 'Verticales de Negocio' : 'Business Verticals')}
            </h2>
          </div>
          <p className={`max-w-md text-base leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t.divisionsSub || (lang === 'es' 
              ? 'Divisiones especializadas diseñadas para navegar la complejidad regulatoria, el despliegue de capital y la ejecución en territorio.'
              : 'Specialized divisions designed to navigate regulatory complexity, capital deployment, and ground execution.')}
          </p>
        </div>

        {/* Strategic Corridor Telemetry Console (Section 3) */}
        <div className="mb-14 max-w-6xl mx-auto">
          <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
            isDark 
              ? 'bg-[#12151B]/95 border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.7)]' 
              : 'bg-white/95 border-slate-200/90 shadow-[0_25px_60px_rgba(15,23,42,0.06)]'
          }`}>
            <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none ${isDark ? 'bg-gold/10' : 'bg-gold/10'}`} />

            {/* Console Top Bar */}
            <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-200/80 dark:border-white/10 relative z-10 gap-3">
              <div className="flex items-center gap-2.5">
                <Radio className={`w-4 h-4 animate-pulse ${isDark ? 'text-gold' : 'text-gold-deep'}`} />
                <span className={`text-[10px] font-extrabold tracking-widest uppercase ${
                  isDark ? 'text-gold/90' : 'text-gold-deep'
                }`}>
                  {isMining 
                    ? (t.corridorWidget?.tag || (lang === 'es' ? "TELEMETRÍA ESTRATÉGICA & PRECIOS MINERALES EN VIVO (COP / USD)" : "STRATEGIC TELEMETRY & LIVE MINERAL COMMODITIES (COP / USD)"))
                    : (lang === 'es' ? "TELEMETRÍA ESTRATÉGICA & DESPLIEGUE OPERATIVO" : "STRATEGIC TELEMETRY & FIELD OPERATIONS")
                  }
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/mino"
                  className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                    isDark 
                      ? 'bg-gold/15 text-gold border border-gold/30 hover:bg-gold/25 hover:border-gold/50 shadow-xs' 
                      : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4] hover:bg-[#F2EADA] shadow-xs'
                  }`}
                >
                  <span>{lang === 'es' ? 'Abrir Mino™ Platform' : 'Open Mino™ Platform'}</span>
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </Link>
                <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {isMining 
                    ? (t.corridorWidget?.status || (lang === 'es' ? "ENLACE COP / USD ACTIVO" : "LIVE COP / USD FEED"))
                    : (lang === 'es' ? "CORREDOR ACTIVO" : "ACTIVE CORRIDOR")
                  }
                </span>
              </div>
            </div>

            {/* Corridor Selector Tabs */}
            <div className="grid sm:grid-cols-3 gap-2.5 my-6 relative z-10">
              {corridors.map((c: any, idx: number) => {
                const isActive = activeCorridorIdx === idx;
                return (
                  <button
                    key={c.id || idx}
                    onClick={() => setActiveCorridorIdx(idx)}
                    className={`text-left p-3.5 rounded-2xl transition-all duration-200 border flex flex-col justify-between gap-2 cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'bg-gold/15 border-gold/40 text-white shadow-[0_0_20px_rgba(229,184,108,0.1)]'
                          : 'bg-[#F9F6F0] border-[#E8DCC4] text-slate-900 shadow-xs ring-1 ring-gold-deep/20'
                        : isDark
                          ? 'bg-white/5 border-transparent text-slate-400 hover:text-white hover:bg-white/10'
                          : 'bg-slate-50/80 border-slate-200/60 text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        isActive 
                          ? isDark ? 'bg-gold' : 'bg-gold-deep' 
                          : 'bg-slate-300 dark:bg-slate-700'
                      }`} />
                      <span className="text-xs font-bold tracking-tight">{c.industry}</span>
                    </div>
                    <span className={`text-[10px] font-mono font-medium truncate ${
                      isActive ? (isDark ? 'text-gold' : 'text-gold-deep') : 'opacity-60'
                    }`} title={c.hubs}>
                      {c.hubs}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Grid: Live Minerals Column (Left, Mining Only) + Active Corridor */}
            <div className="grid lg:grid-cols-12 gap-6 relative z-10 items-stretch">
              {/* Live Mineral Prices Column (USD) - Left Side (Visible ONLY when Minería y Minerales Críticos is active) */}
              {isMining && (
                <div className="lg:col-span-5 xl:col-span-5 w-full flex flex-col">
                  <MineralPrices isDark={isDark} lang={lang} />
                </div>
              )}

              {/* Active Corridor Card Display - Expands to full width (12 cols) when not in Mining */}
              <div className={`${
                isMining ? 'lg:col-span-7 xl:col-span-7' : 'lg:col-span-12'
              } p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all h-full ${
                isDark 
                  ? 'bg-black/40 border-white/10' 
                  : 'bg-slate-50/80 border-slate-200/80'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {lang === 'es' ? 'Corredor Geográfico' : 'Geographic Corridor'}
                    </span>
                    <span className={`text-[11px] font-mono font-bold ${
                      isDark ? 'text-gold' : 'text-gold-deep'
                    }`}>
                      {activeCorridor.hubs}
                    </span>
                  </div>

                  <div className="mb-5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {lang === 'es' ? 'Foco de Asesoría' : 'Advisory Focus'}
                    </span>
                    <p className={`text-base font-semibold leading-relaxed ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {activeCorridor.focus}
                    </p>
                  </div>

                  {/* Strategic Milestones (Hitos Estratégicos & Territoriales) */}
                  {activeCorridor.milestones && activeCorridor.milestones.length > 0 && (
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {lang === 'es' ? 'Hitos Clave & Impacto Territorial' : 'Key Milestones & Regional Impact'}
                        </span>
                        <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                          isDark ? 'bg-gold/10 text-gold border border-gold/20' : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
                        }`}>
                          {lang === 'es' ? 'Hitos Activos' : 'Active Milestones'}
                        </span>
                      </div>

                      <div className={`grid ${!isMining ? 'grid-cols-1 md:grid-cols-3 gap-4' : 'grid-cols-1 space-y-2'}`}>
                        {activeCorridor.milestones.map((m: any, mIdx: number) => (
                          <div 
                            key={mIdx}
                            className={`p-3 rounded-xl border transition-all ${
                              isDark 
                                ? 'bg-white/3 border-white/8 hover:border-gold/30 hover:bg-white/5' 
                                : 'bg-white border-slate-200/80 hover:border-[#926E24]/30 shadow-xs'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <div className={`mt-0.5 p-1 rounded-md shrink-0 ${
                                isDark ? 'bg-gold/15 text-gold' : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
                              }`}>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1">
                                <h4 className={`text-xs font-bold leading-tight ${
                                  isDark ? 'text-white' : 'text-slate-900'
                                }`}>
                                  {m.title}
                                </h4>
                                <p className={`text-[11px] leading-relaxed mt-1 ${
                                  isDark ? 'text-slate-400' : 'text-slate-600'
                                }`}>
                                  {m.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-slate-200/60 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Shield className={`w-4 h-4 ${isDark ? 'text-gold' : 'text-gold-deep'}`} />
                    <span className={`text-xs font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {activeCorridor.security}
                    </span>
                  </div>

                  <Link
                    to={corridorLinks[activeCorridor.id] || '/mining'}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold transition-transform hover:translate-x-0.5 ${
                      isDark ? 'text-gold hover:text-gold-hover' : 'text-gold-deep hover:text-slate-950'
                    }`}
                  >
                    <span>{lang === 'es' ? 'Explorar' : 'Explore'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Console Footnote */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-200/80 dark:border-white/10 text-[10px] relative z-10">
              <span className={isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}>
                {isMining 
                  ? (lang === 'es' ? 'Cifrado Institucional Zero-Trust • Datos de Commodities en Tiempo Real (USD)' : 'Zero-Trust Institutional Encryption • Real-Time Commodities Feed (USD)')
                  : (lang === 'es' ? 'Cifrado Institucional Zero-Trust • Monitoreo y Supervisión de Corredores en Tiempo Real' : 'Zero-Trust Institutional Encryption • Real-Time Corridor Tracking & Supervision')
                }
              </span>
              <Link
                to="/mino"
                className={`inline-flex items-center gap-1.5 font-bold hover:underline cursor-pointer text-left sm:text-right transition-colors ${
                  isDark ? 'text-gold hover:text-gold-hover' : 'text-gold-deep hover:text-slate-950'
                }`}
              >
                <span>{lang === 'es' ? 'Abrir Mino™ Platform' : 'Open Mino™ Platform'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {divisions.map((div: any, i: number) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={div.id || i}
                whileHover={{ y: -6 }}
                className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  isDark
                    ? 'bg-[#141820] border-white/10 hover:border-gold/40 shadow-lg shadow-black/20'
                    : 'bg-white border-slate-200/90 hover:border-[#926E24]/30 shadow-[0_15px_35px_rgba(15,23,42,0.05)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      isDark ? 'bg-gold/15 text-gold' : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      isDark ? 'bg-white/5 text-slate-300 border border-white/10' : 'bg-slate-100 text-slate-700 border border-slate-200/80'
                    }`}>
                      {div.badge}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-bold tracking-tight mb-4 transition-colors ${
                    isDark ? 'text-white group-hover:text-gold' : 'text-slate-950 group-hover:text-gold-deep'
                  }`}>
                    {div.title}
                  </h3>

                  <p className={`text-sm leading-relaxed mb-6 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {div.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                  <span className={`text-xs font-bold ${
                    isDark ? 'text-gold/90' : 'text-gold-deep'
                  }`}>
                    {div.stat}
                  </span>
                  <Link
                    to={div.path}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform ${
                      isDark ? 'text-white hover:text-gold' : 'text-slate-900 hover:text-gold-deep'
                    }`}
                  >
                    <span>{lang === 'es' ? 'Ver Vertical' : 'Explore'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const { t, theme, lang } = useContext(AppContext);
  const isDark = theme === 'dark';

  const icons = [
    <Globe className={isDark ? 'text-gold' : 'text-gold-deep'} key="1" />, 
    <Zap className={isDark ? 'text-gold' : 'text-gold-deep'} key="2" />, 
    <Shield className={isDark ? 'text-gold' : 'text-gold-deep'} key="3" />
  ];

  return (
    <section id="solutions" className={`py-28 transition-colors duration-300 ${
      isDark ? 'bg-charcoal' : 'bg-slate-50/50'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-0.5 ${isDark ? 'bg-gold' : 'bg-gold-deep'}`} />
            <span className={`text-xs font-bold uppercase tracking-widest ${
              isDark ? 'text-gold' : 'text-gold-deep'
            }`}>
              {lang === 'es' ? 'CAPACIDADES NÚCLEO' : 'CORE CAPABILITIES'}
            </span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-colors ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {t.servicesTitle}
            <span className={isDark ? 'text-gold' : 'text-gold-deep'}>
              {t.servicesTitleHighlight}
            </span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {t.services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className={`p-10 rounded-3xl border transition-all duration-300 group relative overflow-hidden ${
                isDark 
                  ? 'bg-[#12151B] border-white/10 hover:border-gold/40' 
                  : 'bg-white border-slate-200/90 hover:border-[#926E24]/30 shadow-[0_15px_35px_rgba(15,23,42,0.05)]'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 ${
                isDark ? 'bg-gold/10' : 'bg-[#F9F6F0] border border-[#E8DCC4]'
              }`}>
                {React.cloneElement(icons[index] as React.ReactElement, { className: `w-7 h-7 ${isDark ? 'text-gold' : 'text-gold-deep'}` })}
              </div>
              <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                {service.title}
              </h3>
              <p className={`text-base leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MinoSpotlight = () => {
  const { t, theme, lang, setIsMinoModalOpen } = useContext(AppContext);
  const isDark = theme === 'dark';

  const spotlight = t.minoSpotlight || {
    badge: "Tecnología Soberana Propietaria",
    title: "Mino™ - Technology for responsible mining.",
    desc: "Marketplace con AI para gestión de minerales. Nuestro ecosistema digital cifrado optimiza la trazabilidad, el intercambio confidencial de activos y la cadena de suministro con inteligencia artificial y arquitectura Zero-Trust.",
    cta: "Solicitar Acceso a la Terminal",
    features: [
      "Directorio Seguro de Activos Mineros y Energéticos",
      "Flujo Directo de Acuerdos y Alianzas Bilaterales",
      "Contrapartes Institucionales Verificadas"
    ]
  };

  return (
    <section className={`py-24 transition-colors duration-300 border-y ${
      isDark ? 'bg-[#0A0C0F] border-white/10' : 'bg-linear-to-b from-white via-slate-50/40 to-white border-slate-200/80'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isDark ? 'bg-gold/15 text-gold border border-gold/25' : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{spotlight.badge}</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {spotlight.title}
            </h2>

            <p className={`text-lg leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700 font-normal'
            }`}>
              {spotlight.desc}
            </p>

            <div className="space-y-3 pt-2">
              {spotlight.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-gold/20 text-gold' : 'bg-[#F9F6F0] text-gold-deep'
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className={`text-sm font-semibold ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/mino"
                className={`inline-flex items-center justify-center ${
                  isDark ? 'btn-gold' : 'btn-primary-light'
                } !px-8 !py-4 text-sm font-bold shadow-lg`}
              >
                {spotlight.cta}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="space-y-3">
              {spotlight.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-gold/20 text-gold' : 'bg-[#F9F6F0] text-gold-deep'
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className={`text-sm font-semibold ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Interactive Live Loop of Mino Web Application */}
        <MinoAppLoop />
      </div>
    </section>
  );
};

const LocationMarquee = () => {
  const { t, theme } = useContext(AppContext);
  const isDark = theme === 'dark';

  return (
    <section className={`py-16 border-b transition-all duration-300 overflow-hidden ${
      isDark ? 'bg-[#0B0D11] border-white/10' : 'bg-white border-slate-200/80'
    }`}>
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className={`text-xs font-bold uppercase tracking-[0.25em] ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {t.whereWeAre}
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <motion.div 
          animate={{ x: [-1200, 0] }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center whitespace-nowrap px-10"
        >
          {[...t.locations, ...t.locations, ...t.locations].map((location, i) => (
            <div key={i} className="flex items-center gap-3">
              <Globe className={`w-4 h-4 ${isDark ? 'text-gold' : 'text-gold-deep'}`} />
              <span className={`text-xl font-helvetica font-bold uppercase tracking-tight ${
                isDark ? 'text-white/50 hover:text-white' : 'text-slate-600 hover:text-slate-950 font-semibold'
              } transition-colors cursor-default`}>
                {location}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Process = () => {
  const { t, theme, lang } = useContext(AppContext);
  const isDark = theme === 'dark';

  return (
    <section id="process" className={`py-28 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-charcoal' : 'bg-slate-50/50'
    }`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`w-8 h-0.5 ${isDark ? 'bg-gold' : 'bg-gold-deep'}`} />
            <span className={`text-xs font-bold uppercase tracking-widest ${
              isDark ? 'text-gold' : 'text-gold-deep'
            }`}>
              {lang === 'es' ? 'METODOLOGÍA DE EJECUCIÓN' : 'EXECUTION METHODOLOGY'}
            </span>
            <div className={`w-8 h-0.5 ${isDark ? 'bg-gold' : 'bg-gold-deep'}`} />
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 transition-colors ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {t.processTitle}
          </h2>
          <p className={`max-w-xl mx-auto text-base leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t.processSub}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 relative">
          {t.steps.map((step, index) => (
            <div 
              key={index} 
              className={`p-10 rounded-3xl border flex flex-col items-center text-center transition-all duration-300 relative ${
                isDark 
                  ? 'bg-[#12151B] border-white/10 hover:border-gold/30' 
                  : 'bg-white border-slate-200/90 hover:border-[#926E24]/30 shadow-[0_15px_35px_rgba(15,23,42,0.05)]'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 font-display font-bold text-2xl transition-all duration-300 ${
                isDark 
                  ? 'bg-gold/15 text-gold border border-gold/30' 
                  : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
              }`}>
                {step.number}
              </div>
              <h3 className={`text-2xl font-bold mb-3 transition-colors ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                {step.title}
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Differentiation = () => {
  const { t, theme, lang } = useContext(AppContext);
  const isDark = theme === 'dark';

  return (
    <section className={`py-28 transition-colors duration-300 ${
      isDark ? 'bg-[#0E1116]' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${
              isDark ? 'bg-gold/10 text-gold border border-gold/20' : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
            }`}>
              {lang === 'es' ? 'DIFERENCIAL INSTITUCIONAL' : 'INSTITUTIONAL ADVANTAGE'}
            </div>

            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-8 tracking-tight transition-colors ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {t.diffTitle}
              <span className={isDark ? 'text-gold' : 'text-gold-deep'}>
                {t.diffTitleHighlight}
              </span>
            </h2>

            <div className="space-y-6">
              {t.diffItems.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-5"
                >
                  <div className={`mt-1 p-2.5 rounded-xl shrink-0 ${
                    isDark ? 'bg-gold/15 text-gold' : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
                  }`}>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold mb-1.5 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-950'
                    }`}>
                      {item.title}
                    </h4>
                    <p className={`text-base leading-relaxed ${
                      isDark ? 'text-slate-400' : 'text-slate-600 font-normal'
                    }`}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative group flex justify-center">
            <div className={`w-full max-w-md aspect-square rounded-3xl border p-8 flex items-center justify-center text-center transition-all duration-500 relative overflow-hidden ${
              isDark 
                ? 'bg-linear-to-br from-gold/15 via-[#12151B] to-black border-gold/30 shadow-[0_25px_60px_rgba(0,0,0,0.6)]' 
                : 'bg-linear-to-br from-[#F9F6F0] via-white to-[#F4EEE4] border-[#E8DCC4] shadow-[0_25px_60px_rgba(146,110,36,0.06)]'
            }`}>
              <div>
                <div className={`text-8xl md:text-9xl font-bold tracking-tighter mb-4 ${
                  isDark ? 'text-gold' : 'text-gold-deep'
                }`}>
                  15+
                </div>
                <div className={`text-xs font-bold uppercase tracking-[0.25em] ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {t.yearsExp}
                </div>
                <div className={`text-[11px] font-semibold mt-3 ${
                  isDark ? 'text-gold/70' : 'text-gold-deep/90'
                }`}>
                  Bogotá • Medellín • Caucasia • Miami
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const { t, theme, setIsContactModalOpen } = useContext(AppContext);
  const isDark = theme === 'dark';

  return (
    <section className={`py-32 border-t transition-all duration-300 ${
      isDark ? 'bg-black border-white/10' : 'bg-linear-to-b from-white to-slate-50 border-slate-200/80'
    }`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`text-3xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight transition-colors ${
          isDark ? 'text-white' : 'text-slate-950'
        }`}>
          {t.ctaTitle}
          <span className={isDark ? 'text-gold' : 'text-gold-deep'}>
            {t.ctaTitleHighlight}
          </span>
        </h2>
        <p className={`text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600 font-normal'
        }`}>
          {t.ctaSub}
        </p>
        <button 
          onClick={() => setIsContactModalOpen(true)}
          className={`${
            isDark ? 'btn-gold' : 'btn-primary-light'
          } !px-12 !py-5 !text-lg font-bold shadow-xl`}
        >
          {t.ctaBtn}
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t, theme, lang, setIsPrivacyModalOpen, setIsContactModalOpen } = useContext(AppContext);
  const isDark = theme === 'dark';
  const privacySeg = t.footerPrivacySegment;

  return (
    <footer className={`py-20 border-t transition-colors duration-300 ${
      isDark ? 'bg-[#0A0C0F] border-white/10' : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          <div className="col-span-2 space-y-6">
            <div 
              className="flex items-center gap-3.5 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className={`p-1.5 rounded-xl ${isDark ? 'bg-gold/10' : 'bg-black shadow-sm'}`}>
                <Logo className="w-8 h-8 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-helvetica font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  BUILDING CONNECTIONS
                </span>
                <span className={`text-[9px] font-bold tracking-[0.25em] uppercase -mt-0.5 ${
                  isDark ? 'text-gold/70' : 'text-gold-deep'
                }`}>
                  Strategic Partners
                </span>
              </div>
            </div>
            <p className={`max-w-sm leading-relaxed text-sm ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              {t.footerDesc}
            </p>
          </div>

          <div>
            <h5 className={`font-bold mb-5 uppercase text-xs tracking-wider ${
              isDark ? 'text-gold' : 'text-black'
            }`}>
              {lang === 'es' ? 'Verticales de Negocio' : 'Business Verticals'}
            </h5>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/mining" className={`transition-colors font-medium ${isDark ? 'text-slate-300 hover:text-gold' : 'text-black hover:text-gold-deep'}`}>
                  {lang === 'es' ? 'Minería y Recursos' : 'Mining & Resources'}
                </Link>
              </li>
              <li>
                <Link to="/energy" className={`transition-colors font-medium ${isDark ? 'text-slate-300 hover:text-gold' : 'text-black hover:text-gold-deep'}`}>
                  {lang === 'es' ? 'Energía y Transición' : 'Energy & Transition'}
                </Link>
              </li>
              <li>
                <Link to="/government" className={`transition-colors font-medium ${isDark ? 'text-slate-300 hover:text-gold' : 'text-black hover:text-gold-deep'}`}>
                  {lang === 'es' ? 'Relaciones Públicas' : 'Public Relations'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className={`font-bold mb-5 uppercase text-xs tracking-wider ${
              isDark ? 'text-gold' : 'text-black'
            }`}>
              {lang === 'es' ? 'Institucional' : 'Company'}
            </h5>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/about" className={`transition-colors font-medium ${isDark ? 'text-slate-300 hover:text-gold' : 'text-black hover:text-gold-deep'}`}>
                  {lang === 'es' ? 'Historia y Misión' : 'Our Story & Mission'}
                </Link>
              </li>
              <li>
                <Link to="/mino" className={`transition-colors font-medium ${isDark ? 'text-slate-300 hover:text-gold' : 'text-black hover:text-gold-deep'}`}>
                  Mino™ Platform
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => setIsContactModalOpen(true)} 
                  className={`transition-colors font-medium text-left cursor-pointer ${isDark ? 'text-slate-300 hover:text-gold' : 'text-black hover:text-gold-deep'}`}
                >
                  {t.contact}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsPrivacyModalOpen(true)} 
                  className={`transition-colors font-medium text-left cursor-pointer flex items-center gap-2 group ${isDark ? 'text-slate-300 hover:text-gold' : 'text-black hover:text-gold-deep'}`}
                >
                  <FileText className="w-3.5 h-3.5 text-gold opacity-90 group-hover:scale-110 transition-transform" />
                  <span>{lang === 'es' ? 'Políticas de Privacidad y Habeas Data (PDF)' : 'Privacy Policy & Habeas Data (PDF)'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Dedicated Regulatory Privacy & Habeas Data Segment */}
        <div className={`mb-14 p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-r from-[#111622]/90 via-[#0d121c]/90 to-[#141b29]/90 border-gold/30 shadow-[0_10px_30px_rgba(0,0,0,0.4)]' 
            : 'bg-gradient-to-r from-slate-50 via-[#fcfaf5] to-slate-50 border-[#E8DCC4] shadow-sm'
        }`}>
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                  isDark ? 'bg-gold/15 text-gold border border-gold/30' : 'bg-[#F4EDE0] text-gold-deep border border-[#E0D2B8]'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {privacySeg?.badge || 'Gobernanza Institucional & Habeas Data'}
                </span>
                <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded border ${
                  isDark ? 'border-white/10 text-slate-300 bg-white/5' : 'border-slate-200 text-slate-700 bg-white'
                }`}>
                  {privacySeg?.lawTag || 'Ley Estatutaria 1581 de 2012'}
                </span>
              </div>

              <h4 className={`text-xl sm:text-2xl font-helvetica font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                {privacySeg?.title || (lang === 'es' ? 'Políticas de Privacidad y Habeas Data' : 'Privacy Policy & Habeas Data')}
              </h4>

              <p className={`text-sm leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {privacySeg?.desc || (lang === 'es'
                  ? 'Consulte nuestro marco oficial de protección de datos personales y política de Habeas Data conforme a la Ley Estatutaria 1581 de 2012, Decreto 1377 de 2013 y estándares internacionales de privacidad.'
                  : 'Access our official data protection framework and Habeas Data policy in accordance with Colombian Statutory Law 1581/2012, Decree 1377/2013, and international privacy standards.')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold to-[#d4af37] hover:from-[#e5c158] hover:to-[#c59e2b] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-gold/20 active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{privacySeg?.viewPdf || (lang === 'es' ? 'Ver Documento Oficial en PDF' : 'View Official PDF Document')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className={`pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs ${
          isDark ? 'border-gold/20 text-gold' : 'border-slate-200 text-black'
        }`}>
          <p className={isDark ? 'text-gold' : 'text-black'}>{t.footerRights}</p>
          <div className={`flex flex-wrap items-center gap-4 sm:gap-6 font-semibold ${isDark ? 'text-gold' : 'text-black'}`}>
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hover:underline opacity-90 hover:opacity-100 cursor-pointer transition-opacity flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Políticas & Habeas Data (PDF)' : 'Privacy & Habeas Data (PDF)'}</span>
            </button>
            {['LinkedIn', 'Twitter', lang === 'es' ? 'Directorio Mino' : 'Mino Directory'].map(item => (
              <span key={item} className="hover:underline opacity-90 hover:opacity-100 cursor-pointer transition-opacity">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  const { theme } = useContext(AppContext);
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${
      isDark ? 'bg-charcoal' : 'bg-white'
    }`}>
      <NetworkBackground />
      <Hero />
      <SocialProof />
      <StrategicDivisions />
      <TerritorialFormalization />
      <Services />
      <MinoSpotlight />
      <LocationMarquee />
      <Process />
      <Differentiation />
      <FinalCTA />
      <Footer />
    </div>
  );
}
