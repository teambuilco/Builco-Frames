import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Languages, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const { lang, setLang, theme, setTheme, t, setIsContactModalOpen } = useContext(AppContext);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const NavLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) => {
    if (href.startsWith('#')) {
      return (
        <a 
          href={isHomePage ? href : `/${href}`} 
          className={`text-sm font-semibold tracking-tight transition-all duration-200 px-3 py-1.5 rounded-lg ${
            theme === 'dark' 
              ? 'text-white/70 hover:text-white hover:bg-white/5' 
              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
          }`}
          onClick={(e) => {
            if (href === '#' || href === '#top') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link 
        to={href} 
        className={`text-sm font-semibold tracking-tight transition-all duration-200 px-3 py-1.5 rounded-lg ${
          theme === 'dark' 
            ? 'text-white/70 hover:text-white hover:bg-white/5' 
            : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
        }`}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }}
        {...props}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${theme === 'dark' ? 'glass-dark' : 'glass-light'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center gap-3.5 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className={`p-1.5 rounded-xl transition-transform duration-300 group-hover:scale-105 ${
              theme === 'dark' ? 'bg-gold/10' : 'bg-black shadow-sm'
            }`}>
              <Logo className="w-8 h-8 text-gold" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-helvetica font-bold tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                BUILDING CONNECTIONS
              </span>
              <span className={`text-[9px] font-bold tracking-[0.25em] uppercase -mt-0.5 ${
                theme === 'dark' ? 'text-gold/70' : 'text-gold-deep'
              }`}>
                Strategic Partners
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {t.nav.map((item, i) => {
              const isIndustries = i === 1;
              const isAbout = i === 3;

              if (isIndustries) {
                return (
                  <div 
                    key={i} 
                    className="relative"
                    onMouseEnter={() => setIsIndustriesOpen(true)}
                    onMouseLeave={() => setIsIndustriesOpen(false)}
                  >
                    <button 
                      className={`flex items-center gap-1 text-sm font-semibold tracking-tight transition-all duration-200 px-3 py-1.5 rounded-lg ${
                        theme === 'dark' 
                          ? 'text-white/70 hover:text-white hover:bg-white/5' 
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
                      }`}
                      onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
                    >
                      {item} <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isIndustriesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isIndustriesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className={`absolute top-full left-0 mt-2 w-60 rounded-2xl shadow-2xl border overflow-hidden p-2 backdrop-blur-2xl ${
                            theme === 'dark' 
                              ? 'bg-[#12151B]/95 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]' 
                              : 'bg-white/95 border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.12)]'
                          }`}
                        >
                          <Link 
                            to="/mining" 
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                              theme === 'dark' 
                                ? 'text-white/80 hover:bg-white/10 hover:text-gold' 
                                : 'text-slate-700 hover:bg-slate-100 hover:text-gold-deep'
                            }`}
                            onClick={() => {
                              setIsIndustriesOpen(false);
                              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                            }}
                          >
                            <span className="w-2 h-2 rounded-full bg-gold-deep" />
                            {lang === 'es' ? 'Minería y Recursos' : 'Mining & Resources'}
                          </Link>
                          <Link 
                            to="/energy" 
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                              theme === 'dark' 
                                ? 'text-white/80 hover:bg-white/10 hover:text-gold' 
                                : 'text-slate-700 hover:bg-slate-100 hover:text-gold-deep'
                            }`}
                            onClick={() => {
                              setIsIndustriesOpen(false);
                              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                            }}
                          >
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            {lang === 'es' ? 'Energía y Transición' : 'Energy & Transition'}
                          </Link>
                          <Link 
                            to="/government" 
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                              theme === 'dark' 
                                ? 'text-white/80 hover:bg-white/10 hover:text-gold' 
                                : 'text-slate-700 hover:bg-slate-100 hover:text-gold-deep'
                            }`}
                            onClick={() => {
                              setIsIndustriesOpen(false);
                              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                            }}
                          >
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            {lang === 'es' ? 'Relaciones Públicas' : 'Public Relations'}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (isAbout) {
                return (
                  <div 
                    key={i} 
                    className="relative"
                    onMouseEnter={() => setIsAboutOpen(true)}
                    onMouseLeave={() => setIsAboutOpen(false)}
                  >
                    <button 
                      className={`flex items-center gap-1 text-sm font-semibold tracking-tight transition-all duration-200 px-3 py-1.5 rounded-lg ${
                        theme === 'dark' 
                          ? 'text-white/70 hover:text-white hover:bg-white/5' 
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
                      }`}
                      onClick={() => setIsAboutOpen(!isAboutOpen)}
                    >
                      {item} <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAboutOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isAboutOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className={`absolute top-full right-0 mt-2 w-52 rounded-2xl shadow-2xl border overflow-hidden p-2 backdrop-blur-2xl ${
                            theme === 'dark' 
                              ? 'bg-[#12151B]/95 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]' 
                              : 'bg-white/95 border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.12)]'
                          }`}
                        >
                          <Link 
                            to="/about" 
                            className={`block px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                              theme === 'dark' 
                                ? 'text-white/80 hover:bg-white/10 hover:text-gold' 
                                : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-950'
                            }`}
                            onClick={() => {
                              setIsAboutOpen(false);
                              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                            }}
                          >
                            {item}
                          </Link>
                          <Link 
                            to="/mino" 
                            className={`flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                              theme === 'dark' 
                                ? 'text-white/80 hover:bg-white/10 hover:text-gold' 
                                : 'text-slate-700 hover:bg-slate-100 hover:text-gold-deep'
                            }`}
                            onClick={() => {
                              setIsAboutOpen(false);
                              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                            }}
                          >
                            <span>Mino™ Platform</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]">VIP</span>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <NavLink key={i} href={`#${['solutions', 'industries', 'process', 'about'][i]}`}>
                  {item}
                </NavLink>
              );
            })}
            
            <div className={`flex items-center gap-3 border-l pl-6 ml-3 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200/80'}`}>
              <button 
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className={`px-3 py-1.5 rounded-xl transition-all duration-200 text-xs font-bold tracking-wider flex items-center gap-2 border select-none ${
                  theme === 'dark' 
                    ? 'bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-gold/30' 
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800 border-slate-200/80 hover:border-gold-deep/30'
                }`}
                title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
                aria-label="Toggle Language"
              >
                <Languages className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
                <span className="flex items-center gap-1">
                  <span className={`transition-colors ${lang === 'en' ? (theme === 'dark' ? 'text-gold font-extrabold' : 'text-gold-deep font-extrabold') : 'opacity-40 font-semibold'}`}>EN</span>
                  <span className="opacity-30">/</span>
                  <span className={`transition-colors ${lang === 'es' ? (theme === 'dark' ? 'text-gold font-extrabold' : 'text-gold-deep font-extrabold') : 'opacity-40 font-semibold'}`}>ES</span>
                </span>
              </button>

              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'bg-white/5 hover:bg-white/10 text-gold hover:text-white' 
                    : 'bg-slate-100 hover:bg-slate-200/80 text-gold-deep hover:text-slate-900'
                }`}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button 
                onClick={() => setIsContactModalOpen(true)}
                className={theme === 'dark' ? 'btn-gold !px-5 !py-2.5 text-xs' : 'btn-primary-light !px-5 !py-2.5 text-xs'}
              >
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
            {t.nav.map((item, i) => {
              const isIndustries = i === 1;
              const isAbout = i === 3;

              if (isIndustries) {
                return (
                  <div key={i} className="flex flex-col gap-4">
                    <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                      {item}
                    </div>
                    <div className="flex flex-col gap-4 pl-4 border-l-2 border-gold/30">
                      <Link 
                        to="/mining" 
                        className={`text-left text-base font-bold ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}
                        onClick={() => {
                          setIsOpen(false);
                          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        }}
                      >
                        {lang === 'es' ? 'Minería' : 'Mining'}
                      </Link>
                      <Link 
                        to="/energy" 
                        className={`text-left text-base font-bold ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}
                        onClick={() => {
                          setIsOpen(false);
                          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        }}
                      >
                        {lang === 'es' ? 'Energía' : 'Energy'}
                      </Link>
                      <Link 
                        to="/government" 
                        className={`text-left text-base font-bold ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}
                        onClick={() => {
                          setIsOpen(false);
                          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        }}
                      >
                        {lang === 'es' ? 'Relaciones Públicas' : 'Public Relations'}
                      </Link>
                    </div>
                  </div>
                );
              }

              if (isAbout) {
                return (
                  <div key={i} className="flex flex-col gap-4">
                    <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                      {item}
                    </div>
                    <div className="flex flex-col gap-4 pl-4 border-l-2 border-gold/30">
                      <Link 
                        to="/about" 
                        className={`text-base font-bold ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`} 
                        onClick={() => {
                          setIsOpen(false);
                          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        }}
                      >
                        {item}
                      </Link>
                      <Link 
                        to="/mino" 
                        className={`text-left text-base font-bold ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}
                        onClick={() => {
                          setIsOpen(false);
                          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        }}
                      >
                        Mino
                      </Link>
                    </div>
                  </div>
                );
              }
              return (
                <NavLink key={i} href={`#${['solutions', 'industries', 'process', 'about'][i]}`} onClick={() => setIsOpen(false)}>
                  {item}
                </NavLink>
              );
            })}
            <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
                <button 
                  onClick={() => { setLang(lang === 'en' ? 'es' : 'en'); setIsOpen(false); }}
                  className={`flex items-center justify-between text-base font-bold p-3 rounded-xl transition-colors ${
                    theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Languages className={`w-5 h-5 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
                    <span>{lang === 'en' ? 'Language: English' : 'Idioma: Español'}</span>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-lg font-extrabold uppercase tracking-wider ${
                    theme === 'dark' ? 'bg-gold/20 text-gold' : 'bg-[#F9F6F0] text-gold-deep border border-[#E8DCC4]'
                  }`}>
                    {lang === 'en' ? 'Switch to ES' : 'Cambiar a EN'}
                  </span>
                </button>
                <button 
                  onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setIsOpen(false); }}
                  className={`flex items-center gap-3 text-base font-bold p-3 rounded-xl transition-colors ${
                    theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5 text-gold" /> : <Moon className="w-5 h-5 text-gold-deep" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </div>
            <button 
              onClick={() => { setIsContactModalOpen(true); setIsOpen(false); }}
              className={theme === 'dark' ? 'btn-gold w-full py-4' : 'btn-primary-light w-full py-4'}
            >
              {t.contact}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
