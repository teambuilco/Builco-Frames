import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NetworkBackground } from './NetworkBackground';
import { ArrowRight, Globe, Zap, Shield, ChevronRight, Menu, X, Sun, Moon, Languages, ChevronDown, Check } from 'lucide-react';
import Logo from './Logo';

import { AppContext } from '../context/AppContext';

const Hero = () => {
  const { t, theme, setIsMinoModalOpen } = useContext(AppContext);
  const renderLinkedText = (text: string) => {
    const parts = text.split(/(mining|minería|energy|energía|Government and Public Relations|Gobierno y Relaciones Públicas)/gi);
    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (lower === 'mining' || lower === 'minería') {
        return (
          <a 
            key={i} 
            href="/mining" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`font-bold transition-all border-b border-gold/30 hover:border-gold hover:text-gold cursor-pointer`}
          >
            {part}
          </a>
        );
      }
      if (lower === 'energy' || lower === 'energía') {
        return (
          <a 
            key={i} 
            href="/energy" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`font-bold transition-all border-b border-gold/30 hover:border-gold hover:text-gold cursor-pointer`}
          >
            {part}
          </a>
        );
      }
      if (lower === 'government and public relations' || lower === 'gobierno y relaciones públicas') {
        return (
          <a 
            key={i} 
            href="/government" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`font-bold transition-all border-b border-gold/30 hover:border-gold hover:text-gold cursor-pointer`}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest mb-8 text-[10px] transition-colors ${theme === 'dark' ? 'bg-gold/10 border border-gold/20 text-gold' : 'bg-gold-soft border border-gold-deep/20 text-gold-deep'}`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme === 'dark' ? 'bg-gold' : 'bg-gold-deep'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${theme === 'dark' ? 'bg-gold' : 'bg-gold-deep'}`}></span>
            </span>
            {t.badge}
          </div>
          <h1 className={`text-5xl md:text-7xl font-bold leading-[1.05] mb-8 tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            <Logo className={`inline-block w-12 h-12 md:w-20 md:h-20 mr-4 md:mr-6 mb-2 md:mb-4 align-middle ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
            {t.heroTitle}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'}>{t.heroTitleHighlight}</span>{t.heroTitleEnd}
          </h1>
          <p className={`text-lg md:text-xl mb-12 leading-relaxed max-w-2xl transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-slate-500 font-medium'}`}>
            {renderLinkedText(t.heroSub)}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <button 
              onClick={() => setIsMinoModalOpen(true)}
              className={theme === 'dark' ? 'btn-gold flex items-center justify-center gap-2 group !px-12 !py-5' : 'btn-primary-light flex items-center justify-center gap-2 group !px-12 !py-5'}
            >
              {t.getStarted} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className={`px-12 py-5 border-2 font-bold rounded-lg transition-all active:scale-95 text-lg ${theme === 'dark' ? 'border-white/20 hover:bg-white/5 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-900 shadow-sm'}`}>
              {t.portfolio}
            </button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className={`w-px h-16 ${theme === 'dark' ? 'bg-linear-to-b from-gold to-transparent' : 'bg-linear-to-b from-gold-deep to-transparent'}`}></div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const { t, theme } = useContext(AppContext);
  return (
    <section className={`py-12 border-y transition-all duration-500 overflow-hidden ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className={`text-center text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-slate-300'}`}>
          {t.socialProof}
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center whitespace-nowrap px-10"
        >
          {[...t.clients, ...t.clients].map((client, i) => (
            <span key={i} className={`text-2xl font-helvetica font-black uppercase tracking-tighter opacity-40 hover:opacity-100 transition-opacity cursor-default ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {client}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const LocationMarquee = () => {
  const { t, theme } = useContext(AppContext);
  
  const partners = [
    { 
      name: "Cámara de Comercio de Bogotá", 
      logo: "https://storage.googleapis.com/aistudio-build-assets/3obsvayrmxfpx44asrww57/logo_4.png" 
    },
    { 
      name: "ParqueE", 
      logo: "https://parquee.com.co/wp-content/uploads/2021/06/Logo-Parque-E-01.png" 
    },
    { 
      name: "Alcaldía de Medellín", 
      logo: "https://www.medellin.gov.co/irj/go/km/docs/pccdesign/medellin/Temas/Alcaldia/Logos/Logo_Alcaldia_Medellin.png" 
    }
  ];

  return (
    <section className={`py-12 border-y transition-all duration-500 overflow-hidden ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className={`text-center text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'} mb-12`}>
          {t.whereWeAre}
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Logo 
                src={partner.logo} 
                className={`h-12 md:h-16 w-12 md:w-16 transition-all duration-500 opacity-40 group-hover:opacity-100 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="relative flex overflow-hidden mt-12">
        <motion.div 
          animate={{ x: [-1000, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center whitespace-nowrap px-10"
        >
            {[...t.locations, ...t.locations].map((location, i) => (
            <div key={i} className="flex items-center gap-4">
              <Globe className={`w-5 h-5 opacity-50 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
              <span className={`text-2xl font-helvetica font-black uppercase tracking-tighter opacity-40 hover:opacity-100 transition-opacity cursor-default ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {location}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const { t, theme } = useContext(AppContext);
  const icons = [
    <Globe className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'} />, 
    <Zap className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'} />, 
    <Shield className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'} />
  ];

  const renderLinkedText = (text: string) => {
    const parts = text.split(/(mining|minería|energy|energía|Government and Public Relations|Gobierno y Relaciones Públicas)/gi);
    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (lower === 'mining' || lower === 'minería') {
        return (
          <a 
            key={i} 
            href="/mining" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`font-bold transition-all border-b border-gold/30 hover:border-gold hover:text-gold cursor-pointer`}
          >
            {part}
          </a>
        );
      }
      if (lower === 'energy' || lower === 'energía') {
        return (
          <a 
            key={i} 
            href="/energy" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`font-bold transition-all border-b border-gold/30 hover:border-gold hover:text-gold cursor-pointer`}
          >
            {part}
          </a>
        );
      }
      if (lower === 'government and public relations' || lower === 'gobierno y relaciones públicas') {
        return (
          <a 
            key={i} 
            href="/government" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`font-bold transition-all border-b border-gold/30 hover:border-gold hover:text-gold cursor-pointer`}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <section id="solutions" className={`py-32 transition-colors duration-500 ${theme === 'dark' ? 'bg-charcoal' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {t.servicesTitle}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'}>{t.servicesTitleHighlight}</span>
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
                {React.cloneElement(icons[index] as React.ReactElement, { className: `w-8 h-8 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}` })}
              </div>
              <h3 className={`text-2xl font-bold mb-5 relative z-10 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
              <p className={`leading-relaxed relative z-10 transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-500 font-medium'}`}>
                {renderLinkedText(service.description)}
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
                <span className={`font-display font-bold text-3xl ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`}>{step.number}</span>
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

  const renderLinkedText = (text: string) => {
    const parts = text.split(/(mining|minería|energy|energía|Government and Public Relations|Gobierno y Relaciones Públicas)/gi);
    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (lower === 'mining' || lower === 'minería') {
        return (
          <a 
            key={i} 
            href="/mining" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`font-bold transition-all border-b border-gold/30 hover:border-gold hover:text-gold cursor-pointer`}
          >
            {part}
          </a>
        );
      }
      if (lower === 'energy' || lower === 'energía') {
        return (
          <a 
            key={i} 
            href="/energy" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`font-bold transition-all border-b border-gold/30 hover:border-gold hover:text-gold cursor-pointer`}
          >
            {part}
          </a>
        );
      }
      if (lower === 'government and public relations' || lower === 'gobierno y relaciones públicas') {
        return (
          <a 
            key={i} 
            href="/government" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`font-bold transition-all border-b border-gold/30 hover:border-gold hover:text-gold cursor-pointer`}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <section className={`py-32 transition-colors duration-500 ${theme === 'dark' ? 'bg-charcoal' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-10 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.diffTitle}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'}>{t.diffTitleHighlight}</span>
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
                  <div className={`mt-1 p-2 rounded-lg ${theme === 'dark' ? 'bg-gold/10' : 'bg-gold-soft'}`}><ChevronRight className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'} /></div>
                  <div>
                    <h4 className={`text-xl font-bold mb-3 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                    <p className={`text-lg transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-500 font-medium'}`}>{renderLinkedText(item.desc)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className={`aspect-square rounded-sm border p-10 transition-all duration-700 group-hover:scale-[1.02] ${theme === 'dark' ? 'bg-linear-to-br from-gold/20 to-transparent border-gold/10' : 'bg-linear-to-br from-gold/10 to-transparent border-gold/20'}`}>
              <div className={`w-full h-full border rounded-sm flex items-center justify-center p-16 text-center transition-all duration-500 ${theme === 'dark' ? 'border-white/5 bg-black/40 shadow-2xl shadow-black' : 'border-slate-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]'}`}>
                <div>
                  <div className={`text-7xl font-bold mb-6 tracking-tighter ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`}>15+</div>
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
  const { t, theme, setIsContactModalOpen } = useContext(AppContext);
  return (
    <section className={`py-40 border-t transition-all duration-500 ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-slate-50 border-slate-200'}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`text-4xl md:text-6xl font-bold mb-10 leading-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {t.ctaTitle}<span className={theme === 'dark' ? 'text-gold' : 'text-gold-deep'}>{t.ctaTitleHighlight}</span>
        </h2>
        <p className={`text-xl mb-16 transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-slate-500 font-medium'}`}>{t.ctaSub}</p>
        <button 
          onClick={() => setIsContactModalOpen(true)}
          className={theme === 'dark' ? 'btn-gold !px-20 !py-6 !text-2xl mt-4' : 'btn-primary-light !px-20 !py-6 !text-2xl mt-4'}
        >
          {t.ctaBtn}
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t, theme, setIsPrivacyModalOpen, setIsContactModalOpen } = useContext(AppContext);
  return (
    <footer className={`py-24 border-t transition-colors duration-500 ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <div 
              className="flex items-center gap-3 mb-8 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Logo className={`w-8 h-8 group-hover:scale-110 transition-transform ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
              <span className={`text-2xl font-helvetica font-bold tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>BUILDING CONNECTIONS</span>
            </div>
            <p className={`max-w-sm leading-relaxed text-lg transition-colors ${theme === 'dark' ? 'text-white/40' : 'text-slate-500 font-medium'}`}>
              {t.footerDesc}
            </p>
          </div>
          <div>
            <h5 className={`font-black mb-8 uppercase text-[10px] tracking-[0.3em] ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`}>Solutions</h5>
            <ul className={`space-y-5 text-sm transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-600 font-bold'}`}>
              {t.solutions.map((sol, i) => {
                const lower = sol.toLowerCase();
                const isMining = lower === 'mining' || lower === 'minería';
                const isEnergy = lower === 'energy' || lower === 'energía';
                const isGov = lower === 'government and public relations' || lower === 'gobierno y relaciones públicas';
                
                let href = "#";
                if (isMining) href = "/mining";
                else if (isEnergy) href = "/energy";
                else if (isGov) href = "/government";

                return (
                  <li key={i}>
                    <a 
                      href={href} 
                      target={isMining || isEnergy || isGov ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className={`transition-colors ${theme === 'dark' ? 'hover:text-gold' : 'hover:text-gold-deep'}`}
                    >
                      {sol}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h5 className={`font-black mb-8 uppercase text-[10px] tracking-[0.3em] ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`}>Company</h5>
            <ul className={`space-y-5 text-sm transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-slate-600 font-bold'}`}>
              <li><a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-gold' : 'hover:text-gold-deep'}`}>About Us</a></li>
              <li><button onClick={() => setIsContactModalOpen(true)} className={`transition-colors cursor-pointer ${theme === 'dark' ? 'hover:text-gold' : 'hover:text-gold-deep'}`}>Contact</button></li>
              <li><button onClick={() => setIsPrivacyModalOpen(true)} className={`transition-colors cursor-pointer ${theme === 'dark' ? 'hover:text-gold' : 'hover:text-gold-deep'}`}>Privacy Policy</button></li>
            </ul>
          </div>
        </div>
        <div className={`pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
          <p className={`text-xs font-bold transition-colors ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>{t.footerRights}</p>
          <div className="flex gap-8">
            {['LinkedIn', 'Twitter', 'Facebook'].map(social => (
              <a key={social} href="#" className={`text-xs font-bold transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-gold' : 'text-slate-400 hover:text-gold-deep'}`}>{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  const { theme } = useContext(AppContext);

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${theme === 'dark' ? 'bg-charcoal' : 'bg-white'}`}>
      <NetworkBackground />
      <Hero />
      <SocialProof />
      <Services />
      <LocationMarquee />
      <Process />
      <Differentiation />
      <FinalCTA />
      <Footer />
    </div>
  );
}

