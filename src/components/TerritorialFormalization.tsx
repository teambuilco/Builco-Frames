import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  ShieldCheck, 
  Pickaxe, 
  Leaf, 
  Users, 
  Layers, 
  ArrowRight, 
  Compass, 
  CheckCircle2, 
  FileCheck2, 
  Coins, 
  Trees, 
  Activity,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AppContext } from '../context/AppContext';

export const TerritorialFormalization = () => {
  const { theme, lang, setIsContactModalOpen } = useContext(AppContext);
  const isDark = theme === 'dark';
  const [selectedRegionIdx, setSelectedRegionIdx] = useState(0);

  const data = {
    es: {
      badge: "DESPLIEGUE EN TERRITORIO",
      title: "Formalización Minera en ",
      titleHighlight: "Zonas Apartadas",
      titleEnd: " del Territorio",
      subtitle: "Llegamos a las cuencas y serranías más remotas de Colombia para transformar la minería tradicional e informal en operaciones concesionadas, bancarizables, con tecnología cero mercurio y proyectos productivos autosostenibles.",
      regionsLabel: "SECCIONALES TERRITORIALES ACTIVAS",
      methodologyLabel: "RUTA METODOLÓGICA EN TERRENO REMOTO",
      impactLabel: "MÉTRICAS DE IMPACTO TERRITORIAL CONSOLIDADO",
      ctaBtn: "Consultar Alianzas en Territorio",
      terminalCta: "Vincular Operación a Mino™",
      statusLive: "OPERACIÓN EN CAMPO ACTIVA",
      regions: [
        {
          id: "sur-cordoba",
          name: "Sur de Córdoba",
          municipalities: "Montelíbano • Puerto Libertador • San José de Uré",
          geography: "Serranía de San Jerónimo y cuenca del río San Jorge, zona de transición ecológica",
          mineral: "Oro de Aluvión & Depósitos de Veta",
          communities: "Cabildos indígenas Zenú, comunidades afrodescendientes y campesinos tradicionales",
          legalMechanism: "Pactos de Coexistencia, Contratos de Operación con Titulares y RUDECOL",
          techIntervention: "Plantas piloto comunitarias de beneficio cerrado con circuito cerrado de agua y energía fotovoltaica híbrida.",
          sustainability: "Programas de apicultura en zonas de exclusión minera, reforestación de riberas y seguridad alimentaria local.",
          stats: [
            { label: "Familias con Ingresos Bancarizados*", value: "+20" },
            { label: "Hectáreas en Reforestación Activa", value: "+40 ha" },
            { label: "Tasa de Cumplimiento Regulatorio", value: "99.2%" }
          ]
        },
        {
          id: "bajo-cauca",
          name: "Bajo Cauca Antioqueño",
          municipalities: "Caucasia • El Bagre • Zaragoza • Nechí",
          geography: "Cuenca aluvial del río Nechí y Bajo Cauca, acceso fluvial y carreteras terciarias",
          mineral: "Oro Aluvial & Metales Preciosos",
          communities: "Asociaciones de barequeros tradicionales, comunidades ribereñas y pequeños mineros",
          legalMechanism: "Subcontratos de Formalización Minera & Áreas de Reserva Especial (ARE)",
          techIntervention: "Sustitución de dragas no autorizadas por mesas gravimétricas y centrífugas concentradoras 100% libres de mercurio.",
          sustainability: "Recuperación de lechos fluviales, piscicultura en pozas rehabilitadas y cultivos de cacao en suelos remediados.",
          stats: [
            { label: "Mineros y Barequeros Formalizados", value: "+250" },
            { label: "Mercurio Eliminado del Proceso", value: "100%" },
            { label: "Proyectos Productivos Paralelos", value: "12 Activos" }
          ]
        }
      ],
      methodology: [
        {
          step: "01",
          title: "Inmersión & Censo en Terreno",
          desc: "Ingresamos físicamente a las veredas y cuencas apartadas para censar unidades de producción, mapear actores y levantar coordenadas georreferenciadas con ingenieros, sociólogos y juntas de acción comunal."
        },
        {
          step: "02",
          title: "Articulación con la Autoridad Minera (ANM)",
          desc: "Estructuramos la arquitectura jurídica: delimitación de Áreas de Reserva Especial, cesiones o subcontratos de formalización bajo el marco del Ministerio de Minas y Energía."
        },
        {
          step: "03",
          title: "Dotación Tecnológica & Reducción de Mercurio",
          desc: "Ayudamos a dotar a las asociaciones con tecnologías para la reducción del uso del mercurio, certificando la trazabilidad digital del mineral desde boca de mina mediante la plataforma Mino™."
        },
        {
          step: "04",
          title: "Autosostenibilidad & Bancarización",
          desc: "Conectamos al minero formalizado con el sistema financiero y comercializadores, destinando un porcentaje de utilidad a proyectos agroforestales y fondos de retiro."
        }
      ]
    },
    en: {
      badge: "TERRITORIAL FIELD OPERATIONS",
      title: "Mining Formalization Across ",
      titleHighlight: "Remote Territories",
      titleEnd: "",
      subtitle: "We deploy directly into Colombia's most isolated river basins and rugged mountain ranges to transition informal and artisanal mining into fully legalized, bankable, zero-mercury concessions with self-sustaining local economies.",
      regionsLabel: "ACTIVE TERRITORIAL SECTIONS",
      methodologyLabel: "REMOTE FIELD METHODOLOGY",
      impactLabel: "CONSOLIDATED TERRITORIAL IMPACT",
      ctaBtn: "Consult Territorial Alliances",
      terminalCta: "Link Operation to Mino™",
      statusLive: "FIELD TEAMS DEPLOYED",
      regions: [
        {
          id: "sur-cordoba",
          name: "Sur de Córdoba",
          municipalities: "Montelíbano • Puerto Libertador • San José de Uré",
          geography: "San Jerónimo mountain range and San Jorge river basin, ecological transition zone",
          mineral: "Alluvial Gold & Vein Deposits",
          communities: "Zenú indigenous councils, Afro-descendant communities, and traditional agrarian families",
          legalMechanism: "Territorial Coexistence Pacts, Titleholder Operating Agreements, and RUDECOL",
          techIntervention: "Community-operated closed-circuit recovery plants with 100% water recirculation and hybrid solar power.",
          sustainability: "Apiculture and honey production in mining exclusion corridors, riparian reforesting, and food security.",
          stats: [
            { label: "Banked Households with Clean Income*", value: "+20" },
            { label: "Active Reforestation Corridors", value: "+40 ha" },
            { label: "Regulatory Compliance Rate", value: "99.2%" }
          ]
        },
        {
          id: "bajo-cauca",
          name: "Bajo Cauca Antioqueño",
          municipalities: "Caucasia • El Bagre • Zaragoza • Nechí",
          geography: "Nechí river basin and alluvial lowlands, accessible by riverways and rural dirt roads",
          mineral: "Alluvial Gold & Precious Metals",
          communities: "Traditional artisanal panners (barequeros), riverside settlements, and small-scale miners",
          legalMechanism: "Mining Formalization Subcontracts & Special Reserve Areas (ARE)",
          techIntervention: "Replacement of unpermitted dredges with centrifugal concentrators and shaking tables 100% free of mercury.",
          sustainability: "Riverbank rehabilitation, aquaculture in restored pits, and sustainable cocoa agriculture on remediated soils.",
          stats: [
            { label: "Formalized Artisanal Miners", value: "+250" },
            { label: "Mercury Eliminated from Process", value: "100%" },
            { label: "Active Parallel Agro-Projects", value: "12 Live" }
          ]
        }
      ],
      methodology: [
        {
          step: "01",
          title: "Field Immersion & Census",
          desc: "We travel directly to remote hamlets to map production units, register traditional miners, and conduct georeferenced surveys alongside engineers, sociologists, and community action boards (JAC)."
        },
        {
          step: "02",
          title: "National Mining Agency (ANM) Structuring",
          desc: "We engineer legal frameworks: Special Reserve Areas (ARE), title devolutions, and formalization subcontracts under the Ministry of Mines and Energy."
        },
        {
          step: "03",
          title: "Tech Deployment & Mercury Reduction",
          desc: "We help equip mining associations with technologies for mercury reduction, certifying the mineral's digital traceability from the pithead through the Mino™ platform."
        },
        {
          step: "04",
          title: "Self-Sustaining Economy & Banking",
          desc: "We bridge formalized miners to tier-1 banks and buyers, reinvesting margins into agroforestry, fish farming, and regional development."
        }
      ]
    }
  };

  const tContent = data[lang as 'es' | 'en'] || data.es;
  const activeRegion = tContent.regions[selectedRegionIdx] || tContent.regions[0];

  return (
    <section id="formalizacion" className={`py-28 relative overflow-hidden transition-colors duration-300 border-t ${
      isDark ? 'bg-[#0B0D12] border-white/10' : 'bg-slate-50/70 border-slate-200/80'
    }`}>
      {/* Decorative ambient gradients */}
      <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
        isDark ? 'bg-gold/10' : 'bg-gold/15'
      }`} />
      <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
        isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/10'
      }`} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-5 ${
              isDark 
                ? 'bg-gold/15 text-gold border border-gold/30' 
                : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
            }`}>
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '14s' }} />
              <span>{tContent.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {tContent.title}
              <span className={isDark ? 'text-gold' : 'text-gold-deep'}>
                {tContent.titleHighlight}
              </span>
              {tContent.titleEnd}
            </h2>

            <p className={`mt-5 text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {tContent.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className={`${
                isDark ? 'btn-gold' : 'btn-primary-light'
              } flex items-center gap-2 !px-7 !py-3.5 text-xs font-bold shadow-md cursor-pointer`}
            >
              <span>{tContent.ctaBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Region Selector Navigation Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {tContent.regionsLabel}
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className={`text-[10px] font-mono font-bold uppercase ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}>
                {tContent.statusLive}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tContent.regions.map((region, idx) => {
              const isSelected = selectedRegionIdx === idx;
              return (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegionIdx(idx)}
                  className={`text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group hover:-translate-y-1 ${
                    isSelected
                      ? isDark
                        ? 'bg-gold/15 border-gold/60 text-white shadow-[0_12px_35px_rgba(229,184,108,0.2)] ring-2 ring-gold/40 hover:shadow-[0_16px_40px_rgba(229,184,108,0.28)]'
                        : 'bg-white border-[#926E24] text-slate-950 shadow-lg ring-2 ring-[#926E24]/30 hover:shadow-xl'
                      : isDark
                        ? 'bg-white/4 border-white/10 text-slate-400 hover:text-white hover:bg-white/8 hover:border-gold/50 hover:shadow-[0_12px_30px_rgba(229,184,108,0.14)]'
                        : 'bg-white/70 border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-white hover:border-[#926E24]/50 hover:shadow-[0_12px_30px_rgba(146,110,36,0.12)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${
                        isSelected 
                          ? (isDark ? 'text-gold' : 'text-gold-deep') 
                          : (isDark ? 'text-slate-500' : 'text-slate-400')
                      }`} />
                      <span className="text-[11px] font-mono uppercase font-bold tracking-wider">
                        SECCIONAL 0{idx + 1}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isSelected 
                        ? (isDark ? 'bg-gold/20 text-gold' : 'bg-[#F9F6F0] text-gold-deep') 
                        : 'opacity-50'
                    }`}>
                      {region.mineral.split('&')[0].trim()}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight leading-snug">
                    {region.name}
                  </h3>
                  <p className={`text-xs mt-1.5 font-medium ${
                    isSelected ? (isDark ? 'text-gold-light' : 'text-[#7E5E1A]') : 'opacity-70'
                  }`}>
                    {region.municipalities}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Region Detailed Dossier Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className={`p-8 sm:p-10 rounded-3xl border mb-16 relative overflow-hidden transition-all duration-300 hover:border-gold/30 ${
              isDark 
                ? 'bg-[#121620] border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.7)]' 
                : 'bg-white border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_60px_rgba(146,110,36,0.08)]'
            }`}
          >
            {/* Top Region Details Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 mb-8 border-b border-slate-200/80 dark:border-white/10 gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`p-1.5 rounded-lg ${isDark ? 'bg-gold/20 text-gold' : 'bg-[#F9F6F0] text-gold-deep'}`}>
                    <Pickaxe className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    isDark ? 'text-gold' : 'text-gold-deep'
                  }`}>
                    {activeRegion.mineral}
                  </span>
                </div>
                <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}>
                  {activeRegion.name}
                </h3>
                <p className={`text-xs sm:text-sm font-mono mt-1 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {activeRegion.municipalities}
                </p>
              </div>

              {/* Quick geography tag */}
              <div className={`max-w-md p-4 rounded-2xl border text-xs leading-relaxed transition-all duration-300 cursor-default hover:-translate-y-0.5 ${
                isDark 
                  ? 'bg-black/40 border-white/10 text-slate-300 hover:border-gold/40 hover:bg-black/60 hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)]' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#926E24]/40 hover:bg-white hover:shadow-md'
              }`}>
                <div className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-gold" />
                  <span>{lang === 'es' ? 'Condición Geográfica de Acceso' : 'Geographic Access Context'}</span>
                </div>
                {activeRegion.geography}
              </div>
            </div>

            {/* Strategic Pillars Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              
              {/* Pillar 1: Legal Framework */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between group transition-all duration-300 cursor-default hover:-translate-y-1.5 ${
                isDark 
                  ? 'bg-white/3 border-white/8 hover:bg-white/[0.08] hover:border-gold/60 hover:shadow-[0_12px_32px_rgba(229,184,108,0.18)]' 
                  : 'bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-[#926E24]/60 hover:shadow-[0_12px_32px_rgba(146,110,36,0.14)]'
              }`}>
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                    isDark ? 'bg-gold/15 text-gold' : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
                  }`}>
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {lang === 'es' ? 'Fortalecimiento Institucional para la Gobernanza' : 'Institutional Strengthening for Governance'}
                  </span>
                  <h4 className={`text-base font-bold mb-2.5 transition-colors duration-200 ${
                    isDark ? 'text-white group-hover:text-gold' : 'text-slate-900 group-hover:text-gold-deep'
                  }`}>
                    {activeRegion.legalMechanism}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lang === 'es' 
                      ? 'Fortalecimiento institucional para la gobernanza, estructuración directa de garantías legales, contratos de formalización y articulación con titulares mineros y la ANM.'
                      : 'Institutional strengthening for governance, direct structuring of legal guarantees, formalization contracts, and alignment with concession holders and the ANM.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-500 transition-transform duration-200 group-hover:translate-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'es' ? 'Bancarizable y Auditable' : 'Bankable & Fully Auditable'}</span>
                </div>
              </div>

              {/* Pillar 2: Clean Technology */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between group transition-all duration-300 cursor-default hover:-translate-y-1.5 ${
                isDark 
                  ? 'bg-white/3 border-white/8 hover:bg-white/[0.08] hover:border-emerald-400/60 hover:shadow-[0_12px_32px_rgba(52,211,153,0.18)]' 
                  : 'bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-emerald-600/60 hover:shadow-[0_12px_32px_rgba(16,185,129,0.14)]'
              }`}>
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                    isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {lang === 'es' ? 'Tecnología Cero Mercurio' : 'Zero-Mercury Technology'}
                  </span>
                  <h4 className={`text-base font-bold mb-2.5 transition-colors duration-200 ${
                    isDark ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-700'
                  }`}>
                    {lang === 'es' ? 'Reconversión en Boca de Mina' : 'Mine-Site Clean Technology'}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {activeRegion.techIntervention}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-500 transition-transform duration-200 group-hover:translate-x-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{lang === 'es' ? 'Sin Químicos Contaminantes' : 'Non-Toxic Extraction'}</span>
                </div>
              </div>

              {/* Pillar 3: Self-Sustaining Economy */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between group transition-all duration-300 cursor-default hover:-translate-y-1.5 ${
                isDark 
                  ? 'bg-white/3 border-white/8 hover:bg-white/[0.08] hover:border-gold/60 hover:shadow-[0_12px_32px_rgba(229,184,108,0.18)]' 
                  : 'bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-[#926E24]/60 hover:shadow-[0_12px_32px_rgba(146,110,36,0.14)]'
              }`}>
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                    isDark ? 'bg-gold/15 text-gold' : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
                  }`}>
                    <Trees className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {lang === 'es' ? 'Economía Autosostenible' : 'Self-Sustaining Economy'}
                  </span>
                  <h4 className={`text-base font-bold mb-2.5 transition-colors duration-200 ${
                    isDark ? 'text-white group-hover:text-gold' : 'text-slate-900 group-hover:text-gold-deep'
                  }`}>
                    {lang === 'es' ? 'Desarrollo Territorial Paralelo' : 'Parallel Regional Development'}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {activeRegion.sustainability}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-semibold text-gold dark:text-gold-light transition-transform duration-200 group-hover:translate-x-1">
                  <Coins className="w-3.5 h-3.5" />
                  <span>{lang === 'es' ? 'Diversificación de Ingresos' : 'Income Diversification'}</span>
                </div>
              </div>

            </div>

            {/* Metrics Ribbon inside Card */}
            <div className={`p-6 rounded-2xl border grid grid-cols-1 sm:grid-cols-3 gap-6 text-center transition-all duration-300 ${
              isDark 
                ? 'bg-black/50 border-white/10 hover:border-gold/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
                : 'bg-[#FDFBF7] border-[#E8DCC4] hover:border-[#926E24]/40 hover:shadow-md'
            }`}>
              {activeRegion.stats.map((st: any, sIdx: number) => (
                <div 
                  key={sIdx} 
                  className={`flex flex-col items-center p-3.5 rounded-xl border border-transparent transition-all duration-300 cursor-default hover:-translate-y-1 group ${
                    isDark 
                      ? 'hover:bg-white/[0.06] hover:border-gold/40 hover:shadow-[0_8px_20px_rgba(229,184,108,0.12)]' 
                      : 'hover:bg-white hover:border-[#926E24]/40 hover:shadow-[0_8px_20px_rgba(146,110,36,0.08)]'
                  }`}
                >
                  <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight group-hover:scale-105 transition-transform duration-300 ${
                    isDark ? 'text-gold' : 'text-gold-deep'
                  }`}>
                    {st.value}
                  </span>
                  <span className={`text-xs font-semibold uppercase tracking-wider mt-1 transition-colors duration-200 ${
                    isDark ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-950'
                  }`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
            {activeRegion.stats.some((st: any) => st.label.includes('*')) && (
              <div className="mt-2.5 px-2 text-right">
                <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {lang === 'es' 
                    ? '* Cifra correspondiente a la primera fase del programa piloto territorial.' 
                    : '* Figure corresponds to phase one of the territorial pilot program.'}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Methodology Roadmap in Remote Territories */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
              isDark ? 'text-gold' : 'text-gold-deep'
            }`}>
              {tContent.methodologyLabel}
            </span>
            <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight mt-2 ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {lang === 'es' 
                ? 'Cómo Transformamos la Informalidad en Legalidad' 
                : 'How We Transform Informal Extraction into Legal Prosperity'}
            </h3>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {tContent.methodology.map((m, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border relative flex flex-col justify-between transition-all duration-300 cursor-default group hover:-translate-y-1.5 ${
                  isDark 
                    ? 'bg-white/4 border-white/10 hover:bg-white/[0.08] hover:border-gold/60 hover:shadow-[0_14px_35px_rgba(229,184,108,0.16)]' 
                    : 'bg-white border-slate-200/90 hover:border-[#926E24]/60 hover:shadow-[0_14px_35px_rgba(146,110,36,0.14)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-2xl font-black font-mono transition-transform duration-300 group-hover:scale-110 ${
                      isDark ? 'text-gold' : 'text-gold-deep'
                    }`}>
                      {m.step}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-gold/50 transition-all duration-300 group-hover:bg-gold group-hover:scale-125" />
                  </div>
                  <h4 className={`text-base font-bold mb-2.5 transition-colors duration-200 ${
                    isDark ? 'text-white group-hover:text-gold' : 'text-slate-900 group-hover:text-gold-deep'
                  }`}>
                    {m.title}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Institutional Strip */}
        <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 ${
          isDark 
            ? 'bg-linear-to-r from-black via-[#141822] to-black border-gold/25 hover:border-gold/50 hover:shadow-[0_15px_40px_rgba(229,184,108,0.12)]' 
            : 'bg-linear-to-r from-white via-[#F9F6F0] to-white border-[#E8DCC4] shadow-md hover:border-[#926E24]/50 hover:shadow-lg'
        }`}>
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              isDark ? 'bg-gold/15 text-gold' : 'bg-black text-gold shadow-xs'
            }`}>
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {lang === 'es' ? '¿Requiere acompañamiento en formalización territorial?' : 'Need Territorial Formalization Advisory?'}
              </h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {lang === 'es' 
                  ? 'Articulamos acuerdos entre comunidades, titulares de concesión y el Estado con total confidencialidad.' 
                  : 'We architect compacts between communities, concession holders, and the State with total confidentiality.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className={`${
                isDark ? 'btn-gold' : 'btn-primary-light'
              } !px-6 !py-3 text-xs font-bold w-full sm:w-auto text-center cursor-pointer`}
            >
              {lang === 'es' ? 'Solicitar Misión en Región' : 'Request Field Mission'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
export default TerritorialFormalization;
