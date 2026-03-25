import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NetworkBackground } from './NetworkBackground';
import { ArrowRight, Globe, Zap, Shield, ChevronRight, Menu, X, Sun, Moon, Languages } from 'lucide-react';

type Language = 'en' | 'es';
type Theme = 'dark' | 'light';

const translations = {
  en: {
    nav: ['Solutions', 'Industries', 'Process', 'About'],
    contact: 'Contact Us',
    badge: 'Global Strategic Partner',
    heroTitle: 'Building strategic connections in ',
    heroTitleHighlight: 'high-impact',
    heroTitleEnd: ' industries',
    heroSub: 'We bridge the gap between vision and execution in mining, energy, and infrastructure. Accelerating global growth through elite networking and strategic intelligence.',
    getStarted: 'Get Started',
    portfolio: 'Our Portfolio',
    socialProof: 'Trusted by Industry Leaders Worldwide',
    servicesTitle: 'Expertise that drives ',
    servicesTitleHighlight: 'global impact',
    services: [
      {
        title: "Global Intelligence",
        description: "Deep market insights and geopolitical analysis for high-stakes decision making in emerging markets."
      },
      {
        title: "Strategic Networking",
        description: "Direct access to key stakeholders, government officials, and industry pioneers across three continents."
      },
      {
        title: "Asset Optimization",
        description: "Maximizing value in mining and energy projects through operational excellence and strategic alignment."
      }
    ],
    processTitle: 'Our Strategic Flow',
    processSub: 'A structured approach to complex global challenges.',
    steps: [
      { number: "01", title: "Analysis", desc: "We identify high-potential opportunities and map the strategic landscape." },
      { number: "02", title: "Connection", desc: "We bridge the gap between your vision and the right global partners." },
      { number: "03", title: "Execution", desc: "We facilitate the operational and strategic rollout of your project." }
    ],
    diffTitle: 'Why industry leaders ',
    diffTitleHighlight: 'choose Builco',
    diffItems: [
      { title: "Elite Network", desc: "Access to decision-makers that aren't on any public directory." },
      { title: "Deep Domain Expertise", desc: "Decades of experience in mining, energy, and infrastructure." },
      { title: "Absolute Discretion", desc: "High-stakes strategic work requires the highest level of confidentiality." }
    ],
    yearsExp: 'Years of Strategic Excellence',
    ctaTitle: 'Ready to scale your ',
    ctaTitleHighlight: 'global footprint?',
    ctaSub: 'Join the network of industry pioneers shaping the future of infrastructure.',
    ctaBtn: 'Schedule a Strategic Consultation',
    footerDesc: 'Strategic connections for high-impact industries. Global reach, local intelligence, absolute discretion.',
    footerRights: '© 2026 BUILCO STRATEGIC PARTNERS. ALL RIGHTS RESERVED.'
  },
  es: {
    nav: ['Soluciones', 'Industrias', 'Proceso', 'Nosotros'],
    contact: 'Contáctanos',
    badge: 'Socio Estratégico Global',
    heroTitle: 'Construyendo conexiones estratégicas en industrias de ',
    heroTitleHighlight: 'alto impacto',
    heroTitleEnd: '',
    heroSub: 'Cerramos la brecha entre la visión y la ejecución en minería, energía e infraestructura. Acelerando el crecimiento global a través de redes de élite e inteligencia estratégica.',
    getStarted: 'Empezar',
    portfolio: 'Nuestro Portafolio',
    socialProof: 'Con la confianza de líderes de la industria en todo el mundo',
    servicesTitle: 'Experiencia que impulsa el ',
    servicesTitleHighlight: 'impacto global',
    services: [
      {
        title: "Inteligencia Global",
        description: "Información profunda del mercado y análisis geopolítico para la toma de decisiones de alto nivel en mercados emergentes."
      },
      {
        title: "Redes Estratégicas",
        description: "Acceso directo a partes interesadas clave, funcionarios gubernamentales y pioneros de la industria en tres continentes."
      },
      {
        title: "Optimización de Activos",
        description: "Maximizando el valor en proyectos de minería y energía a través de la excelencia operativa y la alineación estratégica."
      }
    ],
    processTitle: 'Nuestro Flujo Estratégico',
    processSub: 'Un enfoque estructurado para desafíos globales complejos.',
    steps: [
      { number: "01", title: "Análisis", desc: "Identificamos oportunidades de alto potencial y mapeamos el panorama estratégico." },
      { number: "02", title: "Conexión", desc: "Cerramos la brecha entre su visión y los socios globales adecuados." },
      { number: "03", title: "Ejecución", desc: "Facilitamos el despliegue operativo y estratégico de su proyecto." }
    ],
    diffTitle: 'Por qué los líderes ',
    diffTitleHighlight: 'eligen Builco',
    diffItems: [
      { title: "Red de Élite", desc: "Acceso a tomadores de decisiones que no están en ningún directorio público." },
      { title: "Experiencia Profunda", desc: "Décadas de experiencia en minería, energía e infraestructura." },
      { title: "Discreción Absoluta", desc: "El trabajo estratégico de alto nivel requiere el más alto nivel de confidencialidad." }
    ],
    yearsExp: 'Años de Excelencia Estratégica',
    ctaTitle: '¿Listo para escalar su ',
    ctaTitleHighlight: 'huella global?',
    ctaSub: 'Únase a la red de pioneros de la industria que dan forma al futuro de la infraestructura.',
    ctaBtn: 'Programar una Consulta Estratégica',
    footerDesc: 'Conexiones estratégicas para industrias de alto impacto. Alcance global, inteligencia local, discreción absoluta.',
    footerRights: '© 2026 BUILCO STRATEGIC PARTNERS. TODOS LOS DERECHOS RESERVADOS.'
  }
};

const AppContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: typeof translations.en;
}>({
  lang: 'en',
  setLang: () => {},
  theme: 'dark',
  setTheme: () => {},
  t: translations.en
});

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M50 10 L90 50 L50 90 L10 50 Z" 
      stroke="currentColor" 
      strokeWidth="10" 
      strokeLinejoin="round"
    />
    <path 
      d="M65 35 C65 35 55 35 50 45 C45 55 55 65 65 65" 
      stroke="currentColor" 
      strokeWidth="10" 
      strokeLinecap="round"
    />
    <path 
      d="M35 65 C35 65 45 65 50 55 C55 45 45 35 35 35" 
      stroke="currentColor" 
      strokeWidth="10" 
      strokeLinecap="round"
    />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, theme, setTheme, t } = useContext(AppContext);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${theme === 'dark' ? 'glass-dark' : 'glass-light'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <Logo className="w-9 h-9 text-gold group-hover:scale-110 transition-transform" />
          <span className={`text-2xl font-display font-bold tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>BUILCO</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {t.nav.map((item, i) => (
            <a key={i} href={`#${translations.en.nav[i].toLowerCase()}`} className={`text-sm font-semibold transition-colors ${theme === 'dark' ? 'text-white/70 hover:text-gold' : 'text-slate-600 hover:text-gold'}`}>
              {item}
            </a>
          ))}
          
          <div className={`flex items-center gap-4 border-l pl-8 ml-4 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
            <button 
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/5 text-white/70' : 'hover:bg-slate-100 text-slate-600'}`}
              title="Change Language"
            >
              <div className="flex items-center gap-1.5">
                <Languages className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">{lang}</span>
              </div>
            </button>

            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/5 text-white/70' : 'hover:bg-slate-100 text-slate-600'}`}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-black text-sm font-bold rounded-sm transition-all shadow-lg shadow-gold/10 hover:shadow-gold/20 active:scale-95">
              {t.contact}
            </button>
          </div>
        </div>

        <button className={`md:hidden p-2 rounded-lg ${theme === 'dark' ? 'text-white hover:bg-white/5' : 'text-slate-900 hover:bg-slate-100'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-b overflow-hidden shadow-2xl ${theme === 'dark' ? 'bg-charcoal border-white/5' : 'bg-white border-slate-200'} px-6 py-8 flex flex-col gap-6`}
          >
            {t.nav.map((item, i) => (
              <a key={i} href={`#${translations.en.nav[i].toLowerCase()}`} className={`text-lg font-bold ${theme === 'dark' ? 'text-white/70' : 'text-slate-700'}`} onClick={() => setIsOpen(false)}>
                {item}
              </a>
            ))}
            <div className={`flex items-center justify-between pt-6 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
              <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} className="flex items-center gap-2 text-gold font-bold text-sm uppercase tracking-widest">
                <Languages className="w-5 h-5" /> {lang === 'en' ? 'Español' : 'English'}
              </button>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`p-3 rounded-full transition-colors ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-900'}`}>
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            <button className="w-full py-4 bg-gold text-black font-bold rounded-sm shadow-xl shadow-gold/20">
              {t.contact}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t, theme } = useContext(AppContext);
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest mb-8 text-[10px] transition-colors ${theme === 'dark' ? 'bg-gold/10 border border-gold/20 text-gold' : 'bg-gold/15 border border-gold/30 text-gold-hover'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            {t.badge}
          </div>
          <h1 className={`text-5xl md:text-7xl font-bold leading-[1.05] mb-8 tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {t.heroTitle}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}>{t.heroTitleHighlight}</span>{t.heroTitleEnd}
          </h1>
          <p className={`text-lg md:text-xl mb-12 leading-relaxed max-w-2xl transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-slate-500 font-medium'}`}>
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button className="px-10 py-4.5 bg-gold hover:bg-gold-hover text-black font-bold rounded-sm flex items-center justify-center gap-2 transition-all group shadow-xl shadow-gold/10 hover:shadow-gold/25 active:scale-95">
              {t.getStarted} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className={`px-10 py-4.5 border font-bold rounded-sm transition-all active:scale-95 ${theme === 'dark' ? 'border-white/20 hover:bg-white/5 text-white' : 'border-slate-300 hover:bg-slate-100 text-slate-900'}`}>
              {t.portfolio}
            </button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-px h-16 bg-linear-to-b from-gold to-transparent"></div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const { t, theme } = useContext(AppContext);
  return (
    <section className={`py-24 border-y transition-all duration-500 ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <p className={`text-center text-[10px] font-black uppercase tracking-[0.4em] mb-16 transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-slate-300'}`}>
          {t.socialProof}
        </p>
        <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-16 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700 ${theme === 'dark' ? 'invert-0' : 'invert opacity-60'}`}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex justify-center">
              <div className={`h-8 w-32 rounded-sm transition-colors ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-900/10'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const { t, theme } = useContext(AppContext);
  const icons = [<Globe className="w-8 h-8 text-gold" />, <Zap className="w-8 h-8 text-gold" />, <Shield className="w-8 h-8 text-gold" />];

  return (
    <section id="solutions" className={`py-32 transition-colors duration-500 ${theme === 'dark' ? 'bg-charcoal' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {t.servicesTitle}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}>{t.servicesTitleHighlight}</span>
          </h2>
          <div className="w-24 h-1.5 bg-gold rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {t.services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -12 }}
              className={`p-12 border rounded-sm transition-all duration-500 group relative overflow-hidden ${theme === 'dark' ? 'card-dark' : 'card-light'}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="mb-10 relative z-10 group-hover:scale-110 transition-transform duration-500">
                {React.cloneElement(icons[index] as React.ReactElement, { className: `w-8 h-8 ${theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}` })}
              </div>
              <h3 className={`text-2xl font-bold mb-5 relative z-10 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
              <p className={`leading-relaxed relative z-10 transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-500 font-medium'}`}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const { t, theme } = useContext(AppContext);

  return (
    <section id="process" className={`py-32 relative overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-black' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.processTitle}</h2>
          <p className={`max-w-xl mx-auto text-lg transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-600 font-medium'}`}>{t.processSub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-20 relative">
          <div className={`hidden md:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}></div>
          
          {t.steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              <div className={`w-24 h-24 border-2 rounded-full flex items-center justify-center mb-10 transition-all duration-500 group-hover:border-gold group-hover:scale-110 ${theme === 'dark' ? 'bg-charcoal border-gold/30 shadow-[0_0_40px_rgba(225,180,109,0.1)]' : 'bg-white border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'}`}>
                <span className={`font-display font-bold text-3xl ${theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}`}>{step.number}</span>
              </div>
              <h3 className={`text-2xl font-bold mb-5 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
              <p className={`leading-relaxed transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-500 font-medium'}`}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Differentiation = () => {
  const { t, theme } = useContext(AppContext);
  return (
    <section className={`py-32 transition-colors duration-500 ${theme === 'dark' ? 'bg-charcoal' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-10 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.diffTitle}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}>{t.diffTitleHighlight}</span>
            </h2>
            <div className="space-y-10">
              {t.diffItems.map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex gap-8"
                >
                  <div className={`mt-1 p-2 rounded-lg ${theme === 'dark' ? 'bg-gold/10' : 'bg-gold/20'}`}><ChevronRight className={theme === 'dark' ? 'text-gold' : 'text-gold-contrast'} /></div>
                  <div>
                    <h4 className={`text-xl font-bold mb-3 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                    <p className={`text-lg transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-500 font-medium'}`}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className={`aspect-square rounded-sm border p-10 transition-all duration-700 group-hover:scale-[1.02] ${theme === 'dark' ? 'bg-linear-to-br from-gold/20 to-transparent border-gold/10' : 'bg-linear-to-br from-gold/10 to-transparent border-gold/20'}`}>
              <div className={`w-full h-full border rounded-sm flex items-center justify-center p-16 text-center transition-all duration-500 ${theme === 'dark' ? 'border-white/5 bg-black/40 shadow-2xl shadow-black' : 'border-slate-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]'}`}>
                <div>
                  <div className={`text-7xl font-bold mb-6 tracking-tighter ${theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}`}>15+</div>
                  <div className={`text-xs font-black uppercase tracking-[0.3em] transition-colors ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{t.yearsExp}</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-gold/30 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-gold/30 transition-all duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const { t, theme } = useContext(AppContext);
  return (
    <section className={`py-40 border-t transition-all duration-500 ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-slate-50 border-slate-200'}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`text-4xl md:text-6xl font-bold mb-10 leading-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {t.ctaTitle}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-contrast'}>{t.ctaTitleHighlight}</span>
        </h2>
        <p className={`text-xl mb-16 transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-slate-500 font-medium'}`}>{t.ctaSub}</p>
        <button className="px-14 py-6 bg-gold hover:bg-gold-hover text-black font-bold text-xl rounded-sm transition-all shadow-2xl shadow-gold/20 hover:shadow-gold/40 active:scale-95">
          {t.ctaBtn}
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t, theme } = useContext(AppContext);
  return (
    <footer className={`py-24 border-t transition-colors duration-500 ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Logo className="w-8 h-8 text-gold" />
              <span className={`text-2xl font-display font-bold tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>BUILCO</span>
            </div>
            <p className={`max-w-sm leading-relaxed text-lg transition-colors ${theme === 'dark' ? 'text-white/40' : 'text-slate-500 font-medium'}`}>
              {t.footerDesc}
            </p>
          </div>
          <div>
            <h5 className="font-black mb-8 uppercase text-[10px] tracking-[0.3em] text-gold">Solutions</h5>
            <ul className={`space-y-5 text-sm transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-600 font-semibold'}`}>
              <li><a href="#" className="hover:text-gold transition-colors">Mining</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Energy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Infrastructure</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black mb-8 uppercase text-[10px] tracking-[0.3em] text-gold">Company</h5>
            <ul className={`space-y-5 text-sm transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-600 font-semibold'}`}>
              <li><a href="#" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className={`pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
          <p className={`text-xs font-bold transition-colors ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>{t.footerRights}</p>
          <div className="flex gap-8">
            {['LinkedIn', 'Twitter'].map(social => (
              <a key={social} href="#" className={`text-xs font-bold transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-gold' : 'text-slate-400 hover:text-gold'}`}>{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <AppContext.Provider value={{ lang, setLang, theme, setTheme, t: translations[lang] }}>
      <div className={`min-h-screen transition-colors duration-300 relative ${theme === 'dark' ? 'bg-charcoal' : 'bg-white'}`}>
        <NetworkBackground />
        <Navbar />
        <Hero />
        <SocialProof />
        <Services />
        <Process />
        <Differentiation />
        <FinalCTA />
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

