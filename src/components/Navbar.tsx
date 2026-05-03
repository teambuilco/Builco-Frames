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
          className={`text-sm font-bold transition-colors ${theme === 'dark' ? 'text-white/70 hover:text-gold' : 'text-slate-600 hover:text-gold-deep'}`}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link 
        to={href} 
        className={`text-sm font-bold transition-colors ${theme === 'dark' ? 'text-white/70 hover:text-gold' : 'text-slate-600 hover:text-gold-deep'}`}
        {...props}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${theme === 'dark' ? 'glass-dark' : 'glass-light'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo className={`w-9 h-9 group-hover:scale-110 transition-transform ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
            <span className={`text-2xl font-helvetica font-bold tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>BUILDING CONNECTIONS</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
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
                      className={`flex items-center gap-1 text-sm font-bold transition-colors ${theme === 'dark' ? 'text-white/70 hover:text-gold' : 'text-slate-600 hover:text-gold-deep'}`}
                      onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
                    >
                      {item} <ChevronDown className={`w-4 h-4 transition-transform ${isIndustriesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isIndustriesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={`absolute top-full right-0 mt-2 w-56 rounded-sm shadow-2xl border overflow-hidden ${theme === 'dark' ? 'bg-charcoal border-white/10' : 'bg-white border-slate-200'}`}
                        >
                          <Link 
                            to="/mining" 
                            className={`block px-6 py-4 text-sm font-bold transition-colors ${theme === 'dark' ? 'text-white/70 hover:bg-white/5 hover:text-gold' : 'text-slate-600 hover:bg-slate-50 hover:text-gold-deep'}`}
                            onClick={() => setIsIndustriesOpen(false)}
                          >
                            {lang === 'es' ? 'Minería' : 'Mining'}
                          </Link>
                          <Link 
                            to="/energy" 
                            className={`block px-6 py-4 text-sm font-bold transition-colors ${theme === 'dark' ? 'text-white/70 hover:bg-white/5 hover:text-gold' : 'text-slate-600 hover:bg-slate-50 hover:text-gold-deep'}`}
                            onClick={() => setIsIndustriesOpen(false)}
                          >
                            {lang === 'es' ? 'Energía' : 'Energy'}
                          </Link>
                          <Link 
                            to="/government" 
                            className={`block px-6 py-4 text-sm font-bold transition-colors ${theme === 'dark' ? 'text-white/70 hover:bg-white/5 hover:text-gold' : 'text-slate-600 hover:bg-slate-50 hover:text-gold-deep'}`}
                            onClick={() => setIsIndustriesOpen(false)}
                          >
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
                      className={`flex items-center gap-1 text-sm font-bold transition-colors ${theme === 'dark' ? 'text-white/70 hover:text-gold' : 'text-slate-600 hover:text-gold-deep'}`}
                      onClick={() => setIsAboutOpen(!isAboutOpen)}
                    >
                      {item} <ChevronDown className={`w-4 h-4 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isAboutOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={`absolute top-full right-0 mt-2 w-48 rounded-sm shadow-2xl border overflow-hidden ${theme === 'dark' ? 'bg-charcoal border-white/10' : 'bg-white border-slate-200'}`}
                        >
                          <Link 
                            to="/about" 
                            className={`block px-6 py-4 text-sm font-bold transition-colors ${theme === 'dark' ? 'text-white/70 hover:bg-white/5 hover:text-gold' : 'text-slate-600 hover:bg-slate-50 hover:text-gold-deep'}`}
                            onClick={() => setIsAboutOpen(false)}
                          >
                            {item}
                          </Link>
                          <Link 
                            to="/mino" 
                            className={`block px-6 py-4 text-sm font-bold transition-colors ${theme === 'dark' ? 'text-white/70 hover:bg-white/5 hover:text-gold' : 'text-slate-600 hover:bg-slate-50 hover:text-gold-deep'}`}
                            onClick={() => setIsAboutOpen(false)}
                          >
                            Mino
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
            
            <div className={`flex items-center gap-4 border-l pl-8 ml-4 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
              <button 
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'hover:bg-white/5 text-white/70' : 'hover:bg-slate-100 text-slate-600'}`}
                title="Change Language"
              >
                <div className="flex items-center gap-1.5">
                  <Languages className={`w-4 h-4 ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`} />
                  <span className="text-xs font-bold uppercase tracking-wider">{lang}</span>
                </div>
              </button>

              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-3 rounded-xl transition-all ${theme === 'dark' ? 'hover:bg-white/5 text-white/70' : 'hover:bg-slate-100 text-slate-600'}`}
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4 text-gold-deep" />}
              </button>

              <button 
                onClick={() => setIsContactModalOpen(true)}
                className={theme === 'dark' ? 'btn-gold !px-8 !py-3' : 'btn-primary-light !px-8 !py-3'}
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
                        onClick={() => setIsOpen(false)}
                      >
                        {lang === 'es' ? 'Minería' : 'Mining'}
                      </Link>
                      <Link 
                        to="/energy" 
                        className={`text-left text-base font-bold ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {lang === 'es' ? 'Energía' : 'Energy'}
                      </Link>
                      <Link 
                        to="/government" 
                        className={`text-left text-base font-bold ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}
                        onClick={() => setIsOpen(false)}
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
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </Link>
                      <Link 
                        to="/mino" 
                        className={`text-left text-base font-bold ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}
                        onClick={() => setIsOpen(false)}
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
            <div className="flex flex-col gap-4 pt-6 border-t border-white/5">
                <button 
                  onClick={() => { setLang(lang === 'en' ? 'es' : 'en'); setIsOpen(false); }}
                  className={`flex items-center gap-3 text-lg font-bold ${theme === 'dark' ? 'text-gold' : 'text-gold-deep'}`}
                >
                  <Languages /> {lang === 'en' ? 'Español' : 'English'}
                </button>
                <button 
                  onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setIsOpen(false); }}
                  className={`flex items-center gap-3 text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                >
                  {theme === 'dark' ? <Sun /> : <Moon />} {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
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
